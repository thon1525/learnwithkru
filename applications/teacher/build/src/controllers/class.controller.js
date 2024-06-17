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
exports.ClassController = void 0;
const tsoa_1 = require("tsoa");
const class_services_1 = require("../services/class-services");
const http_status_code_1 = __importDefault(require("../utils/http-status-code"));
const class_schema_1 = require("../schemas/class-schema");
const validate_input_1 = require("../middlewares/validate-input");
const authorize_1 = require("../middlewares/authorize");
const path_defs_1 = require("../routes/path-defs");
let ClassController = class ClassController extends tsoa_1.Controller {
    CreateClass(requestBody, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.user;
                const classData = Object.assign({ teacherId: id }, requestBody);
                const service = new class_services_1.ClassService();
                const respone = yield service.CreateClass(classData);
                return { message: "Success create class", data: respone.data };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, tsoa_1.SuccessResponse)(http_status_code_1.default.CREATED, "Created"),
    (0, tsoa_1.Middlewares)((0, authorize_1.authorize)(["teacher"])),
    (0, tsoa_1.Middlewares)((0, validate_input_1.ValidateInput)(class_schema_1.classSchema)),
    (0, tsoa_1.Post)(path_defs_1.PATH_CLASS.createClass),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "CreateClass", null);
exports.ClassController = ClassController = __decorate([
    (0, tsoa_1.Route)("/v1/teachers")
], ClassController);
//# sourceMappingURL=class.controller.js.map