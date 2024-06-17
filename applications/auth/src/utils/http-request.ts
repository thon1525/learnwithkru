import axios from "axios";
import getConfig from "./config";
import { ApiError } from "../error/base-custom-error";
import { logger } from "./logger";
import { PATH_SERVICE } from "../routes/path-defs";
import { IUser } from "../@types/user.type";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

export class RequestUserService {
  async CreateUser({ authId, firstname, lastname, email, picture }: IUser) {
    const url = `${config.userService}${PATH_SERVICE.USER.CREATE_USER}`;
    console.log(config.userService);
    logger.info(`Attempting to create user at URL: ${url}`);

    try {
      const { data } = await axios.post(
        url,
        {
          authId,
          firstname,
          lastname,
          email,
          picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // Set an appropriate timeout
        }
      );

      if (!data) {
        throw new ApiError("User service did not return data.");
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error("Axios Error in createUser() method:", error.message);

        if (error.code === "ECONNABORTED") {
          logger.error("Request timeout:", error.message);
          throw new ApiError(
            "Request timeout communicating with user service.",
            504
          ); // 504 Gateway Timeout
        }

        if (error.response) {
          logger.error("Response data:", error.response.data);
          logger.error("Response status:", error.response.status);
          logger.error("Response headers:", error.response.headers);

          if (error.response.status >= 400 && error.response.status < 500) {
            throw new ApiError(
              "Client error communicating with user service.",
              error.response.status
            );
          } else if (error.response.status >= 500) {
            throw new ApiError(
              "Server error communicating with user service.",
              500
            );
          }
        } else if (error.request) {
          logger.error("No response received:", error.request);
          throw new ApiError("No response received from user service.", 500);
        } else {
          throw new ApiError(`Axios Error: ${error.message}`, 500);
        }
      } else {
        logger.error("Unknown Error in createUser() method:", error);
        throw new ApiError("Unknown error occurred.", 500);
      }
    }
  }

  async GetUser(authId: string) {
    const url = `${config.userService}${PATH_SERVICE.USER.GET_USER}/${authId}`;

    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch data from user service: ${response.statusText}`
        );
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
        if (error.response) {
          logger.error("Response data:", error.response.data); // Log response data if available
          logger.error("Response status:", error.response.status); // Log response status if available
          logger.error("Response headers:", error.response.headers); // Log response headers if available

          return error.response.data;
        }
        throw new ApiError("Error communicating with user service.");
      } else {
        logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
        throw error;
      }
    }
  }

  async UpdateUser({ authId, firstname, lastname, email, picture }: IUser) {
    const url = `${config.userService}${PATH_SERVICE.USER.UPDATE_USER}/${authId}`;
    logger.info(`Attempting to create user at URL: ${url}`);

    try {
      const { data } = await axios.patch(
        url,
        {
          authId,
          firstname,
          lastname,
          email,
          picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // Set an appropriate timeout
        }
      );

      if (!data) {
        throw new ApiError("User service did not return data.");
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error("Axios Error in createUser() method:", error.message);

        if (error.code === "ECONNABORTED") {
          logger.error("Request timeout:", error.message);
          throw new ApiError(
            "Request timeout communicating with user service.",
            504
          ); // 504 Gateway Timeout
        }

        if (error.response) {
          logger.error("Response data:", error.response.data);
          logger.error("Response status:", error.response.status);
          logger.error("Response headers:", error.response.headers);

          if (error.response.status >= 400 && error.response.status < 500) {
            throw new ApiError(
              "Client error communicating with user service.",
              error.response.status
            );
          } else if (error.response.status >= 500) {
            throw new ApiError(
              "Server error communicating with user service.",
              500
            );
          }
        } else if (error.request) {
          logger.error("No response received:", error.request);
          throw new ApiError("No response received from user service.", 500);
        } else {
          throw new ApiError(`Axios Error: ${error.message}`, 500);
        }
      } else {
        logger.error("Unknown Error in createUser() method:", error);
        throw new ApiError("Unknown error occurred.", 500);
      }
    }
  }

  async LoginStudent(userId: string) {
    const url = `${config.studentService!}${
      PATH_SERVICE.STUDENT.LOGIN
    }/${userId}`;

    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch data from user service: ${response.statusText}`
        );
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
        if (error.response) {
          logger.error("Response data:", error.response.data); // Log response data if available
          logger.error("Response status:", error.response.status); // Log response status if available
          logger.error("Response headers:", error.response.headers); // Log response headers if available
        }
        throw new ApiError("Error communicating with user service.");
      } else {
        logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
        throw error;
      }
    }
  }
  async LoginTeacher(userId: string) {
    const url = `${config.teacherService}${PATH_SERVICE.TEACHER.LOGIN}/${userId}`;

    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch data from user service: ${response.statusText}`
        );
      }
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        logger.error("Axios Error in GetUser() method:", error.message); // Log Axios error message
        if (error.response) {
          logger.error("Response data:", error.response.data); // Log response data if available
          logger.error("Response status:", error.response.status); // Log response status if available
          logger.error("Response headers:", error.response.headers); // Log response headers if available
        }
        throw new ApiError("Error communicating with user service.");
      } else {
        logger.error("Unknown Error in GetUser() method:", error); // Log other types of errors
        throw error;
      }
    }
  }
}
