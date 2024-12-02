export interface IQueries {
  pageSize?: number;
  pageNumber?: number;
  name?: string;
  subject?: string;
  time_available?: string;
  province?: string;
  min_p?: number | null;
  max_p?: number | null;
}

export type FilterCondition = {
  [key: string]: any; // Allow any key with any value type for flexibility
};

export interface Filter {
  $or?: Array<{
    first_name?: RegExp;
    last_name?: RegExp;
    subject?: RegExp;
  }>;
  province?: string;
  "date_available.day"?: RegExp;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  subject?: string;
}
