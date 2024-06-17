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
exports.UserRepository = void 0;
const base_custom_error_1 = require("../../error/base-custom-error");
const user_model_1 = require("../models/user.model");
class UserRepository {
    CreateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, authId, picture }) {
            try {
                const newUser = yield user_model_1.UserModel.create({
                    authId,
                    firstname,
                    lastname,
                    email,
                    picture,
                });
                console.log("This is repo data", newUser);
                if (!newUser) {
                    throw new base_custom_error_1.ApiError("Unable to create User in db!");
                }
                return yield newUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    //by User Id
    FindUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.UserModel.findOne({
                    _id: userId,
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // bu authId
    FindAuthUser(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield user_model_1.UserModel.findOne({
                    authId: authId,
                });
                return User;
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateUser(authId, userUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ authId }, { $set: userUpdate }, { new: true, runValidators: true });
                if (!updatedUser) {
                    throw new base_custom_error_1.ApiError('Unable to update user in database!');
                }
                return updatedUser;
            }
            catch (error) {
                throw new base_custom_error_1.ApiError(`Failed to update user: ${error}`);
            }
        });
    }
    DeleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield user_model_1.UserModel.findByIdAndDelete({ _id: userId });
                if (!(deletedUser === null || deletedUser === void 0 ? void 0 : deletedUser.$isDeleted)) {
                    throw new base_custom_error_1.ApiError("Unable to delete user in database!");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map