import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({ url: String, publicId: String }, { _id: false });

const pageContentSchema = new Schema({
  page: {
    type: String,
    enum: ["about", "quality", "buyers", "home-features"],
    unique: true,
    required: true,
  },
  title: { type: String },
  body: { type: String },
  images: [imageSchema],
});

export default mongoose.models.PageContent || mongoose.model("PageContent", pageContentSchema);
