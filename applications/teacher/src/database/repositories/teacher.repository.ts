import StatusCode from "../../utils/http-status-code";
import { PaginateRepo } from "../@types/repo-type";
import { ApiError, BaseCustomError } from "../../error/base-custom-error";
import { logger } from "../../utils/logger";
import teacherModel, { ITeacherDocs } from "../models/teacher.model";
import { ITeacher, ITeacherUpdate } from "../../@types/teacher.type";
import { Filter } from "../../@types/queries.type";
export class TeacherRepository {
  constructor() {}

  async CreateTeacher(teacherData: ITeacher): Promise<ITeacherDocs> {
    try {
      // Log the attempt to create a new teacher
      logger.info(
        `Attempting to create a new teacher with data: ${JSON.stringify(
          teacherData
        )}`
      );
      // Create the new teacher
      const newTeacher = new teacherModel(teacherData);

      if (!newTeacher) {
        // Log the failure to create the teacher
        logger.error(
          "Failed to create a new teacher: Teacher creation returned null"
        );
        throw new ApiError("Unable to create user in database!");
      }
      // Save the new teacher
      const savedTeacher = await newTeacher.save();

      // Log the success
      logger.info(
        `Successfully created and saved a new teacher with ID: ${savedTeacher.id}`
      );

      return savedTeacher;
    } catch (error: unknown) {
      // Log the error
      logger.error("Error occurred while creating a new teacher", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Somthing went wrong!");
    }
  }

  async FindAllTeachers(
    { pageSize, skip }: PaginateRepo,
    filter: Filter
  ): Promise<{ data: ITeacher[]; totalTeachers: number }> {
    try {
      // Validate inputs
      if (pageSize <= 0 || skip < 0) {
        throw new ApiError(
          "Invalid pagination parameters!",
          StatusCode.BAD_REQUEST
        );
      }

      // Fetch teachers from the database
      // Fetch teachers and total count concurrently
      const [teachers, totalTeachers] = await Promise.all([
        teacherModel
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(pageSize)
          .lean(),
        teacherModel.countDocuments(filter),
      ]);

      // Check if teachers are found
      if (!teachers || teachers.length === 0) {
        throw new ApiError("No teacher found!", StatusCode.NOT_FOUND);
      }

      return { data: teachers, totalTeachers: totalTeachers };
    } catch (error: unknown) {
      // Log the error
      logger.error("Error finding teachers:", error);

      // Re-throw custom errors
      if (error instanceof BaseCustomError) {
        throw error;
      }

      // Throw a generic error for other cases
      throw new ApiError("Something went wrong!");
    }
  }
  // By teacher id
  async FindTeacherById({ id }: { id: string }): Promise<ITeacher> {
    try {
      // Validate input
      if (!id) {
        throw new ApiError("Invalid ID parameter!", StatusCode.BAD_REQUEST);
      }

      // Fetch teacher by ID from the database
      const teacher = await teacherModel.findById({ _id: id }).exec();

      // Check if a teacher was found
      if (!teacher) {
        throw new BaseCustomError(
          "No teacher matches this ID!",
          StatusCode.NOT_FOUND
        );
      }

      return teacher;
    } catch (error: unknown) {
      // Log the error
      logger.error("Error finding teacher by ID:", error);

      // Re-throw custom errors
      if (error instanceof BaseCustomError) {
        throw error;
      }

      // Throw a generic error for other cases
      throw new ApiError("Something went wrong!");
    }
  }

  async FindTeacherByUserId(userId: string): Promise<ITeacherDocs | null> {
    try {
      // Validate input
      if (!userId) {
        throw new ApiError(
          "Invalid user ID parameter!",
          StatusCode.BAD_REQUEST
        );
      }

      // Fetch teacher by user ID from the database
      const existTeacher = await teacherModel.findOne({ userId }).exec();

      // Log the operation
      logger.info(
        `Teacher with user ID ${userId} ${existTeacher ? "found" : "not found"}`
      );

      return existTeacher;
    } catch (error: unknown) {
      // Log the error
      logger.error("Error finding teacher by user ID:", error);

      // Re-throw custom errors
      if (error instanceof BaseCustomError) {
        throw error;
      }

      // Throw a generic error for other cases
      throw new ApiError("Something went wrong!");
    }
  }

  async UpdateTeacher({
    id,
    teacherData,
  }: {
    id: string;
    teacherData: ITeacherUpdate;
  }): Promise<ITeacherDocs> {
    try {
      // Log the attempt to update a new teacher
      logger.info(
        `Attempting to update a new teacher with data: ${JSON.stringify(
          teacherData
        )}`
      );
      // update the new teacher
      const newTeacher = await teacherModel.findByIdAndUpdate(
        { _id: id },
        teacherData,
        { new: true }
      );

      if (!newTeacher) {
        // Log the failure to update the teacher
        logger.error(
          "Failed to update a new teacher: Teacher creation returned null"
        );
        throw new ApiError("Unable to update user in database!");
      }
      // Save the new teacher
      const savedTeacher = await newTeacher.save();

      // Log the success
      logger.info(
        `Successfully updated and saved a new teacher with ID: ${savedTeacher.id}`
      );

      return savedTeacher;
    } catch (error: unknown) {
      // Log the error
      logger.error("Error occurred while creating a new teacher", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Somthing went wrong!");
    }
  }

  async FindTeacherByUserIdAndTeacherId(id: string): Promise<ITeacherDocs | null> {
    try {
      // Validate input
      if (!id) {
        throw new ApiError(
          "Invalid user ID parameter!",
          StatusCode.BAD_REQUEST
        );
      }

      // Fetch teacher by user ID from the database
      const existTeacher = await teacherModel.findOne({ $or: [{ _id: id }, { userId: id }] }).exec();

      // Log the operation
      logger.info(
        `Teacher with user ID ${id} ${existTeacher ? "found" : "not found"}`
      );

      return existTeacher;
    } catch (error: unknown) {
      // Log the error
      logger.error("Error finding teacher by user ID:", error);

      // Re-throw custom errors
      if (error instanceof BaseCustomError) {
        throw error;
      }

      // Throw a generic error for other cases
      throw new ApiError("Something went wrong!");
    }
  }
}
