"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const teacherSchema = new mongoose_1.Schema({
    userId: {
        type: String,
    },
    first_name: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true,
        index: true,
    },
    last_name: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true,
        index: true,
    },
    email: {
        type: String,
    },
    picture: {
        type: String,
    },
    phone_number: {
        type: String,
        minlength: 8,
        maxlength: 10,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        index: true,
    },
    province: {
        type: String,
        required: true,
        index: true,
    },
    university: {
        type: String,
    },
    year_experience: {
        type: Number,
    },
    type_degree: {
        type: String,
    },
    certificate: {
        type: String,
    },
    bio: {
        type: String,
        minlength: 40,
        maxlength: 200,
        required: true,
    },
    motivation: {
        type: String,
        minlength: 25,
        maxlength: 200,
        required: true,
    },
    date_available: [
        {
            day: {
                type: String,
                required: true,
            },
            time: [
                {
                    start: {
                        type: String,
                    },
                    end: {
                        type: String,
                    },
                },
            ],
        },
    ],
    price: {
        type: Number,
        required: true,
        index: true,
    },
    video: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    teaching_experience: {
        type: String,
        minlength: 25,
        maxlength: 150,
    },
    rating: {
        type: Number,
        max: 5,
        default: 0,
    },
});
const teacherModel = mongoose_1.default.model("teachers", teacherSchema);
exports.default = teacherModel;
//# sourceMappingURL=teacher.model.js.map