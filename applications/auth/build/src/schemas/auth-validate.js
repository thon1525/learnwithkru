"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginSchema = exports.userValidateSchema = void 0;
const zod_1 = require("zod");
const userValidateSchema = zod_1.z.object({
    firstname: zod_1.z.string().min(3).max(25),
    lastname: zod_1.z.string().min(3).max(25),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*\d)(?=.*[a-z]).{8,}$/, "Password must contain at least one lowercase letter and one number"),
});
exports.userValidateSchema = userValidateSchema;
const authLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*\d)(?=.*[a-z]).{8,}$/, "Password must contain at least one lowercase letter and one number"),
});
exports.authLoginSchema = authLoginSchema;
//# sourceMappingURL=auth-validate.js.map