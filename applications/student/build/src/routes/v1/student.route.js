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
const student_controller_1 = require("../../controllers/student.controller");
const student_validate_1 = require("../../middlewares/student-validate");
const student_validate_2 = require("../../schemas/student-validate");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const authorize_1 = require("../../middlewares/authorize");
const Route = (0, express_1.Router)();
Route.post(path_defs_1.PATH_STUDENT.SIGNUP, (0, authorize_1.authorize)(["student", "user"]), (0, student_validate_1.studentValidate)(student_validate_2.StudentSchemas), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        const controller = new student_controller_1.StudentController();
        const newStudent = yield controller.Signup(requestBody, req);
        res.status(http_status_code_1.default.CREATED).json(newStudent);
    }
    catch (error) {
        _next(error);
    }
}));
exports.default = Route;
//# sourceMappingURL=student.route.js.map