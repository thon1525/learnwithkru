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
exports.ClassService = void 0;
const class_repository_1 = require("../database/repositories/class.repository");
class ClassService {
    constructor() {
        this.ClassRepo = new class_repository_1.ClassRepository();
    }
    CreateClass(classData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClass = yield this.ClassRepo.CreateClass(classData);
                const { _id, teacherId, class_name, subject, email } = newClass;
                const newClassData = {
                    _id: _id.toString(),
                    teacherId,
                    class_name,
                    subject,
                    email,
                };
                //   const messageDetails = {
                //     message,
                //   };
                //   publishDirectMessage(teacherChannel, "");
                return { data: newClassData };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ClassService = ClassService;
//# sourceMappingURL=class-services.js.map