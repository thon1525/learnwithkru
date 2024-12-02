import mongoose from "mongoose";
import { IUser } from "../../@types/user.type";

export interface IUserDoc extends IUser, Document {}

const userSchemas = new mongoose.Schema({
  authId: {
    type: String,
  },
  first_name: {
    type: String,
    min: 2,
    max: 25,
    require: true,
  },
  last_name: {
    type: String,
    min: 2,
    max: 25,
    require: true,
  },
  email: {
    type: String,
    min: 2,
  },
  picture: {
    type: String,
  },
});

export const UserModel = mongoose.model<IUserDoc>("users", userSchemas);
