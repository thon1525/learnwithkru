import { IRate } from "../../@types/rate.type";
import { ApiError } from "../../error/base-custom-error";
import { logger } from "../../utils/logger";
import { rateModel } from "../models/rate.model";

export class RateRepository {
  constructor() {}

  async CreateRate(rateItem: IRate) {
    try {
      logger.info(`rateItem: ${rateItem}`);
      const newRate = new rateModel(rateItem).save();

      if (!newRate) {
        throw new ApiError("Unable to create rate in database!");
      }
      logger.info(`rateItem created: ${newRate}`);

      return newRate;
    } catch (error: unknown) {
      logger.info(`An error accur in CreateRate ${error}`);
      throw error;
    }
  }

  async GetRate(userId: string) {
    try {
      const existRate = await rateModel.find({
        user_id: userId,
      });

      return existRate;
    } catch (error: unknown) {
      throw error;
    }
  }
}
