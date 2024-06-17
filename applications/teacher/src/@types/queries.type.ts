export interface IQueries {
  pageSize?: number;
  pageNumber?: number;
  name?: string;
  subject?: string;
  time_available?: string;
  province?: string;
  min_p?: number;
  max_p?: number;
}

type FilterCondition = {
  [key: string]: any; // Allow any key with any value type for flexibility
};

export type Filter = {
  $or?: FilterCondition[];
  "date_available.day"?: string;
  province?: string;
  pricing?: {  $gte: number,  $lte: number  };
  subject?: string;
};
