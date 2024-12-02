"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const path_defs_1 = require("../routes/path-defs");
const user_services_1 = require("../services/user-services");
const tsoa_1 = require("tsoa");
const authorize_1 = require("../middlewares/authorize");
let UserController = class UserController extends tsoa_1.Controller {
    Createuser(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authId, firstname, lastname, email, picture } = requestBody;
            try {
                console.log("This is authId", authId);
                const service = new user_services_1.UserServices();
                const newUser = yield service.CreateUser({
                    authId,
                    firstname,
                    lastname,
                    email,
                    picture,
                });
                return { message: "Success Created", data: newUser };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetUserByAuthId(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new user_services_1.UserServices();
                const user = yield service.GetUserByAuthId(authId);
                return { message: "Success retrieve user", data: user };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new user_services_1.UserServices();
                const user = (yield service.GetUserByUserId(userId));
                return { message: "Success retrieve user", data: user };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetUserProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const service = new user_services_1.UserServices();
                const { data } = yield service.GetUserProfile(userId);
                return { message: "Success retrived", data };
            }
            catch (error) {
                throw error;
            }
        });
    }
    UpdateUserByUserId(authId, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new user_services_1.UserServices();
                const { data } = yield service.UpdateUserByUserId(authId, requestBody);
                return { message: "Success update", data };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.CREATED, "Created"),
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Createuser", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_USER.GET_USER_BY_AUTH_ID),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByAuthId", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_USER.GET_USER_BY_USER_ID),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserByUserId", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Get)(path_defs_1.PATH_USER.USER_PROFILE),
    (0, tsoa_1.Middlewares)((0, authorize_1.authorize)(["user", "student", "teacher"])),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUserProfile", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.OK, "OK"),
    (0, tsoa_1.Patch)(path_defs_1.PATH_USER.UPDATE_USER),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateUserByUserId", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("/v1/users")
], UserController);
//# sourceMappingURL=user.controller.js.map