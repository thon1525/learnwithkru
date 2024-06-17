import bcrypt from "bcrypt";
import StatusCode from "./http-status-code";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError, BaseCustomError } from "../error/base-custom-error";
import getConfig from "./config";
import path from "path";
import fs from "fs";
import { logger } from "./logger";

const salt = 10;

const privateKeyPath = path.join(__dirname, "../../private_key.pem");
// Read the private key from the file
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);

export const generatePassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new ApiError("Unable to generate password");
  }
};

export const generateSignature = async ({
  _id,
}: {
  _id: string;
}): Promise<string> => {
  const payloadData = {
    id: _id,
    role: "user",
  };
  try {
    return await jwt.sign({ payload: payloadData }, privateKey, {
      expiresIn: config.jwtExpiresIn!,
      algorithm: "RS256",
    });
  } catch (error: unknown) {
    throw new BaseCustomError(
      error instanceof Error ? error.message : "Unknown error occurred",
      StatusCode.NOT_ACCEPTABLE
    );
  }
};

export const validatePassword = async ({
  enteredPassword,
  savedPassword,
}: {
  enteredPassword: string;
  savedPassword: string;
}) => {
  try {
    const isPasswordCorrect = await bcrypt.compare(
      enteredPassword,
      savedPassword
    );
    return isPasswordCorrect;
  } catch (error) {
    throw error;
  }
};

export const decodedToken = (token: string) => {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded || typeof decoded !== "object" || !("payload" in decoded)) {
      throw new Error("Invalid token structure");
    }

    return decoded.payload;
  } catch (error) {
    logger.error("Unable to decode in decodeToken() method!", { token, error });
    throw new ApiError("Can't decode token!");
  }
};
