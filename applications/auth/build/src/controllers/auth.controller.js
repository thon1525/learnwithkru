"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthController = void 0;
const user_validate_middleware_1 = require("../middlewares/user-validate-middleware");
const path_defs_1 = require("../routes/path-defs");
const auth_validate_1 = require("../schemas/auth-validate");
const auth_services_1 = require("../services/auth-services");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const tsoa_1 = require("tsoa");
const verify_email_services_1 = require("../services/verify-email-services");
const oauth_configs_1 = require("../utils/oauth-configs");
const config_1 = __importDefault(require("../utils/config"));
const base_custom_error_1 = require("../error/base-custom-error");
const jwt_1 = require("../utils/jwt");
const logger_1 = require("../utils/logger");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
let AuthController = class AuthController extends tsoa_1.Controller {
    Singup(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstname, lastname, email, password } = requestBody;
            try {
                const authService = new auth_services_1.AuthServices();
                yield authService.Signup({ firstname, lastname, email, password });
                return { message: "please verify your Email!" };
            }
            catch (error) {
                throw error;
            }
        });
    }
    VerifySignupEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyService = new verify_email_services_1.SendVerifyEmailService();
                const user = yield verifyService.VerifyEmailToken(token);
                const { firstname, lastname, email, picture } = user.data;
                return {
                    message: "Success verified",
                    data: { firstname, lastname, email, picture },
                    token: user.token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    VerifyResetPasswordEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyService = new verify_email_services_1.SendVerifyEmailService();
                const user = yield verifyService.VerifyResetPasswordToken(token);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    Login(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authService = new auth_services_1.AuthServices();
                const user = yield authService.Login(requestBody);
                const { firstname, lastname, email, picture } = user.data;
                return {
                    message: "Success login",
                    data: { firstname, lastname, email, picture },
                    token: user.token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    googleOAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const redirectUri = config.googleRedirectUrl;
            const clientId = config.googleClientId;
            try {
                const googleConfig = yield oauth_configs_1.OauthConfig.getInstance();
                const authUrl = yield googleConfig.GoogleConfigUrl(clientId, redirectUri);
                return { redirectUrl: authUrl };
            }
            catch (error) {
                throw error;
            }
        });
    }
    facebookOAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const redirectUri = config.facebookRedirectUrl;
            const appId = config.faceAppId;
            try {
                const googleConfig = yield oauth_configs_1.OauthConfig.getInstance();
                const authUrl = yield googleConfig.FacebookConfigUrl(appId, redirectUri);
                return { redirectUrl: authUrl };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GoogleOAuth(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.info(`Google code: ${code}`);
                const authService = new auth_services_1.AuthServices();
                const user = yield authService.SigninWithGoogleCallBack(code);
                const { firstname, lastname, email, picture } = user.data;
                return {
                    message: "Success signup",
                    data: { firstname, lastname, email, picture },
                    token: user.token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    FacebookOAuthCallBack(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authService = new auth_services_1.AuthServices();
                const user = yield authService.SigninWithFacebookCallBack(code);
                console.log("user: ", user);
                const { firstname, lastname, email, picture } = user.data;
                return {
                    message: "Success signup",
                    data: { firstname, lastname, email, picture },
                    token: user.token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    RequestResetPassword(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = requestBody;
            try {
                const service = new auth_services_1.AuthServices();
                yield service.RequestResetPassword({ email });
                return { message: "Success verified" };
            }
            catch (error) {
                throw error;
            }
        });
    }
    ConfirmResetPassword(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new auth_services_1.AuthServices();
                yield service.ConfirmResetPassword(requestBody);
                return { message: "Success reset password" };
            }
            catch (error) {
                throw error;
            }
        });
    }
    Logout(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
                const decodedUser = yield (0, jwt_1.decodedToken)(token);
                const service = new auth_services_1.AuthServices();
                const isLogout = yield service.Logout(decodedUser);
                if (!isLogout) {
                    throw new base_custom_error_1.ApiError("Unable to logout!");
                }
                return { message: "Success logout", isLogout: isLogout };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)(path_defs_1.PATH_AUTH.signUp),
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.CREATED, "Created"),
    (0, tsoa_1.Middlewares)((0, user_validate_middleware_1.zodValidate)(auth_validate_1.userValidateSchema)),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Singup", null);
__decorate([
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.verify),
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "VerifySignupEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.verifyResetPassword),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "VerifyResetPasswordEmail", null);
__decorate([
    (0, tsoa_1.Post)(path_defs_1.PATH_AUTH.login),
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Middlewares)((0, user_validate_middleware_1.zodValidate)(auth_validate_1.authLoginSchema)),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Login", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.FOUND, "FOUND"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.googleOAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleOAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.FOUND, "FOUND"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.facebookOAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookOAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.googleOAuthCallBack),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "GoogleOAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.facebookOAuthCallBack),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "FacebookOAuthCallBack", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Post)(path_defs_1.PATH_AUTH.requestResetPassword),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "RequestResetPassword", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Post)(path_defs_1.PATH_AUTH.ResetPassword),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ConfirmResetPassword", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_AUTH.logout),
    __param(0, (0, tsoa_1.Header)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Logout", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/v1/auth")
], AuthController);
//# sourceMappingURL=auth.controller.js.map