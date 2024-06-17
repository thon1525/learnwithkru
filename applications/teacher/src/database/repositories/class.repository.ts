import { IClass } from "../../@types/class.type";
import { ApiError } from "../../error/base-custom-error";
import { ClassModel, IClassDocs } from "../models/class.model";

export class ClassRepository {
  constructor() {}

  async CreateClass(classData: IClass): Promise<IClassDocs> {
    try {
      const newClass = new ClassModel(classData);
      if (!newClass) {
        throw new ApiError("Unable to create class");
      }
      return newClass;
    } catch (error: unknown) {
      throw error;
    }
  }
}
