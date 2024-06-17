"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classSchema = void 0;
const zod_1 = require("zod");
exports.classSchema = zod_1.z.object({
    school_name: zod_1.z.string().min(2).max(35),
    subject: zod_1.z.string().min(2).max(25),
    email: zod_1.z.string().email(),
});
//# sourceMappingURL=class-schema.js.map