"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/tests/studentSchema.test.ts
const student_validate_1 = require("../student-validate");
describe('StudentSchema', () => {
    it('should validate a correct student object', () => {
        const validStudent = {
            schoolName: 'Example School',
            education: 'High School',
            grade: 10,
            studentCard: '1234567890'
        };
        expect(() => student_validate_1.StudentSchemas.parse(validStudent)).not.toThrow();
    });
    it('should throw an error for an invalid student object', () => {
        const invalidStudent = {
            schoolName: 'E',
            education: 'H',
            grade: 'ten',
            studentCard: 1234567890
        };
        expect(() => student_validate_1.StudentSchemas.parse(invalidStudent)).toThrow();
    });
});
//# sourceMappingURL=student-validate.test.js.map