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
exports.AuthServices = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const jwt_1 = require("../utils/jwt");
const account_verification_repository_1 = require("../database/repositories/account-verification.repository");
const oauth_configs_1 = require("../utils/oauth-configs");
const auth_respository_1 = require("../database/repositories/auth.respository");
const base_custom_error_1 = require("../error/base-custom-error");
const http_request_1 = require("../utils/http-request");
const logger_1 = require("../utils/logger");
const verify_email_services_1 = require("./verify-email-services");
class AuthServices {
    constructor() {
        this.AuthRepo = new auth_respository_1.AuthRepository();
        this.accountVerificationRepo = new account_verification_repository_1.AccountVerificationRepository();
        this.SendVerifyEmailService = new verify_email_services_1.SendVerifyEmailService();
    }
    Signup(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO LIST
            //************************* */
            // 1. hast password
            // 2. check existing user
            // 3. send verify email and handle for exist user
            // 4. create new user
            // 5. send verify email
            try {
                const { firstname, lastname, email, password } = auth;
                // step 1
                const hashedPassword = yield (0, jwt_1.generatePassword)(password);
                // step 2
                const existingUser = yield this.AuthRepo.FindUserByEmail({
                    email: email,
                });
                if (existingUser) {
                    if (existingUser.is_verified === true) {
                        throw new base_custom_error_1.BaseCustomError("Your account is already signed up. Please log in instead.", http_status_code_1.default.BAD_REQUEST);
                    }
                    this.accountVerificationRepo.DeleteAccountVerifyByAuthId({
                        authId: existingUser._id,
                    });
                    this.SendVerifyEmailService.SendVerifyEmailToken({
                        authId: existingUser._id,
                        email: existingUser.email,
                    }, "verifyEmail");
                    throw new base_custom_error_1.BaseCustomError("Verification email has been resent. Please check your email to verify.", http_status_code_1.default.BAD_REQUEST);
                }
                // step 3
                const newUser = yield this.AuthRepo.CreateAuthUser({
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword,
                });
                // step 4
                yield this.SendVerifyEmailService.SendVerifyEmailToken({
                    authId: newUser._id,
                    email: newUser.email,
                }, "verifyEmail");
            }
            catch (error) {
                logger_1.logger.error("The erorr accur in Singup() method! : ", error);
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Songthing went wrong!");
            }
        });
    }
    SigninWithGoogleCallBack(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const googleConfig = yield oauth_configs_1.OauthConfig.getInstance();
                const tokenResponse = yield googleConfig.GoogleStrategy(code);
                const accessToken = tokenResponse.access_token;
                const userInfoResponse = yield googleConfig.GoogleAccessInfo(accessToken);
                const { given_name, family_name, email, id, verified_email, picture } = userInfoResponse.data;
                const user = yield this.AuthRepo.FindUserByEmail({ email });
                if (user) {
                    if (!user.googleId) {
                        const newUser = yield this.AuthRepo.FindUserByIdAndUpdate({
                            id: user._id,
                            updates: {
                                googleId: id,
                                is_verified: true,
                                picture,
                            },
                        });
                        const userData = {
                            authId: newUser._id.toString(),
                            firstname: newUser.firstname,
                            lastname: newUser.lastname,
                            email: newUser.email,
                            picture: newUser.picture,
                        };
                        const requestUser = new http_request_1.RequestUserService();
                        const { data } = yield requestUser.UpdateUser(userData);
                        const { _id } = data;
                        const jwtToken = yield (0, jwt_1.generateSignature)({ _id: _id.toString() });
                        return { data, token: jwtToken };
                    }
                    const requestUser = new http_request_1.RequestUserService();
                    const { data } = yield requestUser.GetUser(user._id.toString());
                    const { _id } = data;
                    const jwtToken = yield (0, jwt_1.generateSignature)({ _id: _id.toString() });
                    return { data, token: jwtToken };
                }
                const newUser = yield this.AuthRepo.CreateOauthUser({
                    firstname: given_name,
                    lastname: family_name,
                    email,
                    googleId: id,
                    verified_email,
                    picture,
                });
                const userData = {
                    authId: newUser._id.toString(),
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    picture: newUser.picture,
                };
                const requestUser = new http_request_1.RequestUserService();
                const { data } = yield requestUser.CreateUser(userData);
                if (!data) {
                    throw new base_custom_error_1.ApiError("Can't create new user in user service!");
                }
                const jwtToken = yield (0, jwt_1.generateSignature)({
                    _id: data._id.toString(),
                });
                return { data, token: jwtToken };
            }
            catch (error) {
                logger_1.logger.error("The error of SigninwithGoogle() method! :", error);
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing went wrong!");
            }
        });
    }
    Login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO LIST
            //******************* */
            // 1. find existing user
            // 2. checking user verify or not
            // 3. checking for correct password
            // 4. make request to user service for getting user's data
            try {
                const { email, password } = user;
                // step 1
                const existingUser = yield this.AuthRepo.FindUserByEmail({ email });
                if (!existingUser) {
                    throw new base_custom_error_1.BaseCustomError("User not exist", http_status_code_1.default.NOT_FOUND);
                }
                // step 2
                if (existingUser.is_verified === false) {
                    throw new base_custom_error_1.BaseCustomError("your email isn't verify", http_status_code_1.default.BAD_REQUEST);
                }
                // step 3
                const isPwdCorrect = yield (0, jwt_1.validatePassword)({
                    enteredPassword: password,
                    savedPassword: existingUser.password,
                });
                if (!isPwdCorrect) {
                    throw new base_custom_error_1.BaseCustomError("Email or Password is incorrect", http_status_code_1.default.BAD_REQUEST);
                }
                // step 4
                const requestUser = new http_request_1.RequestUserService();
                const { data } = yield requestUser.GetUser(existingUser._id.toString());
                if (!data) {
                    logger_1.logger.error("No User found in Login() when request data from user db!");
                    throw new base_custom_error_1.ApiError("User doesn't exist!", http_status_code_1.default.NOT_FOUND);
                }
                // step 5
                // const existStudent = await requestUser.LoginStudent(data._id.toString());
                // if (existStudent.token) {
                //   return { data: existStudent.data, token: existStudent.token };
                // }
                // const existTeacher = await requestUser.LoginTeacher(data._id.toString());
                // if (existTeacher.token) {
                //   return { data: existTeacher.data, token: existTeacher.token };
                // }
                const jwtToken = yield (0, jwt_1.generateSignature)({
                    _id: data._id.toString(),
                });
                return { data, token: jwtToken };
            }
            catch (error) {
                logger_1.logger.error("Login () method error:", error);
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing when wrong!");
            }
        });
    }
    SigninWithFacebookCallBack(code) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO LIST
            //*********************** */
            // 1. access token from facebook
            // 2. take token to access data from facebook user
            // 3. check existing user if exist generate new token
            // 4. create new user
            // 5. generate token
            //*********************** */
            try {
                //step 1
                const config = yield oauth_configs_1.OauthConfig.getInstance();
                const data = yield config.FacebookStrategy(code);
                const { access_token } = data;
                //step 2
                const profile = yield config.FacebookAccessInfo(access_token);
                const { id, first_name, last_name, email, picture } = profile.data;
                // step 3
                const existingUser = yield this.AuthRepo.FindUserByFacebookId({
                    facebookId: id,
                });
                if (existingUser) {
                    const requestUser = new http_request_1.RequestUserService();
                    const { data } = yield requestUser.GetUser(existingUser._id.toString());
                    const { _id } = data;
                    const jwtToken = yield (0, jwt_1.generateSignature)({ _id: _id.toString() });
                    return { data, token: jwtToken };
                }
                //step 4
                const newUser = yield this.AuthRepo.CreateOauthUser({
                    firstname: first_name,
                    lastname: last_name,
                    email,
                    facebookId: id,
                    verified_email: true,
                    picture: picture.data.url,
                });
                //step 5
                const { _id, firstname, lastname } = newUser;
                const userData = {
                    authId: _id.toString(),
                    firstname: firstname,
                    lastname: lastname,
                    email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
                    picture: newUser === null || newUser === void 0 ? void 0 : newUser.picture,
                };
                const requestUser = new http_request_1.RequestUserService();
                const user = yield requestUser.CreateUser(userData);
                if (!user.data) {
                    throw new base_custom_error_1.ApiError("Can't create new user in user service!");
                }
                const jwtToken = yield (0, jwt_1.generateSignature)({
                    _id: user.data._id.toString(),
                });
                return { data: user.data, token: jwtToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    RequestResetPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            try {
                // Find existing user by email
                const existingUser = yield this.AuthRepo.FindUserByEmail({ email });
                // Check if the user exists
                if (!existingUser) {
                    throw new base_custom_error_1.BaseCustomError("User not found!", http_status_code_1.default.NOT_FOUND);
                }
                // Check if the email is verified
                if (!existingUser.is_verified) {
                    throw new base_custom_error_1.BaseCustomError("Your email isn't verified. Please verify your email!", http_status_code_1.default.UNAUTHORIZED);
                }
                // Check if the user has a password (i.e., not signed up via a third-party app)
                if (!existingUser.password) {
                    throw new base_custom_error_1.BaseCustomError("Your account is signed up with a third-party app", http_status_code_1.default.BAD_REQUEST);
                }
                // Send verification email token
                yield this.SendVerifyEmailService.SendVerifyEmailToken({
                    authId: existingUser._id,
                    email: existingUser.email,
                }, "verifyResetPassword");
            }
            catch (error) {
                logger_1.logger.error("This error accurs in ResetPassword method! :", error);
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing went wrong!");
            }
        });
    }
    ConfirmResetPassword(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            //**************** */
            // 1. check old passwrod that exist
            // 2 hash new password
            // 3 create new user to database
            try {
                // const {  newPassword } = requestBody;
                // const existingUser = await this.AuthRepo.FindAuthById({ id });
                // if (!existingUser) {
                //   throw new BaseCustomError("User not found!", StatusCode.NOT_FOUND);
                // }
                // const isPwdCorrect = await validatePassword({
                //   enteredPassword: newPassword,
                //   savedPassword: existingUser.password as string,
                // });
                // if (!isPwdCorrect) {
                //   throw new BaseCustomError("password is exist", StatusCode.BAD_REQUEST);
                // }
                // const hashedPassword = await generatePassword(newPassword);
                // existingUser.password = hashedPassword;
                // await existingUser.save();
                return requestBody;
            }
            catch (error) {
                logger_1.logger.error("This error accurs in ConfirmResetPassword method!", error);
                if (error instanceof base_custom_error_1.BaseCustomError) {
                    throw error;
                }
                throw new base_custom_error_1.ApiError("Somthing went  wrong!");
            }
        });
    }
    Logout(decodedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = decodedUser;
                const userreq = new http_request_1.RequestUserService();
                const existingUser = userreq.GetUser(id);
                if (!existingUser) {
                    throw new base_custom_error_1.ApiError("No user found!", http_status_code_1.default.NOT_FOUND);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth-services.js.map