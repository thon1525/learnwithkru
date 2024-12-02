"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const accountVerificationSchema = new mongoose_1.default.Schema({
    authId: { type: mongodb_1.ObjectId, required: true },
    emailVerificationToken: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    expired_at: {
        type: Date,
        required: true,
    }
});
const AccountVerificationModel = mongoose_1.default.model("verification-request", accountVerificationSchema);
exports.default = AccountVerificationModel;
//# sourceMappingURL=account-verification.model.js.map