"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateRepository = void 0;
const base_custom_error_1 = require("../../error/base-custom-error");
const logger_1 = require("../../utils/logger");
const rate_model_1 = require("../models/rate.model");
class RateRepository {
    constructor() { }
    CreateRate(rateItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`rateItem: ${rateItem}`);
                const newRate = new rate_model_1.rateModel(rateItem).save();
                if (!newRate) {
                    throw new base_custom_error_1.ApiError("Unable to create rate in database!");
                }
                logger_1.logger.info(`rateItem created: ${newRate}`);
                return newRate;
            }
            catch (error) {
                logger_1.logger.info(`An error accur in CreateRate ${error}`);
                throw error;
            }
        });
    }
    GetRate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existRate = yield rate_model_1.rateModel.find({
                    user_id: userId,
                });
                return existRate;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RateRepository = RateRepository;
//# sourceMappingURL=rate.repository.js.map