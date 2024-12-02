import StatusCode from "../utils/http-status-code";
import {
  generatePassword,
  generateSignature,
  validatePassword,
} from "../utils/jwt";
import { AccountVerificationRepository } from "../database/repositories/account-verification.repository";
import { OauthConfig } from "../utils/oauth-configs";
import { AuthService } from "./@types/auth-service-type";
import { AuthRepository } from "../database/repositories/auth.respository";
import { TokenResponse } from "../utils/@types/oauth.type";
import { IUser, Login, ResetPassword } from "../@types/user.type";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import { RequestUserService } from "../utils/http-request";
import { logger } from "../utils/logger";
import { SendVerifyEmailService } from "./verify-email-services";
import { DecodedUser } from "../@types/express-extend.type";

export class AuthServices {
  private AuthRepo: AuthRepository;
  private accountVerificationRepo: AccountVerificationRepository;
  private SendVerifyEmailService: SendVerifyEmailService;
  constructor() {
    this.AuthRepo = new AuthRepository();
    this.accountVerificationRepo = new AccountVerificationRepository();
    this.SendVerifyEmailService = new SendVerifyEmailService();
  }

  async Signup(auth: AuthService): Promise<void> {
    // TODO LIST
    //************************* */
    // 1. hast password
    // 2. check existing user
    // 3. send verify email and handle for exist user
    // 4. create new user
    // 5. send verify email
    try {
      const { first_name, last_name, email, password } = auth;
      // step 1
      const hashedPassword = await generatePassword(password as string);
      // step 2
      const existingUser = await this.AuthRepo.FindUserByEmail({
        email: email as string,
      });
      if (existingUser) {
        if (existingUser.is_verified === true) {
          throw new BaseCustomError(
            "Your account is already signed up. Please log in instead.",
            StatusCode.BAD_REQUEST
          );
        }
        this.accountVerificationRepo.DeleteAccountVerifyByAuthId({
          authId: existingUser._id,
        });
        this.SendVerifyEmailService.SendVerifyEmailToken(
          {
            authId: existingUser._id,
            email: existingUser.email as string,
          },
          "verifyEmail"
        );
        throw new BaseCustomError(
          "Verification email has been resent. Please check your email to verify.",
          StatusCode.BAD_REQUEST
        );
      }

      // step 3
      const newUser = await this.AuthRepo.CreateAuthUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      // step 4
      await this.SendVerifyEmailService.SendVerifyEmailToken(
        {
          authId: newUser._id,
          email: newUser!.email as string,
        },
        "verifyEmail"
      );
    } catch (error: unknown) {
      logger.error("The erorr accur in Singup() method! : ", error);
      if (error instanceof BaseCustomError) {
        throw error;
      }
      throw new ApiError("Songthing went wrong!");
    }
  }

