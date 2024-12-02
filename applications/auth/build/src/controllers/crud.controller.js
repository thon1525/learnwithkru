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
exports.CrudController = void 0;
const crud_services_1 = require("../services/crud-services");
class CrudController {
    GetUser(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new crud_services_1.CrudServices();
                const user = yield service.GetUser(authId);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CrudController = CrudController;
//# sourceMappingURL=crud.controller.js.map