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
exports.errorHandler = void 0;
const base_custom_error_1 = require("../error/base-custom-error");
const errorHandler = (error, _req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof base_custom_error_1.BaseCustomError) {
        const status = error.statusCode;
        res.status(status).json({
            success: false,
            errors: {
                message: error.message,
                code: status
            }
        });
    }
    _next();
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorsHandler.js.map