  async SigninWithGoogleCallBack(code: string) {
    try {
      const googleConfig = await OauthConfig.getInstance();
      const tokenResponse = await googleConfig.GoogleStrategy(code);

      const accessToken = tokenResponse!.access_token;

      const userInfoResponse = await googleConfig.GoogleAccessInfo(accessToken);
      const { given_name, family_name, email, id, verified_email, picture } =
        userInfoResponse.data;

      const user = await this.AuthRepo.FindUserByEmail({ email });
      if (user) {
        if (!user.googleId) {
          const newUser = await this.AuthRepo.FindUserByIdAndUpdate({
            id: user._id,
            updates: {
              googleId: id,
              is_verified: true,
              picture,
            },
          });

          const userData: IUser = {
            authId: newUser!._id.toString(),
            first_name: newUser!.first_name as string,
            last_name: newUser!.last_name as string,
            email: newUser!.email as string,
            picture: newUser!.picture as string,
          };

          const requestUser = new RequestUserService();
          const { data } = await requestUser.UpdateUser(userData);
          const { _id } = data;
          const jwtToken = await generateSignature({ _id: _id.toString() });
          return { data, token: jwtToken };
        }
        const requestUser = new RequestUserService();
        const { data } = await requestUser.GetUser(user._id.toString());
        const { _id } = data;
        const jwtToken = await generateSignature({ _id: _id.toString() });
        return { data, token: jwtToken };
      }

      const newUser = await this.AuthRepo.CreateOauthUser({
        first_name: given_name,
        last_name: family_name,
        email,
        googleId: id,
        verified_email,
        picture,
      });
      const userData: IUser = {
        authId: newUser!._id.toString(),
        first_name: newUser!.first_name as string,
        last_name: newUser!.last_name as string,
        email: newUser!.email as string,
        picture: newUser!.picture as string,
      };
      const requestUser = new RequestUserService();
      const { data } = await requestUser.CreateUser(userData);
      if (!data) {
        throw new ApiError("Can't create new user in user service!");
      }

      const jwtToken = await generateSignature({
        _id: data._id.toString(),
      });
      return { data, token: jwtToken };
    } catch (error) {
      logger.error("The error of SigninwithGoogle() method! :", error);
      if (error instanceof BaseCustomError) {
        throw error;
      }
      throw new ApiError("Somthing went wrong!");
    }
  }

  async Login(user: Login): Promise<{ data: IUser; token: string }> {
    // TODO LIST
    //******************* */
    // 1. find existing user
    // 2. checking user verify or not
    // 3. checking for correct password
    // 4. make request to user service for getting user's data
    try {
      const { email, password } = user;
      // step 1
      const existingUser = await this.AuthRepo.FindUserByEmail({ email });
      if (!existingUser) {
        throw new BaseCustomError("User not exist", StatusCode.NOT_FOUND);
      }
      // step 2
      if (existingUser.is_verified === false) {
        throw new BaseCustomError(
          "your email isn't verify",
          StatusCode.BAD_REQUEST
        );
      }
      // step 3
      const isPwdCorrect = await validatePassword({
        enteredPassword: password,
        savedPassword: existingUser.password as string,
      });
      if (!isPwdCorrect) {
        throw new BaseCustomError(
          "Email or Password is incorrect",
          StatusCode.BAD_REQUEST
        );
      }
      // step 4
      const requestUser = new RequestUserService();
      const { data } = await requestUser.GetUser(existingUser._id.toString());

      if (!data) {
        logger.error(
          "No User found in Login() when request data from user db!"
        );
        throw new ApiError("User doesn't exist!", StatusCode.NOT_FOUND);
      }

      // step 5
      // const existStudent = await requestUser.LoginStudent(data._id.toString());

      // if (existStudent.token) {
      //   return { data: existStudent.data, token: existStudent.token };
      // }

      // const existTeacher = await requestUser.LoginTeacher(data._id.toString());

      // if (existTeacher.token) {
      //   return { data: existTeacher.data, token: existTeacher.token };
      // }
      const jwtToken = await generateSignature({
        _id: data._id.toString(),
      });
      return { data, token: jwtToken };
    } catch (error) {
      logger.error("Login () method error:", error);
      if (error instanceof BaseCustomError) {
        throw error;
      }
      throw new ApiError("Somthing when wrong!");
    }
  }

