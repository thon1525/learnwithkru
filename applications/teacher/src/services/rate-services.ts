import { IRate } from "../@types/rate.type";
import { ITotalRating } from "../@types/teacher.type";
import { RateRepository } from "../database/repositories/rate.repository";
import { TeacherRepository } from "../database/repositories/teacher.repository";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import StatusCode from "../utils/http-status-code";
import { calculateRating } from "../utils/star-calculator";

export class RateService {
  private RateRepo: RateRepository;
  private TeacherRepo: TeacherRepository;
  constructor() {
    this.RateRepo = new RateRepository();
    this.TeacherRepo = new TeacherRepository();
  }

  async CreateRate({
    user_id,
    teacher_id,
    rating,
    feedback,
  }: IRate): Promise<{ rating: number; feedback: string }> {
    try {
      // Validate the rating value
      const numericRating = Number(rating);
      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        throw new BaseCustomError(
          "Rating should be an integer between 1 and 5.",
          StatusCode.BAD_REQUEST
        );
      }

      // Check if the teacher exists
      const existingTeacher = await this.TeacherRepo.FindTeacherById({
        id: teacher_id,
      });
      if (!existingTeacher) {
        throw new BaseCustomError("No teacher found!", StatusCode.NOT_FOUND);
      }

      // Check if the user has already rated this teacher
      const existingRate = await this.RateRepo.GetRate(user_id, teacher_id);
      if (existingRate) {
        throw new ApiError(
          "You have already rated this teacher!",
          StatusCode.CONFLICT
        );
      }

      // Initialize or update the rating counts
      const ratingStar: ITotalRating = {
        r1: existingTeacher.total_rating?.r1 || 0,
        r2: existingTeacher.total_rating?.r2 || 0,
        r3: existingTeacher.total_rating?.r3 || 0,
        r4: existingTeacher.total_rating?.r4 || 0,
        r5: existingTeacher.total_rating?.r5 || 0,
      };

      // Increment the corresponding rating count
      ratingStar[`r${numericRating}` as keyof ITotalRating]! += 1;

      // Prepare the update data
      const updateRating = {
        total_rating: ratingStar,
        number_of_ratings: (existingTeacher.number_of_ratings || 0) + 1,
      };

      // Save the updated teacher data
      const updatedTeacher = await this.TeacherRepo.UpdateTeacher({
        id: teacher_id,
        teacherData: updateRating,
      });

      // Calculate the average rating
      const { r1, r2, r3, r4, r5 } =
        updatedTeacher.total_rating as ITotalRating;
      const averageRating = calculateRating(
        Number(r1),
        Number(r2),
        Number(r3),
        Number(r4),
        Number(r5)
      );

      // Create the new rating entry
      const newRating = await this.RateRepo.CreateRate({
        user_id,
        teacher_id,
        rating: numericRating,
        feedback: feedback,
      });

      console.log(
        `Response data from service: Average Rating - ${averageRating}, Feedback - ${newRating.feedback}`
      );

      return { rating: averageRating, feedback: newRating.feedback as string };
    } catch (error: unknown) {
      // Log the error and rethrow
      console.error("Error creating rating:", error);
      throw error;
    }
  }
}
