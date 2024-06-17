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
exports.startQueue = exports.createQueueConnection = void 0;
const logger_1 = require("../utils/logger");
const amqplib_1 = __importDefault(require("amqplib"));
const email_consumer_1 = require("./email-consumer");
const config_1 = __importDefault(require("../utils/config"));
const currentEnv = process.env.NODE_ENV || 'development';
const config = (0, config_1.default)(currentEnv);
function createQueueConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect(`${config.rabbitMQ}`);
            const channel = yield connection.createChannel();
            logger_1.logger.info('Nofiication server connected to queue successfully...');
            closeQueueConnection();
            return channel;
        }
        catch (error) {
            logger_1.logger.error(`NotificationService createConnection() method error: ${error}`);
            return undefined;
        }
    });
}
exports.createQueueConnection = createQueueConnection;
function closeQueueConnection() {
    process.once('SIGINT', (channel, connection) => __awaiter(this, void 0, void 0, function* () {
        yield channel.close();
        yield connection.close();
    }));
}
function startQueue() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emailChannel = (yield createQueueConnection());
            yield (0, email_consumer_1.consumeAuthEmailMessages)(emailChannel);
            yield (0, email_consumer_1.consumeNotificationMessages)(emailChannel);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.startQueue = startQueue;
//# sourceMappingURL=connection.js.map