import { IUser, UserProfile, UserUpdate } from "../@types/user.type";
import { UserRepository } from "../database/repositories/user.repository";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import StatusCode from "../utils/http-status-code";
import { MakeRequest } from "../utils/htttp-request";
import { logger } from "../utils/logger";

export class UserServices {
  public UserRepo: UserRepository;
  constructor() {
    this.UserRepo = new UserRepository();
  }
  async CreateUser({
    authId,
    first_name,
    last_name,
    email,
    picture,
  }: IUser): Promise<IUser> {
    // TODO
    // 1. encrypt token
    // 2. make requst to get auth user in auth service database
    // 3. create new user in database
    try {
      const existingUser = await this.UserRepo.FindAuthUser(authId as string);

      if (existingUser) {
        throw new BaseCustomError(
          "User is exist in database!",
          StatusCode.BAD_REQUEST
        );
      }
      // step 3
      const newUser = await this.UserRepo.CreateUser({
        authId,
        first_name,
        last_name,
        email,
        picture,
      });

      return newUser;
    } catch (error: unknown) {
      if (error instanceof BaseCustomError) {
        throw error;
      }
      logger.error(
        "An unexpected error occurred while retrieving the user in CreateUser() method!",
        error
      );
      throw new ApiError(
        "An unexpected error occurred while creating the user."
      );
    }
  }

  async GetUserByAuthId(authId: string) {
    try {
      const user = await this.UserRepo.FindAuthUser(authId);

      if (!user) {
        throw new ApiError("Unable to find user in database!");
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error(
        "An unexpected error occurred while retrieving the user in GetUserByAuthId() method!",
        error
      );
      throw new ApiError(
        "An unexpected error occurred while retreive the user."
      );
    }
  }
  async GetUserByUserId(userId: string): Promise<IUser> {
    try {
      const user = (await this.UserRepo.FindUser(userId)) as IUser;

      if (!user) {
        throw new ApiError("Unable to find user in database!");
      }

      return user;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error(
        "An unexpected error occurred while retrieving the user in GetUserByUserId() method!",
        error
      );
      throw new ApiError(
        "An unexpected error occurred while retrieving the user."
      );
    }
  }

  async GetUserProfile(userId: string): Promise<{ data: UserProfile }> {
    try {
      const existingUser = await this.UserRepo.FindUser(userId);
      if (existingUser) {
        const { first_name, last_name, email, picture } = existingUser;

        return { data: { first_name, last_name, email, picture } };
      }

      const makeRequest = MakeRequest.GetInstance();
      const existingTeacher = await makeRequest.getTeacherProfile(userId);
      if (existingTeacher) {
        return { data: this.extractUserProfile(existingTeacher) };
      }

      logger.error(`No User found for userId: ${userId}`);
      throw new ApiError("No User found!", StatusCode.NOT_FOUND);
    } catch (error: any) {
      logger.error(`Error fetching user profile for userId: ${userId}`, error);
      if (
        error?.message.includes("'No teacher matches this ID!") ||
        error?.code === 404
      ) {
        try {
          const makeRequest = MakeRequest.GetInstance();
          const existingStudent = await makeRequest.getStudentProfile(userId);
          logger.info(
            `here existing student ${JSON.stringify(existingStudent)}`
          );
          if (existingStudent) {
            return { data: this.extractUserProfile(existingStudent) };
          }
        } catch (error: unknown) {
          throw error;
        }
      }

      throw error;
    }
  }

  private extractUserProfile(user: any): UserProfile {
    console.log(user);
    const { first_name, last_name, email, picture } = user.data;
    return { first_name, last_name, email, picture };
  }

  async UpdateUserByUserId(
    authId: string,
    userData: UserUpdate
  ): Promise<{ data: IUser }> {
    try {
      const UpdateUser = await this.UserRepo.UpdateUser(authId, userData);

      return { data: UpdateUser };
    } catch (error: unknown) {
      throw error;
    }
  }
}
