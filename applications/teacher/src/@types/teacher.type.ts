export interface ITimeSlot {
  start: string;
  end: string;
}

export interface IAvailableDay {
  day: string;
  time: ITimeSlot[];
}

export interface ITeacher {
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  phone_number: string;
  subject: string;
  province: string; // Added to match teacherSchemas
  university?: string;
  year_experience?: number;
  type_degree?: string;
  certificate?: string;
  bio: string;
  motivation: string;
  date_available: IAvailableDay[]; // Adjusted to match nested structure in teacherSchemas
  price: number;
  video: string;
  teaching_experience: string;
  rating?: number; // new field
  // is_degree?: boolean; // Optional, not defined in teacherSchemas
  // specialization?: string; // Optional, not defined in teacherSchemas
  // teacher_experience?: string; // Optional, not defined in teacherSchemas
}

export interface ITeacherUpdate {
  first_name?: string;
  last_name?: string;
  picture?: string;
  phone_number?: string;
  subject?: string;
  province?: string; // Added to match teacherSchemas
  university?: string;
  year_experience?: number;
  type_degree?: string;
  bio?: string;
  motivation?: string;
  date_available?: IAvailableDay[]; // Adjusted to match nested structure in teacherSchemas
  price?: number;
  certificate?: string;
  video?: string;
  teaching_experience?: string;
}
