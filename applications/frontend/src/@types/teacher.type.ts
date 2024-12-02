// export interface ITimeSlot {
//   start: string;
//   end: string;
// }
// [];

// export interface IAvailableDay {
//   day: any;
//   time: ITimeSlot[];
// }

// export interface ITeacher {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   picture: string;
//   phone_number: string;
//   subject: string;
//   province: string; // Added to match teacherSchemas
//   university: string;
//   year_experience: number;
//   type_degree: string;
//   bio: string;
//   motivation: string;
//   date_available: IAvailableDay[]; // Adjusted to match nested structure in teacherSchemas
//   price: number;
//   certificate: string;
//   video: string;
//   teaching_experience: string;
//   // is_degree?: boolean; // Optional, not defined in teacherSchemas
//   // specialization?: string; // Optional, not defined in teacherSchemas
//   // teacher_experience?: string; // Optional, not defined in teacherSchemas
// }

export interface PageDetails {
  totalPages: number;
  totalTeachers: number;
  currentPage: number;
}

export interface ITimeSlot {
  map(
    arg0: (item: any, index: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  start: string;
  end: string;
}

export interface IAvailableDay {
  day: string;
  time: ITimeSlot;
}

export interface ITeacher {
  isFavorite?: any;
  _id: any;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  phone_number: string;
  subject: string;
  province: string; // Added to match teacherSchemas
  university: string;
  year_experience: number;
  type_degree: string;
  bio: string;
  motivation: string;
  date_available: IAvailableDay[]; // Adjusted to match nested structure in teacherSchemas
  price: number;
  certificate: string;
  video: string;
  teaching_experience: string;
  total_rating?: number;
  // is_degree?: boolean; // Optional, not defined in teacherSchemas
  // specialization?: string; // Optional, not defined in teacherSchemas
  // teacher_experience?: string; // Optional, not defined in teacherSchemas
}
