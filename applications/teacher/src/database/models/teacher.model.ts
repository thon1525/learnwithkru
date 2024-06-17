import mongoose, { Document, Schema } from "mongoose";
import { ITeacher } from "../../@types/teacher.type";

export interface ITeacherDocs extends ITeacher, Document {
  userId: string;
}

const teacherSchema = new Schema({
  userId: {
    type: String,
  },
  first_name: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true,
    index: true,
  },
  last_name: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true,
    index: true,
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  phone_number: {
    type: String,
    minlength: 8,
    maxlength: 10,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    index: true,
  },
  province: {
    type: String,
    required: true,
    index: true,
  },
  university: {
    type: String,
  },
  year_experience: {
    type: Number,
  },
  type_degree: {
    type: String,
  },
  certificate: {
    type: String,
  },
  bio: {
    type: String,
    minlength: 40,
    maxlength: 200,
    required: true,
  },
  motivation: {
    type: String,
    minlength: 25,
    maxlength: 200,
    required: true,
  },
  date_available: [
    {
      day: {
        type: String,
        required: true,
      },
      time: [
        {
          start: {
            type: String,
          },
          end: {
            type: String,
          },
        },
      ],
    },
  ],
  price: {
    type: Number,
    required: true,
    index: true,
  },
  video: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  teaching_experience: {
    type: String,
    minlength: 25,
    maxlength: 150,
  },
  rating: {
    type: Number,
    max: 5,
    default: 0,
  },
});

const teacherModel = mongoose.model<ITeacherDocs>("teachers", teacherSchema);

export default teacherModel;
