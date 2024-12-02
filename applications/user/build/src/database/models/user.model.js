"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchemas = new mongoose_1.default.Schema({
    authId: {
        type: String,
    },
    firstname: {
        type: String,
        min: 2,
        max: 25,
        require: true,
    },
    lastname: {
        type: String,
        min: 2,
        max: 25,
        require: true,
    },
    email: {
        type: String,
        min: 2,
    },
    picture: {
        type: String,
    },
});
exports.UserModel = mongoose_1.default.model("users", userSchemas);
//# sourceMappingURL=user.model.js.map