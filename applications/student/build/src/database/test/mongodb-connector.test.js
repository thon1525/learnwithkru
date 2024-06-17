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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const index_1 = __importDefault(require("../index")); // Adjust the import path accordingly
describe('MongoDBConnector', () => {
    let mongoServer;
    let mongoDBConnector;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    }));
    beforeEach(() => {
        mongoDBConnector = index_1.default.getInstance();
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoDBConnector.disconnect();
        index_1.default.resetInstance();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoServer.stop();
    }));
    it('should connect to MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
        const mongoUri = mongoServer.getUri();
        yield mongoDBConnector.connect({ url: mongoUri });
        expect(mongoose_1.default.connection.readyState).toBe(1); // 1 means connected
    }));
    it('should disconnect from MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
        const mongoUri = mongoServer.getUri();
        yield mongoDBConnector.connect({ url: mongoUri });
        yield mongoDBConnector.disconnect();
        expect(mongoose_1.default.connection.readyState).toBe(0); // 0 means disconnected
    }));
    it('should handle connection errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleSpy = jest.spyOn(console, 'log');
        const invalidUri = 'mongodb+srv://learnwithkru:gT5jqfgZyQ8UmCNn@learnwithkru.elxl0wh.mongodb.net676rr/studentpppp';
        yield mongoDBConnector.connect({ url: invalidUri });
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB disconnected'));
        consoleSpy.mockRestore();
    }));
});
//# sourceMappingURL=mongodb-connector.test.js.map