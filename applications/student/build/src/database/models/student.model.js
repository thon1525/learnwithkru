"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchemas = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    firstname: {
        type: String,
        min: 2,
        max: 25
    },
    lastname: {
        type: String,
        min: 2,
        max: 25
    },
    email: {
        type: String,
        min: 2,
    },
    school_name: {
        type: String,
        min: 2,
        max: 50,
        require: true,
    },
    education: {
        type: String,
        min: 2,
        require: true,
        max: 50,
    },
    grade: {
        require: true,
        type: Number,
    },
    student_card: {
        type: String,
    },
});
exports.StudentModel = mongoose_1.default.model('students', studentSchemas);
//# sourceMappingURL=student.model.js.map