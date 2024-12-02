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
// tests/student.routes.test.ts
const supertest_1 = __importDefault(require("supertest"));
const authorize_1 = require("../../../middlewares/authorize"); // Assuming you have this middleware
const student_validate_1 = require("../../../middlewares/student-validate");
const http_status_code_1 = __importDefault(require("../../../utils/http-status-code"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../../app"));
jest.mock('../../../middlewares/authorize');
jest.mock('../../../middlewares/student-validate');
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = "mongodb+srv://learnwithkru:gT5jqfgZyQ8UmCNn@learnwithkru.elxl0wh.mongodb.net/student";
    yield mongoose_1.default.connect(uri, {});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany({});
    }
}));
describe('MongoDB In-Memory Server', () => {
    it('should connect to the in-memory MongoDB server', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(mongoose_1.default.connection.readyState).toBe(1); // 1 indicates connected
    }));
});
describe('Student Routes', () => {
    // (authorize as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    //     next();
    //   });
    // (studentValidate as jest.Mock).mockImplementation(() => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    //   next();
    // });
    it('should create a new student', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = 'mockUserId';
        const mockRequestBody = {
            userId: mockUserId,
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            school_name: 'Mock School',
            education: 'High School',
            grade: 10,
            student_card: 'mockStudentCard.png',
        };
        authorize_1.authorize.mockImplementation(() => (_req, _res, next) => {
            next();
        });
        student_validate_1.studentValidate.mockImplementation(() => (_req, _res, next) => {
            next();
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/students/become-student")
            .send(mockRequestBody);
        expect(response.status).toBe(http_status_code_1.default.CREATED);
        expect(response.body.message).toBe('Create success');
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.firstname).toBe(mockRequestBody.firstname);
        expect(response.body.data.lastname).toBe(mockRequestBody.lastname);
        expect(response.body.data.email).toBe(mockRequestBody.email);
        expect(response.body.data.school_name).toBe(mockRequestBody.school_name);
        expect(response.body.data.education).toBe(mockRequestBody.education);
        expect(response.body.data.grade).toBe(mockRequestBody.grade);
        expect(response.body.data.student_card).toBe(mockRequestBody.student_card);
    }));
});
//# sourceMappingURL=student.route.test.js.map