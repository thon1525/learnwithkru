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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateService = void 0;
const rate_repository_1 = require("../database/repositories/rate.repository");
const teacher_repository_1 = require("../database/repositories/teacher.repository");
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
class RateService {
    constructor() {
        this.RateRepo = new rate_repository_1.RateRepository();
        this.TeacherRepo = new teacher_repository_1.TeacherRepository();
    }
    CreateRate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, teacher_id, rating }) {
            // TODO
            // 2. check teacher id
            // 3. create new rate
            try {
                const existingTeacher = yield this.TeacherRepo.FindTeacherById({
                    id: teacher_id,
                });
                if (!existingTeacher) {
                    throw new base_custom_error_1.BaseCustomError(`No teacher Found! ! ${existingTeacher}`, http_status_code_1.default.NOT_FOUND);
                }
                const existRate = yield this.RateRepo.GetRate(user_id);
                if (existRate) {
                    throw new base_custom_error_1.ApiError("you haven't rated!", http_status_code_1.default.NOT_FOUND);
                }
                existingTeacher.rating = Number(existingTeacher.rating) + 1;
                const newRate = yield this.RateRepo.CreateRate({
                    user_id,
                    teacher_id,
                    rating,
                });
                return Number(newRate.rating);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RateService = RateService;
//# sourceMappingURL=rate-services.js.map