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
exports.TeacherServices = void 0;
const teacher_repository_1 = require("../database/repositories/teacher.repository");
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
const notification_serivice_1 = require("./notification-serivice");
class TeacherServices {
    constructor() {
        this.teacherRepo = new teacher_repository_1.TeacherRepository();
    }
    TeacherList(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, province, time_available, min_p, max_p, subject, pageNumber = 1, pageSize = 10, } = queries;
                const skip = (pageNumber - 1) * pageSize;
                const filter = {};
                if (name) {
                    const regex = new RegExp(name, "i");
                    filter.$or = [
                        { first_name: regex },
                        { last_name: regex },
                        { province: regex },
                        { "date_available.day": regex },
                        { "date_available.time.start": regex },
                        { "date_available.time.end": regex },
                        { pricing: regex }, // Adjust if pricing is not a string
                        { subject: regex },
                    ];
                } // Case-insensitive regex search
                if (province)
                    filter.province = province;
                if (time_available)
                    filter["date_available.day"] = time_available;
                if (min_p && max_p)
                    filter.pricing = { $gte: Number(min_p), $lte: Number(max_p) }; // Adjust as necessary
                if (subject)
                    filter.subject = subject;
                const { totalTeachers, data } = yield this.teacherRepo.FindAllTeachers({
                    pageSize,
                    skip,
                }, filter);
                return {
                    totalTeachers: totalTeachers,
                    totalPages: Math.ceil(totalTeachers / pageSize),
                    currentPage: pageNumber,
                    data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateTeacher(requestBody, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherData = Object.assign({ userId }, requestBody);
                const existTeacher = yield this.teacherRepo.FindTeacherByUserID(userId);
                logger_1.logger.info(`Existing teacher: ${existTeacher}`);
                if (existTeacher) {
                    throw new base_custom_error_1.BaseCustomError("you're already become a teacher !", http_status_code_1.default.BAD_REQUEST);
                }
                const newTeacher = yield this.teacherRepo.CreateTeacher(teacherData);
                const token = yield (0, jwt_1.generateSignature)({
                    _id: newTeacher._id.toString(),
                });
                const messageSender = notification_serivice_1.NotificationService.getInstance();
                yield messageSender.sendSuccesfullyNotification({
                    userId: newTeacher._id.toString(),
                    message: `
      Congratulations, [${newTeacher.first_name + newTeacher.last_name}]!

You have successfully signed up for an account. Welcome to our community!

Start exploring and discovering all the features we have to offer. Should you have any queries or need assistance, don't hesitate to reach out to us.

We're thrilled to have you on board!
      `,
                });
                return { data: newTeacher, token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindOneTeacher(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const teacher = yield this.teacherRepo.FindTeacherById({ id });
                return teacher;
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTeacher = yield this.teacherRepo.FindTeacherByUserID(userId);
                const token = yield (0, jwt_1.generateSignature)({
                    _id: existingTeacher.id.toString(),
                });
                return { token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTeacher = yield this.teacherRepo.FindTeacherById({ id });
                if (!existingTeacher) {
                    throw new base_custom_error_1.BaseCustomError("No teacher found!", http_status_code_1.default.NOT_FOUND);
                }
                return { data: existingTeacher };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateTeacher(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, requestBody, }) {
            try {
                const { first_name, last_name, picture, phone_number, subject, province, university, year_experience, type_degree, bio, motivation, date_available, price, certificate, video, teaching_experience, } = requestBody;
                const teacherObject = {};
                const existingTeacher = this.teacherRepo.FindTeacherById({ id });
                if (!existingTeacher) {
                    throw new base_custom_error_1.BaseCustomError("No teacher found!, can't update the teacher", http_status_code_1.default.NOT_FOUND);
                }
                if (first_name)
                    teacherObject.first_name = first_name;
                if (last_name)
                    teacherObject.last_name = last_name;
                if (picture)
                    teacherObject.picture = picture;
                if (phone_number)
                    teacherObject.phone_number = phone_number;
                if (subject)
                    teacherObject.subject = subject;
                if (province)
                    teacherObject.province = province;
                if (university)
                    teacherObject.university = university;
                if (year_experience)
                    teacherObject.year_experience = year_experience;
                if (type_degree)
                    teacherObject.type_degree = type_degree;
                if (bio)
                    teacherObject.bio = bio;
                if (motivation)
                    teacherObject.motivation = motivation;
                if (date_available)
                    teacherObject.date_available = date_available;
                if (price)
                    teacherObject.price = price;
                if (certificate)
                    teacherObject.certificate = certificate;
                if (video)
                    teacherObject.video = video;
                if (teaching_experience)
                    teacherObject.teaching_experience = teaching_experience;
                const updatedTeacher = yield this.teacherRepo.UpdateTeacher({
                    id,
                    teacherData: teacherObject,
                });
                return { data: updatedTeacher };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TeacherServices = TeacherServices;
//# sourceMappingURL=teacher-services.js.map