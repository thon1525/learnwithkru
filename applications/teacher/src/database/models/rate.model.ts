import mongoose from "mongoose";
import { IRate } from "../../@types/rate.type";

export interface IRateDocs extends IRate, Document {}

const rateSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  teacher_id: {
    type: String,
    require: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  created_at: { type: Date, default: Date.now },
});

export const rateModel = mongoose.model("rates", rateSchema);
