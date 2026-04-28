import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({ url: String, publicId: String }, { _id: false });

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    images: [imageSchema],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isNewArrival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
