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
const express_1 = require("express");
const path_defs_1 = require("../path-defs");
const teacher_controller_1 = require("../../controllers/teacher.controller");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const teacher_schema_1 = require("../../schemas/teacher-schema");
const validate_input_1 = require("../../middlewares/validate-input");
const authorize_1 = require("../../middlewares/authorize");
const TeacherRoute = (0, express_1.Router)();
TeacherRoute.get(path_defs_1.PATH_TEACHER.teacherList, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageSize = 10, pageNumber = 1 } = req.query;
    // Convert pageSize and pageNumber to numbers
    const parsedPageSize = parseInt(pageSize, 10);
    const parsedPageNumber = parseInt(pageNumber, 10);
    const options = {
        pageSize: parsedPageSize,
        pageNumber: parsedPageNumber,
    };
    try {
        const controller = new teacher_controller_1.TeacherController();
        const teachers = yield controller.TeacherList(options);
        res.status(http_status_code_1.default.OK).json({
            message: "success",
            data: teachers,
        });
    }
    catch (error) {
        _next(error);
    }
}));
TeacherRoute.post(path_defs_1.PATH_TEACHER.teacherSignup, (0, authorize_1.authorize)(["user", "teacher"]), (0, validate_input_1.TeacherValidate)(teacher_schema_1.teacherSchemas), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    // const user = req.user as DecodedUser;
    try {
        const controller = new teacher_controller_1.TeacherController();
        const newTeacher = yield controller.TeacherSingup(requestBody, req);
        res.status(http_status_code_1.default.CREATED).json({
            message: "success",
            data: newTeacher,
            token: newTeacher.token,
        });
    }
    catch (error) {
        _next(error);
    }
}));
TeacherRoute.get(path_defs_1.PATH_TEACHER.teacherProfile, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const controller = new teacher_controller_1.TeacherController();
        const teacher = yield controller.FindOneTeacher(id);
        res.status(http_status_code_1.default.OK).json({
            message: "success",
            data: teacher,
        });
    }
    catch (error) {
        _next(error);
    }
}));
exports.default = TeacherRoute;
//# sourceMappingURL=teacher.route.js.map