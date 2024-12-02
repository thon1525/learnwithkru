import { GenerateTimeExpire } from '../date-generate';

describe('GenerateTimeExpire', () => {
    it('should return a date 10 minutes later', () => {
        const initialDate = new Date('2024-01-01T00:00:00Z');
        const expectedDate = new Date('2024-01-01T00:10:00Z');

        const result = GenerateTimeExpire(initialDate);

        expect(result).toEqual(expectedDate);
    });

    it('should not modify the original date', () => {
        const initialDate = new Date('2024-01-01T00:00:00Z');
        const originalDateCopy = new Date(initialDate);

        GenerateTimeExpire(initialDate);

        expect(initialDate).toEqual(originalDateCopy);
    });
});
