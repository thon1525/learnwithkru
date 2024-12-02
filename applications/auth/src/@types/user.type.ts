
export interface UserSignup {
  first_name: string;
  last_name: string;
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
  first_name: string;
  last_name: string;
  email?: string;
  picture: string | null;
}
