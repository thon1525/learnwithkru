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
exports.getUserById = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("./logger");
const config_1 = __importDefault(require("./config"));
const path_defs_1 = require("../routes/path-defs");
const base_custom_error_1 = require("../error/base-custom-error");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${config.userService}${path_defs_1.PATH_USER.GET}/${userId}`;
    console.log(url);
    try {
        const response = yield axios_1.default.get(url);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from user service: ${response.statusText}`);
        }
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            logger_1.logger.error("Axios Error in createUser() method:", error.message);
            if (error.response) {
                logger_1.logger.error("Response data:", error.response.data);
                logger_1.logger.error("Response status:", error.response.status);
                logger_1.logger.error("Response headers:", error.response.headers);
            }
            throw new base_custom_error_1.ApiError("Error communicating with user service.");
        }
        else {
            logger_1.logger.error("Unknown Error in createUser() method:", error);
            throw error;
        }
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=htttp-request.js.map