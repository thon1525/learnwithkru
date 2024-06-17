import { IUser } from "./user";

export interface IAuth {
  isAuth?: boolean;
  errors?: string;
  data: IUser | null;
}
