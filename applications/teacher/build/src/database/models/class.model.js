"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    teacherId: { type: String, required: true },
    class_name: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
exports.ClassModel = (0, mongoose_1.model)("classes", classSchema);
//# sourceMappingURL=class.model.js.map