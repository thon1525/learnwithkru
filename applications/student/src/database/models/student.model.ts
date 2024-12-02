import mongoose from "mongoose";

export interface IStudentDocs extends Document {}

const studentSchemas = new mongoose.Schema({
  userId: {
    type: String,
  },
  first_name: {
    type: String,
    min: 2,
    max: 25,
  },
  last_name: {
    type: String,
    min: 2,
    max: 25,
  },
  email: {
    type: String,
    min: 2,
  },
  picture: {
    type: String,
  },
  school_name: {
    type: String,
    min: 2,
    max: 50,
    require: true,
  },
  education: {
    type: String,
    min: 2,
    require: true,
    max: 50,
  },
  grade: {
    require: true,
    type: Number,
  },
  student_card: {
    type: String,
  },
});

export const StudentModel = mongoose.model("students", studentSchemas);
