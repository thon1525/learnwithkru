// src/tests/studentSchema.test.ts
import { StudentSchemas } from '../student-validate';

describe('StudentSchema', () => {
  it('should validate a correct student object', () => {
    const validStudent = {
      schoolName: 'Example School',
      education: 'High School',
      grade: 10,
      studentCard: '1234567890'
    };
    expect(() => StudentSchemas.parse(validStudent)).not.toThrow();
  });

  it('should throw an error for an invalid student object', () => {
    const invalidStudent = {
      schoolName: 'E',
      education: 'H',
      grade: 'ten',
      studentCard: 1234567890
    };
    expect(() => StudentSchemas.parse(invalidStudent)).toThrow();
  });
});
