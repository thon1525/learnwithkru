/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClassController } from './../../controllers/class.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TeacherController } from './../../controllers/teacher.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IClassRespone": {
        "dataType": "refObject",
        "properties": {
            "class_name": {"dataType":"string","required":true},
            "subject": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "_id": {"dataType":"string","required":true},
            "teacherId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IClass": {
        "dataType": "refObject",
        "properties": {
            "class_name": {"dataType":"string","required":true},
            "subject": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITimeSlot": {
        "dataType": "refObject",
        "properties": {
            "start": {"dataType":"string","required":true},
            "end": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IAvailableDay": {
        "dataType": "refObject",
        "properties": {
            "day": {"dataType":"string","required":true},
            "time": {"dataType":"array","array":{"dataType":"refObject","ref":"ITimeSlot"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeacher": {
        "dataType": "refObject",
        "properties": {
            "first_name": {"dataType":"string","required":true},
            "last_name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "picture": {"dataType":"string","required":true},
            "phone_number": {"dataType":"string","required":true},
            "subject": {"dataType":"string","required":true},
            "province": {"dataType":"string","required":true},
            "university": {"dataType":"string"},
            "year_experience": {"dataType":"double"},
            "type_degree": {"dataType":"string"},
            "certificate": {"dataType":"string"},
            "bio": {"dataType":"string","required":true},
            "motivation": {"dataType":"string","required":true},
            "date_available": {"dataType":"array","array":{"dataType":"refObject","ref":"IAvailableDay"},"required":true},
            "price": {"dataType":"double","required":true},
            "video": {"dataType":"string","required":true},
            "teaching_experience": {"dataType":"string","required":true},
            "rating": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IQueries": {
        "dataType": "refObject",
        "properties": {
            "pageSize": {"dataType":"double"},
            "pageNumber": {"dataType":"double"},
            "name": {"dataType":"string"},
            "subject": {"dataType":"string"},
            "time_available": {"dataType":"string"},
            "province": {"dataType":"string"},
            "min_p": {"dataType":"double"},
            "max_p": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeacherUpdate": {
        "dataType": "refObject",
        "properties": {
            "first_name": {"dataType":"string"},
            "last_name": {"dataType":"string"},
            "picture": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "subject": {"dataType":"string"},
            "province": {"dataType":"string"},
            "university": {"dataType":"string"},
            "year_experience": {"dataType":"double"},
            "type_degree": {"dataType":"string"},
            "bio": {"dataType":"string"},
            "motivation": {"dataType":"string"},
            "date_available": {"dataType":"array","array":{"dataType":"refObject","ref":"IAvailableDay"}},
            "price": {"dataType":"double"},
            "certificate": {"dataType":"string"},
            "video": {"dataType":"string"},
            "teaching_experience": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/v1/teachers/class',
            ...(fetchMiddlewares<RequestHandler>(ClassController)),
            ...(fetchMiddlewares<RequestHandler>(ClassController.prototype.CreateClass)),

            async function ClassController_CreateClass(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"IClass"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ClassController();

              await templateService.apiHandler({
                methodName: 'CreateClass',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/teachers',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.TeacherList)),

            async function TeacherController_TeacherList(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    queries: {"in":"queries","name":"queries","required":true,"ref":"IQueries"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'TeacherList',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/teachers/become-teacher',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.TeacherSingup)),

            async function TeacherController_TeacherSingup(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ITeacher"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'TeacherSingup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/teachers/:id',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.FindOneTeacher)),

            async function TeacherController_FindOneTeacher(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'FindOneTeacher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/teachers/login/:userId',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.Login)),

            async function TeacherController_Login(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'Login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/teachers/get/:id',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.GetTeacher)),

            async function TeacherController_GetTeacher(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'GetTeacher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/v1/teachers/update/:id',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.UpdateTeacher)),

            async function TeacherController_UpdateTeacher(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ITeacherUpdate"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'UpdateTeacher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/teachers/rate/:teacherId',
            ...(fetchMiddlewares<RequestHandler>(TeacherController)),
            ...(fetchMiddlewares<RequestHandler>(TeacherController.prototype.RateTeacher)),

            async function TeacherController_RateTeacher(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    teacherId: {"in":"path","name":"teacherId","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"rating":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TeacherController();

              await templateService.apiHandler({
                methodName: 'RateTeacher',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
