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
exports.generateSignature = exports.decodedToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const base_custom_error_1 = require("../error/base-custom-error");
const http_status_code_1 = __importDefault(require("./http-status-code"));
const privateKeyPath = path_1.default.join(__dirname, "../../private_key.pem");
// Read the private key from the file
const privateKey = fs_1.default.readFileSync(privateKeyPath, "utf8");
const decodedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (yield jsonwebtoken_1.default.decode(token));
        return data.payload;
    }
    catch (error) {
        throw error;
    }
});
exports.decodedToken = decodedToken;
const currentEnv = process.env.NODE_ENV || "development";
const config = (0, config_1.default)(currentEnv);
const generateSignature = (_a) => __awaiter(void 0, [_a], void 0, function* ({ _id, }) {
    const payloadData = {
        id: _id,
        role: ["user", "student"],
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
//# sourceMappingURL=jwt.js.map