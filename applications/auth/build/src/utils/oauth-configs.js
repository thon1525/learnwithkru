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
exports.OauthConfig = void 0;
const axios_1 = __importDefault(require("axios"));
const base_custom_error_1 = require("../error/base-custom-error");
const querystring_1 = __importDefault(require("querystring"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logger");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
console.log(config);
class OauthConfig {
    constructor() {
        // Any initialization logic you want to perform
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!OauthConfig.instance) {
                OauthConfig.instance = new OauthConfig();
            }
            return OauthConfig.instance;
        });
    }
    getToken(requestBody, url) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                logger_1.logger.info(`RequestBody: ${requestBody} and url : ${url}`);
                const { data } = yield axios_1.default.post(url, requestBody);
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    const axiosError = error;
                    const status = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status;
                    const statusText = (_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.statusText;
                    const headers = (_c = axiosError.response) === null || _c === void 0 ? void 0 : _c.headers;
                    const responseData = (_d = axiosError.response) === null || _d === void 0 ? void 0 : _d.data;
                    console.error("Axios error response:", {
                        status,
                        statusText,
                        headers,
                        responseData,
                    });
                    const errorMessage = ((_f = (_e = axiosError.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.error_description) || axiosError.message;
                    throw new base_custom_error_1.ApiError(`Unable to configure user API: ${errorMessage}`);
                }
                else {
                    console.error("Unknown error:", error);
                    throw new base_custom_error_1.ApiError(`Unknown error occurred: ${error}`);
                }
            }
        });
    }
    GoogleStrategy(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = {
                code,
                client_id: config.googleClientId,
                client_secret: config.googleClientSecret,
                redirect_uri: config.googleRedirectUrl,
                grant_type: "authorization_code",
            };
            const url = "https://oauth2.googleapis.com/token";
            try {
                return yield this.getToken(requestBody, url);
            }
            catch (error) {
                throw error;
            }
        });
    }
    FacebookStrategy(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = {
                client_id: config.faceAppId,
                client_secret: config.facebookAppSecret,
                redirect_uri: config.facebookRedirectUrl,
                code,
            };
            const url = `https://graph.facebook.com/v13.0/oauth/access_token`;
            try {
                return yield this.getToken(requestBody, url);
            }
            catch (error) {
                throw error;
            }
        });
    }
    AccessInfo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ access_token, url }) {
            try {
                const userInfoResponse = yield axios_1.default.get(url, {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                return userInfoResponse;
            }
            catch (error) {
                throw new base_custom_error_1.ApiError(error);
            }
        });
    }
    GoogleAccessInfo(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://www.googleapis.com/oauth2/v2/userinfo";
            try {
                return yield this.AccessInfo({ access_token, url });
            }
            catch (error) {
                throw error;
            }
        });
    }
    FacebookAccessInfo(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = "id,name,email,first_name,last_name,picture";
            const url = `https://graph.facebook.com/v13.0/me?fields=${fields}`;
            try {
                return yield this.AccessInfo({ access_token, url });
            }
            catch (error) {
                throw error;
            }
        });
    }
    GoogleConfigUrl(clienId, redirectUri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clienId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`;
                return authUrl;
            }
            catch (error) {
                throw new base_custom_error_1.ApiError("Unable to AuthConfigUrl in Google API");
            }
        });
    }
    FacebookConfigUrl(clienId, redirectUri) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = {
                    client_id: clienId,
                    redirect_uri: redirectUri,
                    response_type: "code",
                };
                // Convert the object to a URL-encoded query string
                const queryString = querystring_1.default.stringify(queryParams);
                // Construct the full URL with the query string
                const url = `https://www.facebook.com/v19.0/dialog/oauth?${queryString}`;
                return url;
            }
            catch (error) {
                throw new base_custom_error_1.ApiError("Unable to AuthConfigUrl in facebook api");
            }
        });
    }
}
exports.OauthConfig = OauthConfig;
//# sourceMappingURL=oauth-configs.js.map