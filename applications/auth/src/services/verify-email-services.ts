import AccountVerificationModel from "../database/models/account-verification.model";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import { publishDirectMessage } from "../queue/auth.producer";
import { authChannel } from "../server";
import { generateEmailVerificationToken } from "../utils/account-verification";
import { GenerateTimeExpire } from "../utils/date-generate";
import { RequestUserService } from "../utils/http-request";
import StatusCode from "../utils/http-status-code";
import { generateSignature } from "../utils/jwt";
import { logger } from "../utils/logger";
import { AccountVerificationRepository } from "../database/repositories/account-verification.repository";
import { AuthRepository } from "../database/repositories/auth.respository";
import { ObjectId } from "mongodb";
import { IUser } from "../@types/user.type";
import getConfig from "../utils/config";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);


console.log("Notif config ", config)
export class SendVerifyEmailService {
  private accountVerificationRepo: AccountVerificationRepository;
  private authRepo: AuthRepository;
  constructor() {
    this.accountVerificationRepo = new AccountVerificationRepository();
    this.authRepo = new AuthRepository();
  }

  async SendVerifyEmailToken(
    {
      authId,
      email,
    }: {
      authId: ObjectId;
      email: string;
    },
    type: "verifyEmail" | "verifyResetPassword"
  ) {
    try {
      // Step 1: Generate token
      const emailVerificationToken = generateEmailVerificationToken();

      // Step 2: Generate current date and expiry date
      const now = new Date();
      const inTenMinutes = GenerateTimeExpire(now);

      // Step 3: Save verification data to the database
      const accountVerification = new AccountVerificationModel({
        authId: authId,
        emailVerificationToken: emailVerificationToken,
        expired_at: inTenMinutes,
      });
      const newAccountVerification = await accountVerification.save();

      // Step 4: Prepare email message details based on type
      let messageDetails;
      if (type === "verifyEmail") {
        messageDetails = {
          receiverEmail: email,
          verifyLink: `${config.clientUrl}/verify-email?token=${newAccountVerification.emailVerificationToken}`,
          template: "verifyEmail",
        };
      } else if (type === "verifyResetPassword") {
        messageDetails = {
          receiverEmail: email,
          verifyLink: `${config.clientUrl}/verify-reset-password?token=${newAccountVerification.emailVerificationToken}`,
          template: "verifyResetPassword",
        };
      }

      // Step 5: Send email by publishing a message to the notification service
      await publishDirectMessage(
        authChannel,
        "learnwithkru-verify-email",
        "auth-email",
        JSON.stringify(messageDetails),
        `Verify ${type} message has been sent to the notification service`
      );
    } catch (error) {
      logger.error(
        "Unexpected error occurs in SendVerifyEmailToken() method: ",
        error
      );
      throw new ApiError("Unable to send email to user!");
    }
  }

  async VerifyEmailToken(token: string) {
    try {
      // Step 1: Verify existing token
      logger.info("Token has recieved =", token);
      const verificationToken =
        await this.accountVerificationRepo.FindVerificationToken({ token });

      if (!verificationToken) {
        throw new BaseCustomError(
          "Verification token is invalid",
          StatusCode.BAD_REQUEST
        );
      }

      // Step 2: Check expire date
      const now = new Date();
      if (now > verificationToken.expired_at) {
        await this.accountVerificationRepo.DeleteVerificationByToken({ token });
        throw new BaseCustomError(
          "Verification token has expired",
          StatusCode.UNAUTHORIZED
        );
      }

      // Step 3: Find auth data in database
      const user = await this.authRepo.FindAuthById({
        id: verificationToken.authId,
      });

      if (!user) {
        throw new BaseCustomError("User does not exist", StatusCode.NOT_FOUND);
      }

      // Step 4: Check if user is already verified
      if (user.is_verified) {
        throw new BaseCustomError(
          "User is already verified",
          StatusCode.BAD_REQUEST
        );
      }

      // Mark user as verified
      user.is_verified = true;
      const newUser = await user.save();
      const { _id, firstname, lastname, email } = newUser;

      // Step 5: Create user in database user service
      const userData: IUser = {
        authId: _id.toString(),
        firstname: firstname!,
        lastname: lastname!,
        email: email!,
        picture: null,
      } as IUser;

      const requestUserService = new RequestUserService();
      const { data } = await requestUserService.CreateUser(userData);

      if (!data) {
        throw new BaseCustomError(
          "Unable to create new user in user service",
          StatusCode.INTERNAL_SERVER_ERROR
        );
      }

      // Step 6: Generate JWT token
      const jwtToken = await generateSignature({ _id: data._id.toString() });
      // step 7: Send success message

      const messageDetails = {
        receiver: data._id.toString(),
        template: "verifyResetPassword",
        timestamp: new Date().toLocaleString(),
        title: "Congratulations on Joining Learnwithkru",
        message:
          "Thank you for joining us. We are excited to help you on your educational journey.",
      };

      await publishDirectMessage(
        authChannel,
        "learnwithkru-notification-message",
        "notification-message",
        JSON.stringify(messageDetails),
        `Success verify verify Email token message has been sent to the notification service`
      );
      // Step 8: Delete account verification token from database
      await this.accountVerificationRepo.DeleteVerificationByToken({ token });

      return { data, token: jwtToken };
    } catch (error) {
      throw error;
    }
  }

  async VerifyResetPasswordToken(token: string): Promise<{ message: string }> {
    try {
      // Step 1: Verify existing token
      const verificationToken =
        await this.accountVerificationRepo.FindVerificationToken({ token });

      if (!verificationToken) {
        throw new BaseCustomError(
          "Verification token is invalid",
          StatusCode.BAD_REQUEST
        );
      }

      // Step 2: Check expire date
      const now = new Date();
      if (now > verificationToken.expired_at) {
        await this.accountVerificationRepo.DeleteVerificationByToken({ token });
        throw new BaseCustomError(
          "Verification token has expired",
          StatusCode.UNAUTHORIZED
        );
      }

      // Step 3: Find auth data in database
      const user = await this.authRepo.FindAuthById({
        id: verificationToken.authId,
      });

      if (!user) {
        throw new BaseCustomError("User does not exist", StatusCode.NOT_FOUND);
      }

      // Step 4: Check if user is already verified
      if (user.is_verified) {
        throw new BaseCustomError(
          "User is already verified",
          StatusCode.BAD_REQUEST
        );
      }
      return { message: "Verify reset password successfully" };
    } catch (error: unknown) {
      logger.error(
        "This error accurs in VerifyResetPasswordToken method! ",
        error
      );
      throw error;
    }
  }
}
