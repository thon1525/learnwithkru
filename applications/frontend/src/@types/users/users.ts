interface CardTeachersTypes {
  _id: string;
  first_name: string;
  last_name: string;
  picture: string;
  subject: string;
  phone_number: string;
  province: string;
  university: string;
  year_experience: number;
  type_degree: string;
  bio: string;
  teacher_experience: string;
  motivation: string;
  date_available: object;
  price: number;
  video: string;
}

export interface AuthModel {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}
export interface UserContextType {
  auth: AuthModel[];
  addNewAuth: (auth: AuthModel) => void;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<boolean>;
}

export type AuthForm = Omit<AuthModel, "id">;

export type { CardTeachersTypes };

// handle login

export interface UsersLogin {
  email: string;
  password: string;
}

export interface UserLoginContextType {
  usersLogin: UsersLogin[];
  rememberMe: boolean;
  setRememberMe: React.Dispatch<boolean>;
  addLoginUsers: (usersLogin: UsersLogin) => void;
}

export type UsersFormLogin = Omit<UsersLogin, "id">;
