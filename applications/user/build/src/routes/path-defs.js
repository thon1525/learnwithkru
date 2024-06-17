"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH_SERVICE = exports.PATH_USER = void 0;
exports.PATH_USER = {
    BASE: "/v1/users",
    CREATE_USER: "/create",
    USER_PROFILE: "/",
    UPDATE_USER: "/update/:authId",
    GET_USER_BY_AUTH_ID: "/by-auth-id/:authId", // Fetch user by their authentication ID
    GET_USER_BY_USER_ID: "/by-user-id/:userId", // Fetch user by their user ID
};
exports.PATH_SERVICE = {
    BASE: "/v1",
    AUTH: {
        BASE: "/auth",
        GET: "/users",
    },
    STUDENT: {
        BASE: "/student",
    },
    TEACHER: "/teacher",
};
//# sourceMappingURL=path-defs.js.map