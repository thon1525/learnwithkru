"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rateSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        require: true,
    },
    teacher_id: {
        type: String,
        require: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    created_at: { type: Date, default: Date.now },
});
exports.rateModel = mongoose_1.default.model("rates", rateSchema);
//# sourceMappingURL=rate.model.js.map