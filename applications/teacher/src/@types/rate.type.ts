// Define a type for numbers between 1 and 10
// type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Define the interface using the range type
export interface IRate {
  user_id: string;
  teacher_id: string;
  rating: Number;
  feedback?: string;
}
