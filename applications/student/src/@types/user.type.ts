export interface IUser {
  authId: string;
  first_name: string;
  last_name: string;
  email?: string;
  picture: string | null;
}

export interface IResponeUser {
  first_name: string;
  last_name: string;
  email?: string;
  picture: string | null;
}
