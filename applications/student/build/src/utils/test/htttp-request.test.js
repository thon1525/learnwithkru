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
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const htttp_request_1 = require("../htttp-request");
const logger_1 = require("../../utils/logger");
const base_custom_error_1 = require("../../error/base-custom-error");
const config_1 = __importDefault(require("../config"));
const path_defs_1 = require("../../routes/path-defs");
jest.mock('../config');
jest.mock('../../utils/logger');
const mockConfig = {
    userService: 'http://localhost:3004'
};
config_1.default.mockReturnValue(mockConfig);
describe('getUserById', () => {
    let mockAxios;
    beforeEach(() => {
        mockAxios = new axios_mock_adapter_1.default(axios_1.default);
    });
    afterEach(() => {
        mockAxios.restore();
    });
    it('should fetch user data successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        const mockUser = { id: userId, name: 'John Doe' };
        mockAxios.onGet(`${mockConfig.userService}${path_defs_1.PATH_USER.GET}/${userId}`).reply(200, mockUser);
        const result = yield (0, htttp_request_1.getUserById)(userId);
        expect(result).toEqual(mockUser);
    }));
    it('should throw an error when the status is not 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        mockAxios.onGet(`${mockConfig.userService}${path_defs_1.PATH_USER.GET}/${userId}`).reply(500);
        yield expect((0, htttp_request_1.getUserById)(userId)).rejects.toThrow(new base_custom_error_1.ApiError("Error communicating with user service."));
    }));
    it('should log and throw an ApiError on Axios error', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        const errorMessage = 'Network Error';
        mockAxios.onGet(`${mockConfig.userService}${path_defs_1.PATH_USER.GET}/${userId}`).networkError();
        yield expect((0, htttp_request_1.getUserById)(userId)).rejects.toThrow(new base_custom_error_1.ApiError("Error communicating with user service."));
        expect(logger_1.logger.error).toHaveBeenCalledWith('Axios Error in createUser() method:', errorMessage);
    }));
    it('should log and throw an unknown error', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '123';
        const unknownError = new Error('Unknown Error');
        jest.spyOn(axios_1.default, 'get').mockImplementation(() => {
            throw unknownError;
        });
        yield expect((0, htttp_request_1.getUserById)(userId)).rejects.toThrow('Unknown Error');
        expect(logger_1.logger.error).toHaveBeenCalledWith('Unknown Error in createUser() method:', unknownError);
    }));
});
//# sourceMappingURL=htttp-request.test.js.map