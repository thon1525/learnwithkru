import { Filter, IQueries } from "../@types/queries.type";
import { ITeacher, ITeacherUpdate } from "../@types/teacher.type";
import { ITeacherDocs } from "../database/models/teacher.model";
import { TeacherRepository } from "../database/repositories/teacher.repository";
import { BaseCustomError } from "../error/base-custom-error";
import StatusCode from "../utils/http-status-code";
import { generateSignature } from "../utils/jwt";
import { logger } from "../utils/logger";
import { NotificationService } from "./notification-serivice";

export class TeacherServices {
  private teacherRepo: TeacherRepository;
  constructor() {
    this.teacherRepo = new TeacherRepository();
  }

  async TeacherList(queries: IQueries): Promise<{
    totalTeachers: number;
    totalPages: number;
    currentPage: number;
    data: ITeacher[];
  }> {
    try {
      const {
        name,
        province,
        time_available,
        min_p,
        max_p,
        subject,
        pageNumber = 1,
        pageSize = 10,
      } = queries as IQueries;
      const skip = (pageNumber - 1) * pageSize;

      const filter: Filter = {};

      if (name) {
        const regex = new RegExp(name, "i");
        filter.$or = [
          { first_name: regex },
          { last_name: regex },
          { province: regex },
          { "date_available.day": regex },
          { "date_available.time.start": regex },
          { "date_available.time.end": regex },
          { pricing: regex }, // Adjust if pricing is not a string
          { subject: regex },
        ];
      } // Case-insensitive regex search
      if (province) filter.province = province;
      if (time_available) filter["date_available.day"] = time_available;
      if (min_p && max_p)
        filter.pricing = { $gte: Number(min_p), $lte: Number(max_p) }; // Adjust as necessary
      if (subject) filter.subject = subject;
      const { totalTeachers, data } = await this.teacherRepo.FindAllTeachers(
        {
          pageSize,
          skip,
        },
        filter
      );
      return {
        totalTeachers: totalTeachers,
        totalPages: Math.ceil(totalTeachers / pageSize),
        currentPage: pageNumber,
        data,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  async CreateTeacher(
    requestBody: ITeacher,
    userId: string
  ): Promise<{ data: ITeacherDocs; token: string }> {
    try {
      const teacherData = { userId, ...requestBody };
      const existTeacher = await this.teacherRepo.FindTeacherByUserID(userId);

      logger.info(`Existing teacher: ${existTeacher}`);
      if (existTeacher) {
        throw new BaseCustomError(
          "you're already become a teacher !",
          StatusCode.BAD_REQUEST
        );
      }

      const newTeacher = await this.teacherRepo.CreateTeacher(teacherData);

      const token = await generateSignature({
        _id: newTeacher._id!.toString(),
      });

      const messageSender = NotificationService.getInstance();
      await messageSender.sendSuccesfullyNotification({
        userId: newTeacher._id!.toString(),
        message: `
      Congratulations, [${newTeacher.first_name + newTeacher.last_name}]!

You have successfully signed up for an account. Welcome to our community!

Start exploring and discovering all the features we have to offer. Should you have any queries or need assistance, don't hesitate to reach out to us.

We're thrilled to have you on board!
      `,
      });

      return { data: newTeacher, token };
    } catch (error: unknown) {
      throw error;
    }
  }

  async FindOneTeacher({ id }: { id: string }): Promise<ITeacher> {
    try {
      const teacher = await this.teacherRepo.FindTeacherById({ id });

      return teacher;
    } catch (error: unknown) {
      throw error;
    }
  }

  async Login(userId: string): Promise<{ token: string }> {
    try {
      const existingTeacher = await this.teacherRepo.FindTeacherByUserID(
        userId
      );
      const token = await generateSignature({
        _id: existingTeacher!.id.toString(),
      });
      return { token };
    } catch (error: unknown) {
      throw error;
    }
  }

  async GetTeacher(id: string): Promise<{ data: ITeacher }> {
    try {
      const existingTeacher = await this.teacherRepo.FindTeacherById({ id });

      if (!existingTeacher) {
        throw new BaseCustomError("No teacher found!", StatusCode.NOT_FOUND);
      }
      return { data: existingTeacher };
    } catch (error: unknown) {
      throw error;
    }
  }

  async UpdateTeacher({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: ITeacherUpdate;
  }): Promise<{ data: ITeacher }> {
    try {
      const {
        first_name,
        last_name,
        picture,
        phone_number,
        subject,
        province,
        university,
        year_experience,
        type_degree,
        bio,
        motivation,
        date_available,
        price,
        certificate,
        video,
        teaching_experience,
      } = requestBody as ITeacherUpdate;
      const teacherObject: ITeacherUpdate = {};

      const existingTeacher = this.teacherRepo.FindTeacherById({ id });

      if (!existingTeacher) {
        throw new BaseCustomError(
          "No teacher found!, can't update the teacher",
          StatusCode.NOT_FOUND
        );
      }
      if (first_name) teacherObject.first_name = first_name;
      if (last_name) teacherObject.last_name = last_name;
      if (picture) teacherObject.picture = picture;
      if (phone_number) teacherObject.phone_number = phone_number;
      if (subject) teacherObject.subject = subject;
      if (province) teacherObject.province = province;
      if (university) teacherObject.university = university;
      if (year_experience) teacherObject.year_experience = year_experience;
      if (type_degree) teacherObject.type_degree = type_degree;
      if (bio) teacherObject.bio = bio;
      if (motivation) teacherObject.motivation = motivation;
      if (date_available) teacherObject.date_available = date_available;
      if (price) teacherObject.price = price;
      if (certificate) teacherObject.certificate = certificate;
      if (video) teacherObject.video = video;
      if (teaching_experience)
        teacherObject.teaching_experience = teaching_experience;

      const updatedTeacher = await this.teacherRepo.UpdateTeacher({
        id,
        teacherData: teacherObject,
      });

      return { data: updatedTeacher };
    } catch (error: unknown) {
      throw error;
    }
  }
}
