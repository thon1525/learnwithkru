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
exports.decodedToken = exports.validatePassword = exports.generateSignature = exports.generatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_code_1 = __importDefault(require("./http-status-code"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_custom_error_1 = require("../error/base-custom-error");
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("./logger");
const salt = 10;
const privateKeyPath = path_1.default.join(__dirname, "../../private_key.pem");
// Read the private key from the file
const privateKey = fs_1.default.readFileSync(privateKeyPath, "utf8");
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
const generatePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        throw new base_custom_error_1.ApiError("Unable to generate password");
    }
});
exports.generatePassword = generatePassword;
const generateSignature = (_a) => __awaiter(void 0, [_a], void 0, function* ({ _id, }) {
    const payloadData = {
        id: _id,
        role: "user",
    };
    try {
        return yield jsonwebtoken_1.default.sign({ payload: payloadData }, privateKey, {
            expiresIn: config.jwtExpiresIn,
            algorithm: "RS256",
        });
    }
    catch (error) {
        throw new base_custom_error_1.BaseCustomError(error instanceof Error ? error.message : "Unknown error occurred", http_status_code_1.default.NOT_ACCEPTABLE);
    }
});
exports.generateSignature = generateSignature;
const validatePassword = (_b) => __awaiter(void 0, [_b], void 0, function* ({ enteredPassword, savedPassword, }) {
    try {
        const isPasswordCorrect = yield bcrypt_1.default.compare(enteredPassword, savedPassword);
        return isPasswordCorrect;
    }
    catch (error) {
        throw error;
    }
});
exports.validatePassword = validatePassword;
const decodedToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || typeof decoded !== "object" || !("payload" in decoded)) {
            throw new Error("Invalid token structure");
        }
        return decoded.payload;
    }
    catch (error) {
        logger_1.logger.error("Unable to decode in decodeToken() method!", { token, error });
        throw new base_custom_error_1.ApiError("Can't decode token!");
    }
};
exports.decodedToken = decodedToken;
//# sourceMappingURL=jwt.js.map