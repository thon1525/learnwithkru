import { IStudent } from "../@types/student.type";
import { StudentServices } from "../services/student-services";
import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  SuccessResponse,
  Request,
  Get,
  Path,
} from "tsoa";
import StatusCode from "../utils/http-status-code";
import { PATH_STUDENT } from "../routes/path-defs";
import { authorize } from "../middlewares/authorize";
import { DecodedUser } from "../@types/express-extend.type";
import { studentValidate } from "../middlewares/student-validate";
import { StudentSchemas } from "../schemas/student-validate";

@Route("/v1/students")
export class StudentController extends Controller {
  @SuccessResponse(StatusCode.OK, "OK")
  @Middlewares(authorize(["user"]))
  @Middlewares(studentValidate(StudentSchemas))
  @Post(PATH_STUDENT.SIGNUP)
  async Signup(
    @Body() requestBody: IStudent,
    @Request() req: Express.Request
  ): Promise<{ message: string; data: object; token: string }> {
    const decodeId = (req.user as DecodedUser).id;
    const student = { decodeId, ...requestBody };
    try {
      const service = new StudentServices();
      const newStudent = await service.Signup(student);

      return {
        message: "Success Signup",
        data: newStudent.data,
        token: newStudent.token,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_STUDENT.LOGIN)
  async Login(
    @Path() userId: string
  ): Promise<{ message: string; token: string }> {
    try {
      const service = new StudentServices();
      const respone = await service.Login(userId);
      return { message: "Success login", token: respone.token };
    } catch (error: unknown) {
      throw error;
    }
  }
}
