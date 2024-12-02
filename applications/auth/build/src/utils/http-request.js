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
exports.RequestUserService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
const base_custom_error_1 = require("../error/base-custom-error");
const logger_1 = require("./logger");
const path_defs_1 = require("../routes/path-defs");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
class RequestUserService {
    CreateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authId, firstname, lastname, email, picture }) {
            const url = `${config.userService}${path_defs_1.PATH_SERVICE.USER.CREATE_USER}`;
            console.log(config.userService);
            logger_1.logger.info(`Attempting to create user at URL: ${url}`);
            try {
                const { data } = yield axios_1.default.post(url, {
                    authId,
                    firstname,
                    lastname,
                    email,
                    picture,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 5000, // Set an appropriate timeout
                });
                if (!data) {
                    throw new base_custom_error_1.ApiError("User service did not return data.");
                }
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    logger_1.logger.error("Axios Error in createUser() method:", error.message);
                    if (error.code === "ECONNABORTED") {
                        logger_1.logger.error("Request timeout:", error.message);
                        throw new base_custom_error_1.ApiError("Request timeout communicating with user service.", 504); // 504 Gateway Timeout
                    }
                    if (error.response) {
                        logger_1.logger.error("Response data:", error.response.data);
                        logger_1.logger.error("Response status:", error.response.status);
                        logger_1.logger.error("Response headers:", error.response.headers);
                        if (error.response.status >= 400 && error.response.status < 500) {
                            throw new base_custom_error_1.ApiError("Client error communicating with user service.", error.response.status);
                        }
                        else if (error.response.status >= 500) {
                            throw new base_custom_error_1.ApiError("Server error communicating with user service.", 500);
                        }
                    }
                    else if (error.request) {
                        logger_1.logger.error("No response received:", error.request);
                        throw new base_custom_error_1.ApiError("No response received from user service.", 500);
                    }
                    else {
                        throw new base_custom_error_1.ApiError(`Axios Error: ${error.message}`, 500);
                    }
                }
                else {
                    logger_1.logger.error("Unknown Error in createUser() method:", error);
                    throw new base_custom_error_1.ApiError("Unknown error occurred.", 500);
                }
            }
        });
    }
    GetUser(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.userService}${path_defs_1.PATH_SERVICE.USER.GET_USER}/${authId}`;
            try {
                const response = yield axios_1.default.get(url);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch data from user service: ${response.statusText}`);
                }
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    logger_1.logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
                    if (error.response) {
                        logger_1.logger.error("Response data:", error.response.data); // Log response data if available
                        logger_1.logger.error("Response status:", error.response.status); // Log response status if available
                        logger_1.logger.error("Response headers:", error.response.headers); // Log response headers if available
                        return error.response.data;
                    }
                    throw new base_custom_error_1.ApiError("Error communicating with user service.");
                }
                else {
                    logger_1.logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
                    throw error;
                }
            }
        });
    }
    UpdateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authId, firstname, lastname, email, picture }) {
            const url = `${config.userService}${path_defs_1.PATH_SERVICE.USER.UPDATE_USER}/${authId}`;
            logger_1.logger.info(`Attempting to create user at URL: ${url}`);
            try {
                const { data } = yield axios_1.default.patch(url, {
                    authId,
                    firstname,
                    lastname,
                    email,
                    picture,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 5000, // Set an appropriate timeout
                });
                if (!data) {
                    throw new base_custom_error_1.ApiError("User service did not return data.");
                }
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    logger_1.logger.error("Axios Error in createUser() method:", error.message);
                    if (error.code === "ECONNABORTED") {
                        logger_1.logger.error("Request timeout:", error.message);
                        throw new base_custom_error_1.ApiError("Request timeout communicating with user service.", 504); // 504 Gateway Timeout
                    }
                    if (error.response) {
                        logger_1.logger.error("Response data:", error.response.data);
                        logger_1.logger.error("Response status:", error.response.status);
                        logger_1.logger.error("Response headers:", error.response.headers);
                        if (error.response.status >= 400 && error.response.status < 500) {
                            throw new base_custom_error_1.ApiError("Client error communicating with user service.", error.response.status);
                        }
                        else if (error.response.status >= 500) {
                            throw new base_custom_error_1.ApiError("Server error communicating with user service.", 500);
                        }
                    }
                    else if (error.request) {
                        logger_1.logger.error("No response received:", error.request);
                        throw new base_custom_error_1.ApiError("No response received from user service.", 500);
                    }
                    else {
                        throw new base_custom_error_1.ApiError(`Axios Error: ${error.message}`, 500);
                    }
                }
                else {
                    logger_1.logger.error("Unknown Error in createUser() method:", error);
                    throw new base_custom_error_1.ApiError("Unknown error occurred.", 500);
                }
            }
        });
    }
    LoginStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.studentService}${path_defs_1.PATH_SERVICE.STUDENT.LOGIN}/${userId}`;
            try {
                const response = yield axios_1.default.get(url);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch data from user service: ${response.statusText}`);
                }
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    logger_1.logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
                    if (error.response) {
                        logger_1.logger.error("Response data:", error.response.data); // Log response data if available
                        logger_1.logger.error("Response status:", error.response.status); // Log response status if available
                        logger_1.logger.error("Response headers:", error.response.headers); // Log response headers if available
                    }
                    throw new base_custom_error_1.ApiError("Error communicating with user service.");
                }
                else {
                    logger_1.logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
                    throw error;
                }
            }
        });
    }
    LoginTeacher(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${config.teacherService}${path_defs_1.PATH_SERVICE.TEACHER.LOGIN}/${userId}`;
            try {
                const response = yield axios_1.default.get(url);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch data from user service: ${response.statusText}`);
                }
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    logger_1.logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
                    if (error.response) {
                        logger_1.logger.error("Response data:", error.response.data); // Log response data if available
                        logger_1.logger.error("Response status:", error.response.status); // Log response status if available
                        logger_1.logger.error("Response headers:", error.response.headers); // Log response headers if available
                    }
                    throw new base_custom_error_1.ApiError("Error communicating with user service.");
                }
                else {
                    logger_1.logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
                    throw error;
                }
            }
        });
    }
}
exports.RequestUserService = RequestUserService;
//# sourceMappingURL=http-request.js.map