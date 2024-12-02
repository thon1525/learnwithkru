"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authSchemas = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        min: 3,
        max: 25,
        require: true
    },
    lastname: {
        type: String,
        min: 3,
        max: 25,
        require: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        max: 35,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String
    },
    picture: {
        type: String
    }
});
exports.authModel = mongoose_1.default.model("auths", authSchemas);
//# sourceMappingURL=auth.model.js.map