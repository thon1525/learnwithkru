import { IClass } from "../../@types/class.type";
import { ITeacher } from "../../@types/teacher.type";

export interface TeacherService extends ITeacher {
  userId: string;
}
export interface CreateTeacherRes {
  TeacherRepo: TeacherService;
  token: string;
}

export interface IClassService extends IClass {
  teacherId: string;
}
