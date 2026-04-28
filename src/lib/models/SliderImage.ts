import mongoose, { Schema } from "mongoose";

const sliderImageSchema = new Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.SliderImage || mongoose.model("SliderImage", sliderImageSchema);
