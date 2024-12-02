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
exports.UserServices = void 0;
const user_repository_1 = require("../database/repositories/user.repository");
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const logger_1 = require("../utils/logger");
class UserServices {
    constructor() {
        this.UserRepo = new user_repository_1.UserRepository();
    }
    CreateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authId, firstname, lastname, email, picture, }) {
            // TODO
            // 1. encrypt token
            // 2. make requst to get auth user in auth service database
            // 3. create new user in database
            try {
                const existingUser = yield this.UserRepo.FindAuthUser(authId);
                if (existingUser) {
                    throw new base_custom_error_1.BaseCustomError("User is exist in database!", http_status_code_1.default.BAD_REQUEST);
                }
                // step 3
                const newUser = yield this.UserRepo.CreateUser({
                    authId: authId,
                    firstname,
                    lastname,
                    email,
                    picture,
                });
                return newUser;
            }
            catch (error) {
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                logger_1.logger.error("An unexpected error occurred while retrieving the user in CreateUser() method!", error);
                throw new base_custom_error_1.ApiError("An unexpected error occurred while creating the user.");
            }
        });
    }
    GetUserByAuthId(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserRepo.FindAuthUser(authId);
                if (!user) {
                    throw new base_custom_error_1.ApiError("Unable to find user in database!");
                }
                return user;
            }
            catch (error) {
                if (error instanceof base_custom_error_1.ApiError) {
                    throw error;
                }
                logger_1.logger.error("An unexpected error occurred while retrieving the user in GetUserByAuthId() method!", error);
                throw new base_custom_error_1.ApiError("An unexpected error occurred while retreive the user.");
            }
        });
    }
    GetUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.UserRepo.FindUser(userId));
                if (!user) {
                    throw new base_custom_error_1.ApiError("Unable to find user in database!");
                }
                return user;
            }
            catch (error) {
                if (error instanceof base_custom_error_1.ApiError) {
                    throw error;
                }
                logger_1.logger.error("An unexpected error occurred while retrieving the user in GetUserByUserId() method!", error);
                throw new base_custom_error_1.ApiError("An unexpected error occurred while retrieving the user.");
            }
        });
    }
    GetUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.UserRepo.FindUser(userId);
                if (!existingUser) {
                    throw new base_custom_error_1.ApiError("No User found!", http_status_code_1.default.NOT_FOUND);
                }
                const { firstname, lastname, email, picture } = existingUser;
                const userData = {
                    firstname,
                    lastname,
                    email,
                    picture,
                };
                return { data: userData };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateUserByUserId(authId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UpdateUser = yield this.UserRepo.UpdateUser(authId, userData);
                return { data: UpdateUser };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=user-services.js.map