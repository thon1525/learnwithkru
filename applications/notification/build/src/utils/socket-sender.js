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
exports.SocketSender = void 0;
const api_error_1 = __importDefault(require("../errors/api-error"));
class SocketSender {
    constructor() {
        this.isActive = false;
    }
    static getInstance() {
        if (!this.SocketSenderInstance) {
            this.SocketSenderInstance = new SocketSender();
        }
        return this.SocketSenderInstance;
    }
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
    sendSocketApi(socketApi) {
        this.socketApi = socketApi;
    }
    sendNotification(template, receiver, locals) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateSocketSender();
                this.socketApi.sendNotification(template, receiver, locals);
            }
            catch (error) {
                throw error;
            }
        });
    }
    validateSocketSender() {
        if (!this.isActive) {
            throw new api_error_1.default('SocketApi is not Acitve!');
        }
        if (!this.socketApi) {
            throw new api_error_1.default("SocketApi is not set!");
        }
    }
}
exports.SocketSender = SocketSender;
//# sourceMappingURL=socket-sender.js.map