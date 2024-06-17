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
exports.SendVerifyEmailService = void 0;
const account_verification_model_1 = __importDefault(require("../database/models/account-verification.model"));
const base_custom_error_1 = require("../error/base-custom-error");
const auth_producer_1 = require("../queue/auth.producer");
const server_1 = require("../server");
const account_verification_1 = require("../utils/account-verification");
const date_generate_1 = require("../utils/date-generate");
const http_request_1 = require("../utils/http-request");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
const account_verification_repository_1 = require("../database/repositories/account-verification.repository");
const auth_respository_1 = require("../database/repositories/auth.respository");
const config_1 = __importDefault(require("../utils/config"));
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
console.log("Notif config ", config);
class SendVerifyEmailService {
    constructor() {
        this.accountVerificationRepo = new account_verification_repository_1.AccountVerificationRepository();
        this.authRepo = new auth_respository_1.AuthRepository();
    }
    SendVerifyEmailToken(_a, type_1) {
        return __awaiter(this, arguments, void 0, function* ({ authId, email, }, type) {
            try {
                // Step 1: Generate token
                const emailVerificationToken = (0, account_verification_1.generateEmailVerificationToken)();
                // Step 2: Generate current date and expiry date
                const now = new Date();
                const inTenMinutes = (0, date_generate_1.GenerateTimeExpire)(now);
                // Step 3: Save verification data to the database
                const accountVerification = new account_verification_model_1.default({
                    authId: authId,
                    emailVerificationToken: emailVerificationToken,
                    expired_at: inTenMinutes,
                });
                const newAccountVerification = yield accountVerification.save();
                // Step 4: Prepare email message details based on type
                let messageDetails;
                if (type === "verifyEmail") {
                    messageDetails = {
                        receiverEmail: email,
                        verifyLink: `${config.clientUrl}/verify-email?token=${newAccountVerification.emailVerificationToken}`,
                        template: "verifyEmail",
                    };
                }
                else if (type === "verifyResetPassword") {
                    messageDetails = {
                        receiverEmail: email,
                        verifyLink: `${config.clientUrl}/verify-reset-password?token=${newAccountVerification.emailVerificationToken}`,
                        template: "verifyResetPassword",
                    };
                }
                // Step 5: Send email by publishing a message to the notification service
                yield (0, auth_producer_1.publishDirectMessage)(server_1.authChannel, "learnwithkru-verify-email", "auth-email", JSON.stringify(messageDetails), `Verify ${type} message has been sent to the notification service`);
            }
            catch (error) {
                logger_1.logger.error("Unexpected error occurs in SendVerifyEmailToken() method: ", error);
                throw new base_custom_error_1.ApiError("Unable to send email to user!");
            }
        });
    }
    VerifyEmailToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Step 1: Verify existing token
                logger_1.logger.info("Token has recieved =", token);
                const verificationToken = yield this.accountVerificationRepo.FindVerificationToken({ token });
                if (!verificationToken) {
                    throw new base_custom_error_1.BaseCustomError("Verification token is invalid", http_status_code_1.default.BAD_REQUEST);
                }
                // Step 2: Check expire date
                const now = new Date();
                if (now > verificationToken.expired_at) {
                    yield this.accountVerificationRepo.DeleteVerificationByToken({ token });
                    throw new base_custom_error_1.BaseCustomError("Verification token has expired", http_status_code_1.default.UNAUTHORIZED);
                }
                // Step 3: Find auth data in database
                const user = yield this.authRepo.FindAuthById({
                    id: verificationToken.authId,
                });
                if (!user) {
                    throw new base_custom_error_1.BaseCustomError("User does not exist", http_status_code_1.default.NOT_FOUND);
                }
                // Step 4: Check if user is already verified
                if (user.is_verified) {
                    throw new base_custom_error_1.BaseCustomError("User is already verified", http_status_code_1.default.BAD_REQUEST);
                }
                // Mark user as verified
                user.is_verified = true;
                const newUser = yield user.save();
                const { _id, firstname, lastname, email } = newUser;
                // Step 5: Create user in database user service
                const userData = {
                    authId: _id.toString(),
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    picture: null,
                };
                const requestUserService = new http_request_1.RequestUserService();
                const { data } = yield requestUserService.CreateUser(userData);
                if (!data) {
                    throw new base_custom_error_1.BaseCustomError("Unable to create new user in user service", http_status_code_1.default.INTERNAL_SERVER_ERROR);
                }
                // Step 6: Generate JWT token
                const jwtToken = yield (0, jwt_1.generateSignature)({ _id: data._id.toString() });
                // step 7: Send success message
                const messageDetails = {
                    receiver: data._id.toString(),
                    template: "verifyResetPassword",
                    timestamp: new Date().toLocaleString(),
                    title: "Congratulations on Joining Learnwithkru",
                    message: "Thank you for joining us. We are excited to help you on your educational journey.",
                };
                yield (0, auth_producer_1.publishDirectMessage)(server_1.authChannel, "learnwithkru-notification-message", "notification-message", JSON.stringify(messageDetails), `Success verify verify Email token message has been sent to the notification service`);
                // Step 8: Delete account verification token from database
                yield this.accountVerificationRepo.DeleteVerificationByToken({ token });
                return { data, token: jwtToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    VerifyResetPasswordToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Step 1: Verify existing token
                const verificationToken = yield this.accountVerificationRepo.FindVerificationToken({ token });
                if (!verificationToken) {
                    throw new base_custom_error_1.BaseCustomError("Verification token is invalid", http_status_code_1.default.BAD_REQUEST);
                }
                // Step 2: Check expire date
                const now = new Date();
                if (now > verificationToken.expired_at) {
                    yield this.accountVerificationRepo.DeleteVerificationByToken({ token });
                    throw new base_custom_error_1.BaseCustomError("Verification token has expired", http_status_code_1.default.UNAUTHORIZED);
                }
                // Step 3: Find auth data in database
                const user = yield this.authRepo.FindAuthById({
                    id: verificationToken.authId,
                });
                if (!user) {
                    throw new base_custom_error_1.BaseCustomError("User does not exist", http_status_code_1.default.NOT_FOUND);
                }
                // Step 4: Check if user is already verified
                if (user.is_verified) {
                    throw new base_custom_error_1.BaseCustomError("User is already verified", http_status_code_1.default.BAD_REQUEST);
                }
                return { message: "Verify reset password successfully" };
            }
            catch (error) {
                logger_1.logger.error("This error accurs in VerifyResetPasswordToken method! ", error);
                throw error;
            }
        });
    }
}
exports.SendVerifyEmailService = SendVerifyEmailService;
//# sourceMappingURL=verify-email-services.js.map