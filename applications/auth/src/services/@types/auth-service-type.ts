import {  UserSignup } from "../../@types/user.type";

export interface AuthService extends UserSignup{
    
}

export interface GoogleOauth extends UserSignup{
    googleId: string
    verified_email: boolean
}

export interface UserService extends UserSignup {
    picture?: string | null;
    authId: string
}

// export interface ResetPasswordService extends ResetPassword{
//     token: string
// }