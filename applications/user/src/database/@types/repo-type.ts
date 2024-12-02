import { IUser } from "../../@types/user.type";


export interface UserRepo extends IUser{
    authId: string;
}