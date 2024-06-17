import { IRate } from "../@types/rate.type";
import { RateRepository } from "../database/repositories/rate.repository";
import { TeacherRepository } from "../database/repositories/teacher.repository";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import StatusCode from "../utils/http-status-code";

export class RateService {
  private RateRepo: RateRepository;
  private TeacherRepo: TeacherRepository;
  constructor() {
    this.RateRepo = new RateRepository();
    this.TeacherRepo = new TeacherRepository();
  }

  async CreateRate({ user_id, teacher_id, rating }: IRate): Promise<number> {
    // TODO
    // 2. check teacher id
    // 3. create new rate
    try {
      const existingTeacher = await this.TeacherRepo.FindTeacherById({
        id: teacher_id,
      });

      if (!existingTeacher) {
        throw new BaseCustomError(
          `No teacher Found! ! ${existingTeacher}`,
          StatusCode.NOT_FOUND
        );
      }

      const existRate = await this.RateRepo.GetRate(user_id);
      if (existRate) {
        throw new ApiError("you haven't rated!", StatusCode.NOT_FOUND);
      }
      existingTeacher.rating = Number(existingTeacher.rating) + 1;
      
      const newRate = await this.RateRepo.CreateRate({
        user_id,
        teacher_id,
        rating,
      });

      return Number(newRate.rating);
    } catch (error: unknown) {
      throw error;
    }
  }
}
