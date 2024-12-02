"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherSchemas = exports.teacherSchemas = void 0;
const zod_1 = require("zod");
exports.teacherSchemas = zod_1.z.object({
    first_name: zod_1.z.string().min(2).max(25),
    last_name: zod_1.z.string().min(2).max(25),
    picture: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone_number: zod_1.z.string().min(8).max(10),
    subject: zod_1.z.string(),
    province: zod_1.z.string(),
    university: zod_1.z.string().min(2).max(70).optional(),
    year_experience: zod_1.z.number().optional(),
    type_degree: zod_1.z.string().optional(),
    certificate: zod_1.z.string().optional(),
    bio: zod_1.z.string().min(40).max(200),
    motivation: zod_1.z.string().min(25).max(200),
    date_available: zod_1.z.array(zod_1.z.object({
        day: zod_1.z.string(),
        time: zod_1.z.array(zod_1.z.object({
            start: zod_1.z.string().optional(),
            end: zod_1.z.string().optional(),
        })),
    })),
    price: zod_1.z.number(),
    video: zod_1.z.string(),
    teaching_experience: zod_1.z.string().min(25).max(150),
});
exports.updateTeacherSchemas = zod_1.z.object({
    first_name: zod_1.z.string().min(2).max(25).optional(),
    last_name: zod_1.z.string().min(2).max(25).optional(),
    picture: zod_1.z.string().optional(),
    phone_number: zod_1.z.string().min(8).max(10).optional(),
    subject: zod_1.z.string().optional(),
    province: zod_1.z.string().optional(),
    university: zod_1.z.string().min(2).max(70).optional(),
    year_experience: zod_1.z.number().optional(),
    type_degree: zod_1.z.string().optional(),
    bio: zod_1.z.string().min(40).max(200).optional(),
    motivation: zod_1.z.string().min(25).max(200).optional(),
    date_available: zod_1.z
        .array(zod_1.z
        .object({
        day: zod_1.z.string().optional(),
        time: zod_1.z
            .array(zod_1.z
            .object({
            start: zod_1.z.string().optional(),
            end: zod_1.z.string().optional(),
        })
            .optional())
            .optional(),
    })
        .optional())
        .optional(),
    price: zod_1.z.number().optional(),
    certificate: zod_1.z.string().optional(),
    video: zod_1.z.string().optional(),
    teaching_experience: zod_1.z.string().min(25).max(150).optional(),
});
//# sourceMappingURL=teacher-schema.js.map