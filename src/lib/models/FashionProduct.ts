import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({ url: String, publicId: String }, { _id: false });

const fashionProductSchema = new Schema(
  {
    title: { type: String, required: true },
    images: [imageSchema],
    category: { type: Schema.Types.ObjectId, ref: "FashionCategory", required: true },
    isNewArrival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.FashionProduct || mongoose.model("FashionProduct", fashionProductSchema);
