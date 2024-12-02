import { IUser, UserUpdate } from "../../@types/user.type";
import { ApiError } from "../../error/base-custom-error";
import { logger } from "../../utils/logger";
import { UserModel } from "../models/user.model";

export class UserRepository {
  async CreateUser({ first_name, last_name, email, authId, picture }: IUser) {
    try {
      // Create user instance
      const user = new UserModel({
        authId,
        first_name,
        last_name,
        email,
        picture,
      });

      // Save user to database
      const newUser = await user.save();

      // Log success
      logger.info("User created successfully", { userId: newUser._id });

      return newUser;
    } catch (error: unknown) {
      // Rethrow error for further handling
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError(
          "An unexpected error occurred while creating the user"
        );
      }
    }
  }

  //by User Id
  async FindUser(userId: string) {
    try {
      const user = await UserModel.findOne({
        _id: userId,
      });
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  // bu authId
  async FindAuthUser(authId: string) {
    try {
      const User = await UserModel.findOne({
        authId: authId,
      });
      return User;
    } catch (error: unknown) {
      throw error;
    }
  }

  async UpdateUser(authId: string, userUpdate: UserUpdate) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { authId },
        { $set: userUpdate },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new ApiError("Unable to update user in database!");
      }

      return updatedUser;
    } catch (error: unknown) {
      throw new ApiError(`Failed to update user: ${error}`);
    }
  }

  async DeleteUser(userId: string) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });
      if (!deletedUser?.$isDeleted) {
        throw new ApiError("Unable to delete user in database!");
      }
    } catch (error: unknown) {
      throw error;
    }
  }
}
