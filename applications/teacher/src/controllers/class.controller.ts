import {
  Body,
  Controller,
  Middlewares,
  Route,
  SuccessResponse,
  Request,
  Post,
} from "tsoa";
import { IClass, IClassRespone } from "../@types/class.type";
import { ClassService } from "../services/class-services";
import StatusCode from "../utils/http-status-code";
import { classSchema } from "../schemas/class-schema";
import { ValidateInput } from "../middlewares/validate-input";
import { authorize, RequestWithUser } from "../middlewares/authorize";
import { PATH_CLASS } from "../routes/path-defs";

@Route("/v1/teachers")
export class ClassController extends Controller {
  @SuccessResponse(StatusCode.CREATED, "Created")
  @Middlewares(authorize(["teacher"]))
  @Middlewares(ValidateInput(classSchema))
  @Post(PATH_CLASS.createClass)
  async CreateClass(
    @Body() requestBody: IClass,
    @Request() req: Express.Request
  ): Promise<{ message: string; data: IClassRespone }> {
    try {
      const { id } = (req as RequestWithUser).user;
      const classData = { teacherId: id, ...requestBody };
      const service = new ClassService();
      const respone = await service.CreateClass(classData);

      return { message: "Success create class", data: respone.data };
    } catch (error: unknown) {
      throw error;
    }
  }
}
