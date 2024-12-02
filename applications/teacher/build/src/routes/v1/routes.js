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
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const class_controller_1 = require("./../../controllers/class.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const teacher_controller_1 = require("./../../controllers/teacher.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IClassRespone": {
        "dataType": "refObject",
        "properties": {
            "class_name": { "dataType": "string", "required": true },
            "subject": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "_id": { "dataType": "string", "required": true },
            "teacherId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IClass": {
        "dataType": "refObject",
        "properties": {
            "class_name": { "dataType": "string", "required": true },
            "subject": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITimeSlot": {
        "dataType": "refObject",
        "properties": {
            "start": { "dataType": "string", "required": true },
            "end": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAvailableDay": {
        "dataType": "refObject",
        "properties": {
            "day": { "dataType": "string", "required": true },
            "time": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ITimeSlot" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeacher": {
        "dataType": "refObject",
        "properties": {
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "picture": { "dataType": "string", "required": true },
            "phone_number": { "dataType": "string", "required": true },
            "subject": { "dataType": "string", "required": true },
            "province": { "dataType": "string", "required": true },
            "university": { "dataType": "string" },
            "year_experience": { "dataType": "double" },
            "type_degree": { "dataType": "string" },
            "certificate": { "dataType": "string" },
            "bio": { "dataType": "string", "required": true },
            "motivation": { "dataType": "string", "required": true },
            "date_available": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IAvailableDay" }, "required": true },
            "price": { "dataType": "double", "required": true },
            "video": { "dataType": "string", "required": true },
            "teaching_experience": { "dataType": "string", "required": true },
            "rating": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IQueries": {
        "dataType": "refObject",
        "properties": {
            "pageSize": { "dataType": "double" },
            "pageNumber": { "dataType": "double" },
            "name": { "dataType": "string" },
            "subject": { "dataType": "string" },
            "time_available": { "dataType": "string" },
            "province": { "dataType": "string" },
            "min_p": { "dataType": "double" },
            "max_p": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeacherUpdate": {
        "dataType": "refObject",
        "properties": {
            "first_name": { "dataType": "string" },
            "last_name": { "dataType": "string" },
            "picture": { "dataType": "string" },
            "phone_number": { "dataType": "string" },
            "subject": { "dataType": "string" },
            "province": { "dataType": "string" },
            "university": { "dataType": "string" },
            "year_experience": { "dataType": "double" },
            "type_degree": { "dataType": "string" },
            "bio": { "dataType": "string" },
            "motivation": { "dataType": "string" },
            "date_available": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IAvailableDay" } },
            "price": { "dataType": "double" },
            "certificate": { "dataType": "string" },
            "video": { "dataType": "string" },
            "teaching_experience": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/v1/teachers/class', ...((0, runtime_1.fetchMiddlewares)(class_controller_1.ClassController)), ...((0, runtime_1.fetchMiddlewares)(class_controller_1.ClassController.prototype.CreateClass)), function ClassController_CreateClass(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "IClass" },
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new class_controller_1.ClassController();
                yield templateService.apiHandler({
                    methodName: 'CreateClass',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/teachers', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.TeacherList)), function TeacherController_TeacherList(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                queries: { "in": "queries", "name": "queries", "required": true, "ref": "IQueries" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'TeacherList',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/teachers/become-teacher', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.TeacherSingup)), function TeacherController_TeacherSingup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ITeacher" },
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'TeacherSingup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/teachers/:id', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.FindOneTeacher)), function TeacherController_FindOneTeacher(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'FindOneTeacher',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/teachers/login/:userId', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.Login)), function TeacherController_Login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'Login',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/teachers/get/:id', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.GetTeacher)), function TeacherController_GetTeacher(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'GetTeacher',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch('/v1/teachers/update/:id', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.UpdateTeacher)), function TeacherController_UpdateTeacher(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ITeacherUpdate" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'UpdateTeacher',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/teachers/rate/:teacherId', ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController)), ...((0, runtime_1.fetchMiddlewares)(teacher_controller_1.TeacherController.prototype.RateTeacher)), function TeacherController_RateTeacher(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                teacherId: { "in": "path", "name": "teacherId", "required": true, "dataType": "string" },
                req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
                requestBody: { "in": "body", "name": "requestBody", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "rating": { "dataType": "string", "required": true } } },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new teacher_controller_1.TeacherController();
                yield templateService.apiHandler({
                    methodName: 'RateTeacher',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map