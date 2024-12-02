export const PATH_TEACHER = {
  base: "/v1/teachers",
  teacherList: " ",
  teacherSignup: "/become-teacher",
  teacherProfile: "/:id",
  login: "/login/:userId",
  getTeacher: "/get/:id",
  teacherSettingProfile: "/teacher-profile",
  updateTeacher: "/update/:id",
};

export const PATH_CLASS = {
  base: "/v1/teachers",
  createClass: "/class",
};


export const PATH_RATE = {
  CREATE: '/rate/:teacherId'
}
