import StatusCode from "../utils/http-status-code";
import { TeacherServices } from "../services/teacher-services";
import { IQueries } from "../@types/queries.type";
import { PATH_TEACHER } from "../routes/path-defs";
import { authorize } from "../middlewares/authorize";
import { ValidateInput } from "../middlewares/validate-input";
import {
  teacherSchemas,
  updateTeacherSchemas,
} from "../schemas/teacher-schema";
import { DecodedUser } from "../@types/express-extend.type";
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Queries,
  SuccessResponse,
  Request,
  Route,
  Path,
  Put,
} from "tsoa";
import { ITeacher, ITeacherUpdate } from "../@types/teacher.type";
import { logger } from "../utils/logger";
import { RateService } from "../services/rate-services";

@Route("/v1/teachers")
export class TeacherController extends Controller {
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_TEACHER.teacherList)
  public async TeacherList(@Queries() queries: IQueries): Promise<{
    message: string;
    detail: { totalPages: number; totalTeachers: number; currentPage: number };
    data: ITeacher[];
  }> {
    try {
      const service = new TeacherServices();
      const { totalPages, totalTeachers, data, currentPage } =
        await service.TeacherList(queries);

      return {
        message: "Success retrieve teachers",
        data,
        detail: {
          totalPages,
          totalTeachers,
          currentPage,
        },
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post(PATH_TEACHER.teacherSignup)
  @Middlewares(ValidateInput(teacherSchemas))
  @Middlewares(authorize(["user", "teacher"]))
  public async TeacherSingup(
    @Body() requestBody: ITeacher,
    @Request() req: Express.Request
  ): Promise<{ data: ITeacher; token: string }> {
    try {
      const userId = (req.user as DecodedUser).id;
      logger.info(`Catching decode user: ${userId}`);
      const service = new TeacherServices();
      const newUser = await service.CreateTeacher(requestBody, userId);

      return newUser;
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_TEACHER.teacherProfile)
  async FindOneTeacher(
    @Path() id: string
  ): Promise<{ message: string; data: ITeacher }> {
    try {
      const service = new TeacherServices();
      const teacher = await service.FindOneTeacher({ id });
      return { message: "Success retrieve teacher", data: teacher };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_TEACHER.login)
  async Login(
    @Path() userId: string
  ): Promise<{ message: string; token: string }> {
    try {
      const service = new TeacherServices();
      const respone = await service.Login(userId);
      return { message: "Success login", token: respone.token };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "GET OK")
  @Get(PATH_TEACHER.getTeacher)
  async GetTeacher(
    @Path() id: string
  ): Promise<{ message: string; data: ITeacher }> {
    try {
      const serivice = new TeacherServices();
      const existingTeacher = await serivice.GetTeacher(id);

      return {
        message: "Success Retrieved teacher",
        data: existingTeacher.data,
      };
    } catch (error: unknown) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "GET OK")
  @Middlewares(authorize(["teacher"]))
  @Get(PATH_TEACHER.teacherSettingProfile)
  async GetProfileTeacher(
    @Request() req: Express.Request
  ): Promise<{ message: string; data: ITeacher }> {
    try {
      const teacherId = (req.user as DecodedUser).id;
      logger.info(`Has retrieve teacherId ${teacherId}`)
      const serivice = new TeacherServices();
      const existingTeacher = await serivice.GetTeacher(teacherId);

      return {
        message: "Success Retrieved teacher",
        data: existingTeacher.data,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.CREATED, "Updated")
  @Middlewares(ValidateInput(updateTeacherSchemas))
  @Middlewares(authorize(["teacher"]))
  @Put("/update")
  async UpdateTeacher(
    @Body() requestBody: ITeacherUpdate , @Request() req: Express.Request
  ): Promise<{ message: string; data: ITeacher }> {
    try {
      const teacherId = (req.user as DecodedUser).id
      console.log('user id', teacherId , 'request body ', requestBody)
      const service = new TeacherServices();
      const updatedTeacher = await service.UpdateTeacher({ id:teacherId, requestBody });
      
      logger.info(`Updated teacher ${updatedTeacher}`)
      return { message: "Success updated teacher", data: updatedTeacher.data };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.CREATED, "Create Rate")
  @Middlewares(authorize(["user", "student"]))
  @Post("/rate/:teacherId") // Define the correct endpoint
  async RateTeacher(
    @Path() teacherId: string,
    @Request() req: Express.Request,
    @Body() requestBody: { rating: number; feedback?: string } // Changed rating to number
  ): Promise<{ message: string; data: { rating: number; feedback: string } }> {
    try {
      const userId = (req.user as DecodedUser).id;
      const { rating, feedback } = requestBody;

      logger.info(
        `Received userId ${userId} and RequestBody ${JSON.stringify(
          requestBody
        )}`
      );

      const service = new RateService();
      const data = await service.CreateRate({
        user_id: userId,
        teacher_id: teacherId,
        rating,
        feedback,
      });

      this.setStatus(StatusCode.CREATED); // Explicitly set the status code
      return {
        message: "Success rate",
        data: { rating: data.rating, feedback: data?.feedback },
      };
    } catch (error: unknown) {
      logger.error(
        `Error rating teacher: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
      // Optionally, you could throw a custom error with more context
      // throw new Error(
      //   `Failed to rate teacher with ID ${teacherId}: ${
      //     error instanceof Error ? error.message : "Unknown error"
      //   }`
      // );
    }
  }
}
