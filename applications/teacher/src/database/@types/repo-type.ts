import { ObjectId } from "mongodb";
import { ITeacher } from "../../@types/teacher.type";

export interface PaginateRepo {
    pageSize: number;
    skip: number;
}

export interface TeacherRepo extends ITeacher{
    _id?: ObjectId;
    userId: string
}

