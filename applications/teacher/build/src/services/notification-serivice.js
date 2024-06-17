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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const teacher_producer_1 = require("../queue/teacher.producer");
const server_1 = require("../server");
class NotificationService {
    constructor() { }
    static getInstance() {
        if (!this.notificationServiceInstance) {
            this.notificationServiceInstance = new NotificationService();
        }
        return this.notificationServiceInstance;
    }
    sendSuccesfullyNotification(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, message, }) {
            try {
                const messageDetails = {
                    userId,
                    message,
                    template: "succfully-auth",
                };
                (0, teacher_producer_1.publishDirectMessage)(server_1.teacherChannel, "learnwithkru-notification-message", "notification-message", JSON.stringify(messageDetails), `Successfully notification has been sent to the notification service`);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification-serivice.js.map