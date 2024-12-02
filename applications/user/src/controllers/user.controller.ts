import StatusCode from "../utils/http-status-code";
import { PATH_USER } from "../routes/path-defs";
import { UserServices } from "../services/user-services";
import { IUser, UserProfile, UserUpdate } from "../@types/user.type";
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Route,
  SuccessResponse,
  Request,
  Patch,
} from "tsoa";
import { authorize } from "../middlewares/authorize";
import { DecodedUser } from "../@types/express-extend.type";
import { logger } from "../utils/logger";

@Route("/v1/users")
export class UserController extends Controller {
  @SuccessResponse(StatusCode.CREATED, "Created")
  @Post("/create")
  async Createuser(
    @Body() requestBody: IUser
  ): Promise<{ message: string; data: IUser }> {
    const { authId, first_name, last_name, email, picture } = requestBody;
    try {
      console.log("This is authId", authId);
      const service = new UserServices();
      const newUser = await service.CreateUser({
        authId,
        first_name,
        last_name,
        email,
        picture,
      });

      return { message: "Success Created", data: newUser };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_USER.GET_USER_BY_AUTH_ID)
  async GetUserByAuthId(
    @Path() authId: string
  ): Promise<{ message: string; data: IUser }> {
    try {
      const service = new UserServices();
      const user = await service.GetUserByAuthId(authId);

      return { message: "Success retrieve user", data: user };
    } catch (error: unknown) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_USER.GET_USER_BY_USER_ID)
  async GetUserByUserId(
    @Path() userId: string
  ): Promise<{ message: string; data: IUser }> {
    try {
      const service = new UserServices();
      const user = (await service.GetUserByUserId(userId)) as IUser;
      return { message: "Success retrieve user", data: user
        
       };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_USER.USER_PROFILE)
  @Middlewares(authorize(["user", "student", "teacher"]))
  async GetUserProfile(
    @Request() req: Express.Request
  ): Promise<{ message: string; data: UserProfile }> {
    try {
      const userId = (req.user as DecodedUser).id as string;
      logger.info(`Has retrived userId ${userId}`);
      const service = new UserServices();
      const respone = await service.GetUserProfile(userId);

      logger.info(`User data ${JSON.stringify(respone.data)}`);

      return { message: "Success retrived", data: respone.data };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Patch(PATH_USER.UPDATE_USER)
  async UpdateUserByUserId(
    @Path() authId: string,
    @Body() requestBody: UserUpdate
  ): Promise<{ message: string; data: IUser }> {
    try {
      const service = new UserServices();
      const { data } = await service.UpdateUserByUserId(authId, requestBody);

      return { message: "Success update", data };
    } catch (error: unknown) {
      throw error;
    }
  }
}
