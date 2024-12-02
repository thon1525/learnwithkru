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
exports.TeacherRepository = void 0;
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const base_custom_error_1 = require("../../error/base-custom-error");
const logger_1 = require("../../utils/logger");
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
class TeacherRepository {
    constructor() { }
    CreateTeacher(teacherData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Log the attempt to create a new teacher
                logger_1.logger.info(`Attempting to create a new teacher with data: ${JSON.stringify(teacherData)}`);
                // Create the new teacher
                const newTeacher = new teacher_model_1.default(teacherData);
                if (!newTeacher) {
                    // Log the failure to create the teacher
                    logger_1.logger.error("Failed to create a new teacher: Teacher creation returned null");
                    throw new base_custom_error_1.ApiError("Unable to create user in database!");
                }
                // Save the new teacher
                const savedTeacher = yield newTeacher.save();
                // Log the success
                logger_1.logger.info(`Successfully created and saved a new teacher with ID: ${savedTeacher.id}`);
                return savedTeacher;
            }
            catch (error) {
                // Log the error
                logger_1.logger.error("Error occurred while creating a new teacher", error);
                if (error instanceof base_custom_error_1.ApiError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing went wrong!");
            }
        });
    }
    FindAllTeachers(_a, filter_1) {
        return __awaiter(this, arguments, void 0, function* ({ pageSize, skip }, filter) {
            try {
                // Validate inputs
                if (pageSize <= 0 || skip < 0) {
                    throw new base_custom_error_1.ApiError("Invalid pagination parameters!", http_status_code_1.default.BAD_REQUEST);
                }
                // Fetch teachers from the database
                // Fetch teachers and total count concurrently
                const [teachers, totalTeachers] = yield Promise.all([
                    teacher_model_1.default
                        .find(filter)
                        .sort({ createdAt: -1 })
                        .skip(skip)
                        .limit(pageSize)
                        .lean(),
                    teacher_model_1.default.countDocuments(filter),
                ]);
                // Check if teachers are found
                if (!teachers || teachers.length === 0) {
                    throw new base_custom_error_1.ApiError("No teacher found!", http_status_code_1.default.NOT_FOUND);
                }
                return { data: teachers, totalTeachers: totalTeachers };
            }
            catch (error) {
                // Log the error
                logger_1.logger.error("Error finding teachers:", error);
                // Re-throw custom errors
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                // Throw a generic error for other cases
                throw new base_custom_error_1.ApiError("Something went wrong!");
            }
        });
    }
    // By teacher id
    FindTeacherById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                // Validate input
                if (!id) {
                    throw new base_custom_error_1.ApiError("Invalid ID parameter!", http_status_code_1.default.BAD_REQUEST);
                }
                // Fetch teacher by ID from the database
                const teacher = yield teacher_model_1.default.findById({ _id: id }).exec();
                // Check if a teacher was found
                if (!teacher) {
                    throw new base_custom_error_1.BaseCustomError("No teacher matches this ID!", http_status_code_1.default.NOT_FOUND);
                }
                return teacher;
            }
            catch (error) {
                // Log the error
                logger_1.logger.error("Error finding teacher by ID:", error);
                // Re-throw custom errors
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                // Throw a generic error for other cases
                throw new base_custom_error_1.ApiError("Something went wrong!");
            }
        });
    }
    FindTeacherByUserID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate input
                if (!userId) {
                    throw new base_custom_error_1.ApiError("Invalid user ID parameter!", http_status_code_1.default.BAD_REQUEST);
                }
                // Fetch teacher by user ID from the database
                const existTeacher = yield teacher_model_1.default.findOne({ userId }).exec();
                // Log the operation
                logger_1.logger.info(`Teacher with user ID ${userId} ${existTeacher ? "found" : "not found"}`);
                return existTeacher;
            }
            catch (error) {
                // Log the error
                logger_1.logger.error("Error finding teacher by user ID:", error);
                // Re-throw custom errors
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                // Throw a generic error for other cases
                throw new base_custom_error_1.ApiError("Something went wrong!");
            }
        });
    }
    UpdateTeacher(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, teacherData, }) {
            try {
                // Log the attempt to update a new teacher
                logger_1.logger.info(`Attempting to update a new teacher with data: ${JSON.stringify(teacherData)}`);
                // update the new teacher
                const newTeacher = yield teacher_model_1.default.findByIdAndUpdate({ _id: id }, teacherData, { new: true });
                if (!newTeacher) {
                    // Log the failure to update the teacher
                    logger_1.logger.error("Failed to update a new teacher: Teacher creation returned null");
                    throw new base_custom_error_1.ApiError("Unable to update user in database!");
                }
                // Save the new teacher
                const savedTeacher = yield newTeacher.save();
                // Log the success
                logger_1.logger.info(`Successfully updated and saved a new teacher with ID: ${savedTeacher.id}`);
                return savedTeacher;
            }
            catch (error) {
                // Log the error
                logger_1.logger.error("Error occurred while creating a new teacher", error);
                if (error instanceof base_custom_error_1.ApiError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing went wrong!");
            }
        });
    }
}
exports.TeacherRepository = TeacherRepository;
//# sourceMappingURL=teacher.repository.js.map