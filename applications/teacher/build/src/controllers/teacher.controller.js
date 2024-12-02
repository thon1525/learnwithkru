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
exports.TeacherController = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const teacher_services_1 = require("../services/teacher-services");
const path_defs_1 = require("../routes/path-defs");
const authorize_1 = require("../middlewares/authorize");
const validate_input_1 = require("../middlewares/validate-input");
const teacher_schema_1 = require("../schemas/teacher-schema");
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
const rate_services_1 = require("../services/rate-services");
let TeacherController = class TeacherController extends tsoa_1.Controller {
    TeacherList(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new teacher_services_1.TeacherServices();
                const { totalPages, totalTeachers, data, currentPage } = yield service.TeacherList(queries);
                return {
                    message: "Success retrieve teachers",
                    data,
                    detail: {
                        totalPages,
                        totalTeachers,
                        currentPage,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    TeacherSingup(requestBody, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                logger_1.logger.info(`Catching decode user: ${userId}`);
                const service = new teacher_services_1.TeacherServices();
                const newUser = yield service.CreateTeacher(requestBody, userId);
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindOneTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new teacher_services_1.TeacherServices();
                const teacher = yield service.FindOneTeacher({ id });
                return { message: "Success retrieve teacher", data: teacher };
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new teacher_services_1.TeacherServices();
                const respone = yield service.Login(userId);
                return { message: "Success login", token: respone.token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serivice = new teacher_services_1.TeacherServices();
                const existingTeacher = yield serivice.GetTeacher(id);
                return {
                    message: "Success Retrieved teacher",
                    data: existingTeacher.data,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateTeacher(id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new teacher_services_1.TeacherServices();
                const updatedTeacher = yield service.UpdateTeacher({ id, requestBody });
                return { message: "Success updated teacher", data: updatedTeacher.data };
            }
            catch (error) {
                throw error;
            }
        });
    }
    RateTeacher(teacherId, req, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const { rating } = requestBody;
                const service = new rate_services_1.RateService();
                const data = yield service.CreateRate({
                    user_id: userId,
                    teacher_id: teacherId,
                    rating: Number(rating),
                });
                return { message: "Success rate", data: { rating: data } };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.TeacherController = TeacherController;
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_TEACHER.teacherList),
    __param(0, (0, tsoa_1.Queries)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "TeacherList", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Post)(path_defs_1.PATH_TEACHER.teacherSignup),
    (0, tsoa_1.Middlewares)((0, validate_input_1.ValidateInput)(teacher_schema_1.teacherSchemas)),
    (0, tsoa_1.Middlewares)((0, authorize_1.authorize)(["user", "teacher"])),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "TeacherSingup", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_TEACHER.teacherProfile),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "FindOneTeacher", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_TEACHER.login),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "Login", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "GET OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_TEACHER.getTeacher),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "GetTeacher", null);
__decorate([
    (0, tsoa_1.Middlewares)((0, validate_input_1.ValidateInput)(teacher_schema_1.updateTeacherSchemas)),
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.CREATED, "Updated"),
    (0, tsoa_1.Patch)(path_defs_1.PATH_TEACHER.updateTeacher),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "UpdateTeacher", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.CREATED, "Create Rate"),
    (0, tsoa_1.Middlewares)((0, authorize_1.authorize)(["user", "student"])),
    (0, tsoa_1.Post)(path_defs_1.PATH_RATE.CREATE),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "RateTeacher", null);
exports.TeacherController = TeacherController = __decorate([
    (0, tsoa_1.Route)("/v1/teachers")
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map