"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.StudentController = void 0;
const student_services_1 = require("../services/student-services");
const tsoa_1 = require("tsoa");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const path_defs_1 = require("../routes/path-defs");
const authorize_1 = require("../middlewares/authorize");
const student_validate_1 = require("../middlewares/student-validate");
const student_validate_2 = require("../schemas/student-validate");
let StudentController = class StudentController extends tsoa_1.Controller {
    Signup(requestBody, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodeId = req.user.id;
            const student = Object.assign({ decodeId }, requestBody);
            try {
                const service = new student_services_1.StudentServices();
                const newStudent = yield service.Signup(student);
                return {
                    message: "Success Signup",
                    data: newStudent.data,
                    token: newStudent.token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new student_services_1.StudentServices();
                const respone = yield service.Login(userId);
                return { message: "Success login", token: respone.token };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Middlewares)((0, authorize_1.authorize)(["user"])),
    (0, tsoa_1.Middlewares)((0, student_validate_1.studentValidate)(student_validate_2.StudentSchemas)),
    (0, tsoa_1.Post)(path_defs_1.PATH_STUDENT.SIGNUP),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "Signup", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_STUDENT.LOGIN),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "Login", null);
exports.StudentController = StudentController = __decorate([
    (0, tsoa_1.Route)("/v1/students")
], StudentController);
//# sourceMappingURL=student.controller.js.map