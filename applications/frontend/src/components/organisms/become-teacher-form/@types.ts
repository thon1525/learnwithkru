import { IUser } from "@/@types/user";
import { Dispatch, SetStateAction } from "react";

interface InputFormsTypes {
  id: any;
  placeholder?: string;
  type?: string;
  borderColor?: string;
  borderRadius?: string;
}

export interface BecomeTeacherType {
  first_name: string;
  last_name: string;
  subject: string;
  phone_number: string;
  province: string;

  university: string;
  year_experience: number;
  type_degree: string;
  certificate: string;

  bio: string;
  motivation: string;
  video: string;
  teaching_experience: string;

  price: number;
}

export interface BecomeTeacherFormTypes {
  title: string;
  id?: string;
  description: string;
  inputForms?: InputFormsTypes[] | undefined;
  buttonTitle: string;
  fileLabel?: string;
  InputFormhalf?: string;
  checkboxtext?: string;
  currentPage: number;
  pageIndex?: number[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setdataTutor?: any;
  dataTutor: BecomeTeacherType | undefined;
  dataUser: IUser | null;
}

export interface TimeAvailableFormTypes extends BecomeTeacherFormTypes {
  setTimeAvailable: string;
  setTimeDescription: string;
}

export interface AboutFormProps {
  first_name: string;
  last_name: string;
  subject: string;
  phone_number: string;
  province: string;
  email: string;
}

export interface BecomeTeacherData {
  university: string;
  year_experience: string;
  type_degree: string;
  certificate: string | null;
}

export interface TeachersdescriptionProps {
  bio: string;
  teaching_experience: string;
  motivation: string;
  video: string | null;
}

export interface teachersProps {
  lastname: string;
  firstname: string;
  phonenumber: string;
  province: string;
  subject: string;
}
