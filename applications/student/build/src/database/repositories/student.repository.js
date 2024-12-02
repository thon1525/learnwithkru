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
exports.StudentRepository = void 0;
const base_custom_error_1 = require("../../error/base-custom-error");
const student_model_1 = require("../models/student.model");
class StudentRepository {
    CreateStudent(_a) {
        return __awaiter(this, arguments, void 0, function* ({ school_name, education, grade, student_card, firstname, lastname, email, userId, }) {
            try {
                const newStudent = yield student_model_1.StudentModel.create({
                    userId,
                    firstname,
                    lastname,
                    email,
                    school_name,
                    education,
                    grade: grade,
                    student_card,
                });
                if (!newStudent) {
                    throw new base_custom_error_1.ApiError("Unable to create student in db!");
                }
                return yield newStudent.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindOneStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield student_model_1.StudentModel.findOne({
                    _id: studentId,
                });
                return yield student;
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existStudent = yield student_model_1.StudentModel.findOne({
                    userId: userId
                });
                return existStudent;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=student.repository.js.map