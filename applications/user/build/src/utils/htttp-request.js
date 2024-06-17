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
exports.decodedToken = exports.getUserInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
function getUserInfo(authId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = config.authService;
        try {
            const getUrl = `${url}/v1/auth/users/${authId}`;
            const response = yield axios_1.default.get(getUrl);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    });
}
exports.getUserInfo = getUserInfo;
const decodedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield jsonwebtoken_1.default.decode(token);
        return data.payload;
    }
    catch (error) {
        throw error;
    }
});
exports.decodedToken = decodedToken;
//# sourceMappingURL=htttp-request.js.map