import axios from "axios";
import getConfig from "./config";
import { handleAxiosError } from "./axiosErrorHandler";
import { logger } from "./logger";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

export class MakeRequest {
  private static instance: MakeRequest;

  private constructor() {}

  static GetInstance(): MakeRequest {
    if (!MakeRequest.instance) {
      MakeRequest.instance = new MakeRequest();
    }
    return MakeRequest.instance;
  }

  private async fetchData(url: string, logContext: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, {
        logError: (message) => {
          logger.error(`Error message from ${logContext} Service: ${message}`);
        },
        handleErrorResponse: (response) => {
          const { errors } = response.data;
          if (errors) {
            logger.error(
              `Error occurred in ${logContext}Profile: ${errors.message}`
            );
            throw errors;
          }
        },
      });
    }
  }

  async getUserInfo(authId: string) {
    const url = `${config.authService}/v1/auth/users/${authId}`;
    return this.fetchData(url, "auth");
  }

  async getTeacherProfile(id: string) {
    const url = `${config.teacherService}/v1/teachers/${id}`;
    return this.fetchData(url, "teacher");
  }

  async getStudentProfile(id: string) {
    const url = `${config.studentService}/v1/students/${id}`;
    return this.fetchData(url, "student");
  }
}
