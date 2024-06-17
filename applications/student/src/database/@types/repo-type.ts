import { IStudent } from "../../@types/student.type";


export interface StudentRepo extends IStudent{
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
}