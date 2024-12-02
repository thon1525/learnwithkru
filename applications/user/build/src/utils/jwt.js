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
exports.decodedToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_custom_error_1 = require("../error/base-custom-error");
const logger_1 = require("./logger");
const decodedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (yield jsonwebtoken_1.default.decode(token));
        return data.payload;
    }
    catch (error) {
        logger_1.logger.error("Unable to decode in decodeToken() method !", error);
        throw new base_custom_error_1.ApiError("Can't Decode token!");
    }
});
exports.decodedToken = decodedToken;
//# sourceMappingURL=jwt.js.map