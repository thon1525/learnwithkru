export interface IClass {
  class_name: string;
  subject: string;
  email: string;
}

export interface IClassRespone extends IClass {
  _id: string;
  teacherId: string;
}

