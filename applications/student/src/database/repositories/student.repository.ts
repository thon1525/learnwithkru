import { ApiError } from "../../error/base-custom-error";
import { StudentRepo } from "../@types/repo-type";
import { StudentModel } from "../models/student.model";

export class StudentRepository {
  async CreateStudent({
    school_name,
    education,
    grade,
    student_card,
    firstname,
    lastname,
    email,
    userId,
  }: StudentRepo) {
    try {
      const newStudent = await StudentModel.create({
        userId,
        firstname,
        lastname,
        email,
        school_name,
        education,
        grade: grade,
        student_card,
      });

      if (!newStudent) {
        throw new ApiError("Unable to create student in db!");
      }
      return await newStudent.save();
    } catch (error: unknown) {
      throw error;
    }
  }

  async FindOneStudent(studentId: string){
    try {
      const student = await StudentModel.findOne({
        _id: studentId,
      });
      return await student;
    } catch (error: unknown) {
      throw error;
    }
  }

  async FindByUserId(userId: string){
    try{
      const existStudent = await StudentModel.findOne({
        userId: userId
      });
      return existStudent
    }catch(error: unknown){
      throw error
    }
  }
}
