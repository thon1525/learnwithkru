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
exports.StudentServices = void 0;
const student_repository_1 = require("../database/repositories/student.repository");
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const htttp_request_1 = require("../utils/htttp-request");
const jwt_1 = require("../utils/jwt");
class StudentServices {
    constructor() {
        this.StudentRepo = new student_repository_1.StudentRepository();
    }
    Signup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ decodeId, school_name, education, grade, student_card, }) {
            try {
                const existingStudent = yield this.StudentRepo.FindOneStudent(decodeId);
                console.log("This error :", existingStudent);
                if (existingStudent) {
                    throw new base_custom_error_1.BaseCustomError("you're already student", http_status_code_1.default.BAD_REQUEST);
                }
                const data = yield (0, htttp_request_1.getUserById)(decodeId);
                const { firstname, lastname, email } = data;
                const newStudent = yield this.StudentRepo.CreateStudent({
                    userId: decodeId,
                    firstname,
                    lastname,
                    email: email,
                    school_name,
                    education,
                    grade,
                    student_card,
                });
                const token = yield (0, jwt_1.generateSignature)({ _id: newStudent._id.toString() });
                return { data: newStudent, token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingStudent = yield this.StudentRepo.FindOneStudent(userId);
                const token = yield (0, jwt_1.generateSignature)({ _id: existingStudent._id.toString() });
                return { token };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StudentServices = StudentServices;
//# sourceMappingURL=student-services.js.map