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
exports.AuthRepository = void 0;
const auth_model_1 = require("../models/auth.model");
const base_custom_error_1 = require("../../error/base-custom-error");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const logger_1 = require("../../utils/logger");
class AuthRepository {
    CreateAuthUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, password }) {
            try {
                const existingUser = yield this.FindUserByEmail({ email: email });
                if (existingUser) {
                    throw new base_custom_error_1.BaseCustomError("Email already exists", http_status_code_1.default.FORBIDDEN);
                }
                const user = yield auth_model_1.authModel.create({
                    firstname,
                    lastname,
                    email,
                    password,
                });
                if (!user) {
                    throw new base_custom_error_1.ApiError("Unable to create use in database!");
                }
                return yield user.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    CreateOauthUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, password, googleId, facebookId, verified_email, picture, }) {
            try {
                const user = new auth_model_1.authModel({
                    firstname,
                    lastname,
                    email,
                    password,
                    googleId,
                    facebookId,
                    is_verified: verified_email,
                    picture,
                });
                const userResult = yield user.save();
                if (!user) {
                    throw new base_custom_error_1.ApiError("Unable to create user into Database!");
                }
                return userResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async CreateOauthUser({
    // })
    FindUserByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            try {
                const existingUser = yield auth_model_1.authModel.findOne({ email: email });
                return existingUser;
            }
            catch (error) {
                logger_1.logger.error("Unexpected an accurs error: ", error);
                throw new base_custom_error_1.ApiError("Somthing went wrong!");
            }
        });
    }
    FindAuthById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const existingUser = yield auth_model_1.authModel.findById({ _id: id });
                return existingUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    FindUserByFacebookId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ facebookId }) {
            try {
                const existingUser = yield auth_model_1.authModel.findOne({
                    facebookId: facebookId,
                });
                return existingUser;
            }
            catch (error) {
                throw new base_custom_error_1.ApiError(error);
            }
        });
    }
    FindUserByIdAndUpdate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, updates }) {
            try {
                const existUser = yield this.FindAuthById({ id });
                if (!existUser) {
                    throw new base_custom_error_1.ApiError("User does't exist!");
                }
                const updated = yield auth_model_1.authModel.findByIdAndUpdate(id, updates, {
                    new: true
                });
                return updated;
            }
            catch (error) {
            }
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.respository.js.map