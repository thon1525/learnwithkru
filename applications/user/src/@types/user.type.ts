export interface IUser {
  authId?: string;
  first_name: string;
  last_name: string;
  email?: string;
  picture: string | null;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  email?: string;
  picture: string | null;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  picture?: string;
}
