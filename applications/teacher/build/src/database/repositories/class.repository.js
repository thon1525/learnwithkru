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
exports.ClassRepository = void 0;
const base_custom_error_1 = require("../../error/base-custom-error");
const class_model_1 = require("../models/class.model");
class ClassRepository {
    constructor() { }
    CreateClass(classData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClass = new class_model_1.ClassModel(classData);
                if (!newClass) {
                    throw new base_custom_error_1.ApiError("Unable to create class");
                }
                return newClass;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ClassRepository = ClassRepository;
//# sourceMappingURL=class.repository.js.map