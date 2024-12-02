import getConfig from "./config";

const currentEnv = process.env.NODE_ENV || "development";
const config = getConfig(currentEnv);
export function createMessageDetails(
  email: string,
  token: string,
  type: "verifyEmail" | "resetPassword"
) {
  const verifyLink = `${config.apiGateway}/v1/auth/verify?token=${token}`;
  const resetPasswordLink = `${config.apiGateway}/v1/auth/reset-password?token=${token}`;
  return {
    receiverEmail: email,
    link: type === "verifyEmail" ? verifyLink : resetPasswordLink,
    template: type,
  };
}
