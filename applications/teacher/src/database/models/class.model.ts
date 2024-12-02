import { ObjectId } from "mongodb";
import { model, Document, Schema } from "mongoose";

export interface IClassDocs extends Document {
  _id: ObjectId;
  teacherId: string;
  class_name: string;
  subject: string;
  email: string;
}

const classSchema = new Schema<IClassDocs>({
  teacherId: { type: String, required: true },
  class_name: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const ClassModel = model<IClassDocs>("classes", classSchema);
