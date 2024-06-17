export interface IUser {
  authId?: string;
  firstname: string;
  lastname: string;
  email?: string;
  picture: string | null;
}


export interface UserProfile{
  firstname: string;
  lastname: string;
  email?: string;
  picture: string | null;
}

export interface UserUpdate {
  firstname?: string;
  lastname?: string;
  picture?: string
}