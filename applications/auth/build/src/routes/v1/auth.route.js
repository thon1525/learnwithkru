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
const express_1 = require("express");
const path_defs_1 = require("../path-defs");
const auth_controller_1 = require("../../controllers/auth.controller");
const http_status_code_1 = __importDefault(require("../../utils/http-status-code"));
const user_validate_middleware_1 = require("../../middlewares/user-validate-middleware");
const auth_validate_1 = require("../../schemas/auth-validate");
const oauth_configs_1 = require("../../utils/oauth-configs");
// Route
const AuthRoute = (0, express_1.Router)();
AuthRoute.post(path_defs_1.PATH_AUTH.signUp, (0, user_validate_middleware_1.zodValidate)(auth_validate_1.userValidateSchema), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        const controller = new auth_controller_1.AuthController();
        yield controller.Singup(requestBody);
        res.status(http_status_code_1.default.OK).json({
            message: 'please verify your Email!',
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.post(path_defs_1.PATH_AUTH.login, (0, user_validate_middleware_1.zodValidate)(auth_validate_1.authLoginSchema), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        const controller = new auth_controller_1.AuthController();
        const user = yield controller.Login(requestBody);
        res.status(http_status_code_1.default.OK).json({
            message: 'Login Success',
            data: user.data,
            token: user.token
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.post(path_defs_1.PATH_AUTH.logout, (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(http_status_code_1.default.OK).json({
            message: 'success',
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.post(path_defs_1.PATH_AUTH.requestResetPassword, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    try {
        const controller = new auth_controller_1.AuthController();
        const newUser = yield controller.RequestResetPassword(requestBody);
        res.status(http_status_code_1.default.OK).json({
            message: 'please verify your email',
            token: newUser
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.post(path_defs_1.PATH_AUTH.ResetPassword, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const requestBody = req.body;
    try {
        const controller = new auth_controller_1.AuthController();
        yield controller.ConfirmResetPassword(requestBody, token);
        res.status(http_status_code_1.default.OK).json({
            message: "ResetPassword Successfully",
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(path_defs_1.PATH_AUTH.verify, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    try {
        const controller = new auth_controller_1.AuthController();
        const respone = yield controller.VerifySignupEmail(token);
        res.status(http_status_code_1.default.OK).json({
            message: 'Sign up success',
            data: respone.data,
            token: respone.token
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(path_defs_1.PATH_AUTH.verifyResetPassword, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    try {
        const controller = new auth_controller_1.AuthController();
        const respone = yield controller.VerifyResetPasswordEmail(token);
        res.status(http_status_code_1.default.OK).json({
            message: respone.message
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(path_defs_1.PATH_AUTH.googleOAuth, (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const clienId = process.env.GOOGLE_CLIENT_ID;
    try {
        const googleConfig = yield oauth_configs_1.OauthConfig.getInstance();
        const authUrl = yield googleConfig.GoogleConfigUrl(clienId, redirectUri);
        res.redirect(authUrl);
    }
    catch (error) {
        _next(error);
    }
}));
//Signin callback with google
AuthRoute.get(path_defs_1.PATH_AUTH.googleOAuthCallBack, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const queryCode = code;
        const controller = new auth_controller_1.AuthController();
        const respone = yield controller.GoogleOAuth(queryCode);
        res.status(http_status_code_1.default.OK).json({
            message: 'Create user success',
            data: respone.data,
            token: respone.token
        });
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(path_defs_1.PATH_AUTH.facebookOAuth, (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redirectUri = process.env.FACEBOOK_REDIRECT_URI;
        const clienId = process.env.FACEBOOK_APP_ID;
        const facebookConfig = yield oauth_configs_1.OauthConfig.getInstance();
        const authUrl = yield facebookConfig.FacebookConfigUrl(clienId, redirectUri);
        res.redirect(authUrl);
    }
    catch (error) {
        _next(error);
    }
}));
AuthRoute.get(path_defs_1.PATH_AUTH.facebookOAuthCallBack, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        const queryCode = code;
        const controller = new auth_controller_1.AuthController();
        const respone = yield controller.facebookOAuth(queryCode);
        res.status(http_status_code_1.default.OK).json({
            message: 'success',
            data: respone.data,
            token: respone.token,
        });
    }
    catch (error) {
        _next(error);
    }
}));
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map