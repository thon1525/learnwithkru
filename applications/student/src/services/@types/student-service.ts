import { IStudent } from "../../@types/student.type";


export interface IStudentDecoded extends IStudent {
    decodeId: string
}

export interface IStudentLogin extends IStudent {
    userId: string
}