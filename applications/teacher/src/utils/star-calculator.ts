export function calculateRating(r1: number, r2: number, r3: number, r4: number, r5: number): number {
    const numerator = r5 + r4 + r3 + r2 + r1;
    const denominator = 5 * r5 + 4 * r4 + 3 * r3 + 2 * r2 + r1;
    return denominator === 0 ? 0 : numerator / denominator;
}