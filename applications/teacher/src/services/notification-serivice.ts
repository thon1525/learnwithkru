import { publishDirectMessage } from "../queue/teacher.producer";
import { teacherChannel } from "../server";
import { IMessageDetails } from "./@types/notification-service.type";

export class NotificationService {
  private static notificationServiceInstance: NotificationService;
  constructor() {}

  static getInstance(): NotificationService {
    if (!this.notificationServiceInstance) {
      this.notificationServiceInstance = new NotificationService();
    }
    return this.notificationServiceInstance;
  }

  async sendSuccesfullyNotification({
    userId,
    message,
  }: IMessageDetails): Promise<void> {
    try {
      const messageDetails = {
        userId,
        message,
        template: "succfully-auth",
      };
      publishDirectMessage(
        teacherChannel,
        "learnwithkru-notification-message",
        "notification-message",
        JSON.stringify(messageDetails),
        `Successfully notification has been sent to the notification service`
      );
    } catch (error: unknown) {
      throw error;
    }
  }
}
