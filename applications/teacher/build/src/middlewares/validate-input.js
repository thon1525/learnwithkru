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
exports.ValidateInput = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const zod_1 = require("zod");
const base_custom_error_1 = require("../error/base-custom-error");
const ValidateInput = (schema) => {
    return (req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            schema.parse(req.body);
            _next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => {
                    return `${issue.path.join(".")} is ${issue.message}`;
                });
                _next(new base_custom_error_1.BaseCustomError(errorMessages, http_status_code_1.default.UNPROCESSABLE_ENTITY));
            }
            console.log("Somthign went wrong!");
            _next(new base_custom_error_1.ApiError("Somthing went wrong!"));
        }
    });
};
exports.ValidateInput = ValidateInput;
//# sourceMappingURL=validate-input.js.map