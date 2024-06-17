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
exports.SocketNotificationEmailApi = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const logger_1 = require("./logger");
class SocketNotificationEmailApi {
    constructor() {
        const server = http_1.default.createServer();
        this.io = new socket_io_1.Server(server);
        this.listen();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.io.on('connection', (socket) => {
                    logger_1.logger.info(`Socket ${socket.id} connected`);
                    this.disconnect(socket);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    disconnect(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                socket.on('disconnect', () => {
                    logger_1.logger.info(`Socket ${socket.id} disconnected`);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendNotification(template, receiver, locals, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const target = namespace
                    ? this.io.of(namespace).to(receiver)
                    : this.io.to(receiver);
                target.emit(template, locals);
            }
            catch (error) {
                console.error(`Failed to send notification to ${receiver}${namespace ? ` in namespace ${namespace}` : ''}:`, error);
                throw new Error(`Failed to send notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });
    }
}
exports.SocketNotificationEmailApi = SocketNotificationEmailApi;
//# sourceMappingURL=socket-notification-api.js.map