"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageDetails = void 0;
const config_1 = __importDefault(require("./config"));
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
function createMessageDetails(email, token, type) {
    const verifyLink = `${config.apiGateway}/v1/auth/verify?token=${token}`;
    const resetPasswordLink = `${config.apiGateway}/v1/auth/reset-password?token=${token}`;
    return {
        receiverEmail: email,
        link: type === "verifyEmail" ? verifyLink : resetPasswordLink,
        template: type,
    };
}
exports.createMessageDetails = createMessageDetails;
//# sourceMappingURL=createMessageDetails.js.map