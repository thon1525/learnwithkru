import { zodValidate } from "../middlewares/user-validate-middleware";
import { PATH_AUTH } from "../routes/path-defs";
import { authLoginSchema, userValidateSchema } from "../schemas/auth-validate";
import { AuthServices } from "../services/auth-services";
import StatusCode from "../utils/http-status-code";
import { IUser, Login, ResetPassword, UserSignup } from "../@types/user.type";
import {
  Get,
  Post,
  Route,
  SuccessResponse,
  Middlewares,
  Body,
  Query,
  Controller,
  Header,
} from "tsoa";
import { SendVerifyEmailService } from "../services/verify-email-services";
import { OauthConfig } from "../utils/oauth-configs";
import getConfig from "../utils/config";
import { ApiError } from "../error/base-custom-error";
import { decodedToken } from "../utils/jwt";
import { logger } from "../utils/logger";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

@Route("/v1/auth")
export class AuthController extends Controller {
  @Post(PATH_AUTH.signUp)
  @SuccessResponse(StatusCode.CREATED, "Created")
  @Middlewares(zodValidate(userValidateSchema))
  public async Singup(
    @Body() requestBody: UserSignup
  ): Promise<{ message: string }> {
    const { first_name, last_name, email, password } = requestBody;
    try {
      const authService = new AuthServices();
      await authService.Signup({ first_name, last_name, email, password });

      return { message: "please verify your Email!" };
    } catch (error) {
      throw error;
    }
  }

  @Get(PATH_AUTH.verify)
  @SuccessResponse(StatusCode.OK, "OK")
  public async VerifySignupEmail(
    @Query() token: string
  ): Promise<{ message: string; data: IUser; token: string }> {
    try {
      const verifyService = new SendVerifyEmailService();
      const user = await verifyService.VerifyEmailToken(token);

      const { first_name, last_name, email, picture } = user.data;
      return {
        message: "Success verified",
        data: { first_name, last_name, email, picture },
        token: user.token,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_AUTH.verifyResetPassword)
  async VerifyResetPasswordEmail(
    @Query() token: string
  ): Promise<{ message: string }> {
    try {
      const verifyService = new SendVerifyEmailService();
      const user = await verifyService.VerifyResetPasswordToken(token);

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  @Post(PATH_AUTH.login)
  @SuccessResponse(StatusCode.OK, "OK")
  @Middlewares(zodValidate(authLoginSchema))
  public async Login(
    @Body() requestBody: Login
  ): Promise<{ message: string; data: IUser; token: string }> {
    try {
      const authService = new AuthServices();
      const user = await authService.Login(requestBody);

      const { first_name, last_name, email, picture } = user.data as IUser;
      return {
        message: "Success login",
        data: { first_name, last_name, email, picture },
        token: user.token,
      };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.FOUND, "FOUND")
  @Get(PATH_AUTH.googleOAuth)
  public async googleOAuth(): Promise<{ redirectUrl: string }> {
    const redirectUri = config.googleRedirectUrl!;
    const clientId = config.googleClientId!;

    try {
      const googleConfig = await OauthConfig.getInstance();
      const authUrl = await googleConfig.GoogleConfigUrl(clientId, redirectUri);
      return { redirectUrl: authUrl };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.FOUND, "FOUND")
  @Get(PATH_AUTH.facebookOAuth)
  public async facebookOAuth(): Promise<{ redirectUrl: string }> {
    const redirectUri = config.facebookRedirectUrl!;
    const appId = config.faceAppId!;

    try {
      const googleConfig = await OauthConfig.getInstance();
      const authUrl = await googleConfig.FacebookConfigUrl(appId, redirectUri);
      return { redirectUrl: authUrl };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_AUTH.googleOAuthCallBack)
  async GoogleOAuth(
    @Query() code: string
  ): Promise<{ message: string; data: IUser; token: string }> {
    try {
      logger.info(`Google code: ${code}`);
      const authService = new AuthServices();
      const user = await authService.SigninWithGoogleCallBack(code);

      const { first_name, last_name, email, picture } = user.data;
      return {
        message: "Success signup",
        data: { first_name, last_name, email, picture },
        token: user.token,
      };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_AUTH.facebookOAuthCallBack)
  async FacebookOAuthCallBack(
    @Query() code: string
  ): Promise<{ message: string; data: IUser; token: string }> {
    try {
      const authService = new AuthServices();
      const user = await authService.SigninWithFacebookCallBack(code);

      console.log("user: ", user);
      const { first_name, last_name, email, picture } = user.data;
      return {
        message: "Success signup",
        data: { first_name, last_name, email, picture },
        token: user.token,
      };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post(PATH_AUTH.requestResetPassword)
  async RequestResetPassword(
    @Body() requestBody: { email: string }
  ): Promise<{ message: string }> {
    const { email } = requestBody;
    try {
      const service = new AuthServices();
      await service.RequestResetPassword({ email });
      return { message: "Success verified" };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post(PATH_AUTH.ResetPassword)
  async ConfirmResetPassword(
    @Body() requestBody: ResetPassword
  ): Promise<{ message: string }> {
    try {
      const service = new AuthServices();
      await service.ConfirmResetPassword(requestBody);

      return { message: "Success reset password" };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(PATH_AUTH.logout)
  async Logout(
    @Header("authorization") authorization: string
  ): Promise<{ message: string; isLogout: true }> {
    try {
      const token = authorization?.split(" ")[1];
      const decodedUser = await decodedToken(token);
      const service = new AuthServices();
      const isLogout = await service.Logout(decodedUser);

      if (!isLogout) {
        throw new ApiError("Unable to logout!");
      }
      return { message: "Success logout", isLogout: isLogout };
    } catch (error: unknown) {
      throw error;
    }
  }
}
