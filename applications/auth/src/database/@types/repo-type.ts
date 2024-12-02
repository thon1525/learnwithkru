import { UserSignup } from "../../@types/user.type";

export interface AuthUserRepo extends UserSignup{
   
}
export interface OauthUserRepo extends UserSignup{
    googleId?: string;
    facebookId?: string;
    verified_email: boolean;
    picture?: string
}

export interface PaginateRepo {
    pageSize: number;
    skip: number;
}

export interface UserUpdates{
    firstname?: string;
    lastname?: string;
    password?: string;
    googleId?: string;
    is_verified?: boolean;
    picture?: string;
}
  