  async SigninWithFacebookCallBack(
    code: string
  ): Promise<{ data: IUser; token: string }> {
    //TODO LIST
    //*********************** */
    // 1. access token from facebook
    // 2. take token to access data from facebook user
    // 3. check existing user if exist generate new token
    // 4. create new user
    // 5. generate token
    //*********************** */
    try {
      //step 1
      const config = await OauthConfig.getInstance();
      const data: TokenResponse | undefined = await config.FacebookStrategy(
        code
      );
      const { access_token } = data!;

      //step 2
      const profile = await config.FacebookAccessInfo(access_token);

      const { id, firstname, lastname, email, picture } = profile.data;
      // step 3
      const existingUser = await this.AuthRepo.FindUserByFacebookId({
        facebookId: id,
      });
      if (existingUser) {
        const requestUser = new RequestUserService();
        const { data } = await requestUser.GetUser(existingUser._id.toString());

        const { _id } = data;
        const jwtToken = await generateSignature({ _id: _id.toString() });
        return { data, token: jwtToken };
      }
      //step 4
      const newUser = await this.AuthRepo.CreateOauthUser({
        first_name: firstname,
        last_name: lastname,
        email,
        facebookId: id,
        verified_email: true,
        picture: picture.data.url,
      });
      //step 5
      const { _id, first_name, last_name } = newUser;

      const userData: IUser = {
        authId: _id.toString(),
        first_name: first_name as string,
        last_name: last_name as string,
        email: newUser?.email as string,
        picture: newUser?.picture as string,
      };
      const requestUser = new RequestUserService();
      const user = await requestUser.CreateUser(userData);
      if (!user.data) {
        throw new ApiError("Can't create new user in user service!");
      }
      const jwtToken = await generateSignature({
        _id: user.data._id.toString(),
      });
      return { data: user.data, token: jwtToken };
    } catch (error) {
      throw error;
    }
  }

  async RequestResetPassword({ email }: { email: string }) {
    try {
      // Find existing user by email
      const existingUser = await this.AuthRepo.FindUserByEmail({ email });

      // Check if the user exists
      if (!existingUser) {
        throw new BaseCustomError("User not found!", StatusCode.NOT_FOUND);
      }

      // Check if the email is verified
      if (!existingUser.is_verified) {
        throw new BaseCustomError(
          "Your email isn't verified. Please verify your email!",
          StatusCode.UNAUTHORIZED
        );
      }

      // Check if the user has a password (i.e., not signed up via a third-party app)
      if (!existingUser.password) {
        throw new BaseCustomError(
          "Your account is signed up with a third-party app",
          StatusCode.BAD_REQUEST
        );
      }

      // Send verification email token
      await this.SendVerifyEmailService.SendVerifyEmailToken(
        {
          authId: existingUser._id,
          email: existingUser.email as string,
        },
        "verifyResetPassword"
      );
    } catch (error) {
      logger.error("This error accurs in ResetPassword method! :", error);
      if (error instanceof BaseCustomError) {
        throw error;
      }
      throw new ApiError("Somthing went wrong!");
    }
  }

  async ConfirmResetPassword(requestBody: ResetPassword) {
    //**************** */
    // 1. check old passwrod that exist
    // 2 hash new password
    // 3 create new user to database
    try {
      // const {  newPassword } = requestBody;

      // const existingUser = await this.AuthRepo.FindAuthById({ id });

      // if (!existingUser) {
      //   throw new BaseCustomError("User not found!", StatusCode.NOT_FOUND);
      // }

      // const isPwdCorrect = await validatePassword({
      //   enteredPassword: newPassword,
      //   savedPassword: existingUser.password as string,
      // });

      // if (!isPwdCorrect) {
      //   throw new BaseCustomError("password is exist", StatusCode.BAD_REQUEST);
      // }

      // const hashedPassword = await generatePassword(newPassword);

      // existingUser.password = hashedPassword;
      // await existingUser.save();
      return requestBody;
    } catch (error: unknown) {
      logger.error("This error accurs in ConfirmResetPassword method!", error);
      if (error instanceof BaseCustomError) {
        throw error;
      }
      throw new ApiError("Somthing went  wrong!");
    }
  }

  async Logout(decodedUser: DecodedUser): Promise<boolean> {
    try {
      const { id } = decodedUser;

      const userreq = new RequestUserService();
      const existingUser = userreq.GetUser(id);
      if (!existingUser) {
        throw new ApiError("No user found!", StatusCode.NOT_FOUND);
      }
      return true;
    } catch (error: unknown) {
      throw error;
    }
  }
}
