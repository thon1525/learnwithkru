export interface UserSignup {
  firstname: string;
  lastname: string;
  email?: string;
  password?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ResetPassword {
  newPassword: string;
}

export interface IUser {

  authId?: string;
  firstname: string;
  lastname: string;
  email?: string;
  picture: string | null;
}
