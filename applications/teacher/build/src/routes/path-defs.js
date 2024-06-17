"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH_RATE = exports.PATH_CLASS = exports.PATH_TEACHER = void 0;
exports.PATH_TEACHER = {
    base: "/v1/teachers",
    teacherList: " ",
    teacherSignup: "/become-teacher",
    teacherProfile: "/:id",
    login: "/login/:userId",
    getTeacher: "/get/:id",
    updateTeacher: "/update/:id",
};
exports.PATH_CLASS = {
    base: "/v1/teachers",
    createClass: "/class",
};
exports.PATH_RATE = {
    CREATE: '/rate/:teacherId'
};
//# sourceMappingURL=path-defs.js.map