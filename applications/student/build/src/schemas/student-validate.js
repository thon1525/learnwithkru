"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchemas = void 0;
const zod_1 = require("zod");
exports.StudentSchemas = zod_1.z.object({
    school_name: zod_1.z.string().min(2).max(50),
    education: zod_1.z.string().min(2).max(50),
    grade: zod_1.z.number(),
    student_card: zod_1.z.string()
});
//# sourceMappingURL=student-validate.js.map