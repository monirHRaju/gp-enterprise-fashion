import mongoose, { Schema } from "mongoose";

const buyerSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  logo: {
    url: { type: String },
    publicId: { type: String },
  },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Buyer || mongoose.model("Buyer", buyerSchema);
