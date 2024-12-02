import { IClassRespone } from "../@types/class.type";
import { ClassRepository } from "../database/repositories/class.repository";
// import { publishDirectMessage } from "../queue/teacher.producer";
// import { teacherChannel } from "../server";
import { IClassService } from "./@types/service.type";

export class ClassService {
  private ClassRepo: ClassRepository;

  constructor() {
    this.ClassRepo = new ClassRepository();
  }

  async CreateClass(
    classData: IClassService
  ): Promise<{ data: IClassRespone }> {
    try {
      const newClass = await this.ClassRepo.CreateClass(classData);

      const { _id, teacherId, class_name, subject, email } = newClass;

      const newClassData: IClassRespone = {
        _id: _id.toString(),
        teacherId,
        class_name,
        subject,
        email,
      };

      //   const messageDetails = {
      //     message,
      //   };

      //   publishDirectMessage(teacherChannel, "");
      return { data: newClassData };
    } catch (error: unknown) {
      throw error;
    }
  }
}
