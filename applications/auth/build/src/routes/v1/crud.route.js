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
const crud_controller_1 = require("../../controllers/crud.controller");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const CrudRoute = (0, express_1.Router)();
CrudRoute.get(path_defs_1.PATH_CRUD.getUser, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const authId = req.params.authId;
    try {
        const controller = new crud_controller_1.CrudController();
        const user = yield controller.GetUser(authId);
        res.status(http_status_code_1.default.OK).json({
            message: "Get success",
            data: user
        });
    }
    catch (error) {
        _next(error);
    }
}));
exports.default = CrudRoute;
//# sourceMappingURL=crud.route.js.map