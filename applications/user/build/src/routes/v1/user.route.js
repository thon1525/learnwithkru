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
const user_controller_1 = require("../../controllers/user.controller");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const path_defs_1 = require("../path-defs");
const Route = (0, express_1.Router)();
Route.post(path_defs_1.PATH_USER.CREATE_USER, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        const controller = new user_controller_1.UserController();
        const newUser = yield controller.Createuser(requestBody);
        res.status(http_status_code_1.default.OK).json({
            message: "Create user success",
            data: newUser,
        });
    }
    catch (error) {
        _next(error);
    }
}));
Route.get(path_defs_1.PATH_USER.GET_USER_BY_AUTH_ID, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authId } = req.params;
    try {
        const controller = new user_controller_1.UserController();
        const user = yield controller.GetUserByAuthId(authId);
        res.status(http_status_code_1.default.OK).json({
            message: "Get user Success",
            data: user,
        });
    }
    catch (error) {
        _next(error);
    }
}));
Route.get(path_defs_1.PATH_USER.GET_USER_BY_USER_ID, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log("UserId:", userId);
    try {
        const controller = new user_controller_1.UserController();
        const user = yield controller.GetUserByUserId(userId);
        res.status(http_status_code_1.default.OK).json({
            message: "Get user success",
            data: user,
        });
    }
    catch (error) {
        _next(error);
    }
}));
exports.default = Route;
//# sourceMappingURL=user.route.js.map