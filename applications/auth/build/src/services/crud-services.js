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
exports.CrudServices = void 0;
const auth_respository_1 = require("../database/repositories/auth.respository");
class CrudServices {
    constructor() {
        this.authRepo = new auth_respository_1.AuthRepository();
    }
    GetUser(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authRepo.FindUserById({ id: authId });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CrudServices = CrudServices;
//# sourceMappingURL=crud-services.js.map