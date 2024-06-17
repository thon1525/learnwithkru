"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationToken = void 0;
const randomstring_1 = require("randomstring");
function generateEmailVerificationToken() {
    return (0, randomstring_1.generate)({
        length: 32,
        charset: "hex",
    });
}
exports.generateEmailVerificationToken = generateEmailVerificationToken;
//# sourceMappingURL=account-verification.js.map