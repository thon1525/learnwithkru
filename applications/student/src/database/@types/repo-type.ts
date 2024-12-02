import { IStudent } from "../../@types/student.type";

export interface StudentRepo extends IStudent {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string | null;
}
