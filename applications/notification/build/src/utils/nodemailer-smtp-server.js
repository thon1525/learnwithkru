"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const currentEnv = process.env.NODE_ENV || 'development';
const config = (0, config_1.default)(currentEnv);
class NodemailerSmtpServer {
    constructor() {
        this.host = config.smtpHost;
        this.port = parseInt(config.smtpPort);
        this.user = config.senderEmail;
        this.pass = config.senderEmailPassword;
    }
    getConfig() {
        return {
            host: this.host,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        };
    }
}
exports.default = NodemailerSmtpServer;
//# sourceMappingURL=nodemailer-smtp-server.js.map