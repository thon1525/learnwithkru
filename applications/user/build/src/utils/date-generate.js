"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTimeExpire = void 0;
function GenerateTimeExpire(date) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 10);
    return newDate;
}
exports.GenerateTimeExpire = GenerateTimeExpire;
//# sourceMappingURL=date-generate.js.map