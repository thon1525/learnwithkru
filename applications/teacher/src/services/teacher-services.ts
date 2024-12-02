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

      // Case-insensitive regex search for name-related fields
      if (name) {
        const regex = new RegExp(name, "i");
        filter.$or = [
          { first_name: regex },
          { last_name: regex },
          { subject: regex },
        ];
      }

      // Exact match for province
      if (province) {
        filter.province = province;
      }

      // Handling date and time availability
      if (time_available) {
        const regex = new RegExp(time_available, "i");
        filter["date_available.day"] = regex;
        // Note: Adjust the time filter as needed. Example assuming `start` and `end` times are required.
      }

      // Numeric range filter for pricing
      if (min_p != null || max_p != null || min_p || max_p) {
        filter.price = {};
        if (min_p != null && min_p !== 0) {
          filter.price.$gte = Number(min_p);
        }
        if (max_p != null && max_p !== 0) {
          filter.price.$lte = Number(max_p);
        }
        // If filter.price is empty, delete it
        if (Object.keys(filter.price).length === 0) {
          delete filter.price;
        }
      }

      // Exact match for subject
      if (subject) {
        filter.subject = subject;
      }
      // Determine if any filter has been set
      const hasFilter = Object.keys(filter).length > 0;

      // Query the repository with the constructed filter
      const { totalTeachers, data } = await this.teacherRepo.FindAllTeachers(
        {
          pageSize,
          skip,
        },
        hasFilter ? filter : {}
      );

      // Return the paginated response
      return {
        totalTeachers,
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
      const existTeacher =
        await this.teacherRepo.FindTeacherByUserIdAndTeacherId(userId);

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
      const existingTeacher = await this.teacherRepo.FindTeacherByUserId(
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

      logger.info(`update teacher obj ${teacherObject}`);
      const updatedTeacher = await this.teacherRepo.UpdateTeacher({
        id,
        teacherData: teacherObject,
      });

      return { data: updatedTeacher };
    } catch (error: unknown) {
      throw error;
    }
  }
  async GetTeacherByUserId(id: string): Promise<{ data: ITeacher }> {
    try {
      const existingTeacher = await this.teacherRepo.FindTeacherByUserId(id);

      if (!existingTeacher) {
        throw new BaseCustomError("No teacher found!", StatusCode.NOT_FOUND);
      }
      return { data: existingTeacher };
    } catch (error: unknown) {
      throw error;
    }
  }
}
