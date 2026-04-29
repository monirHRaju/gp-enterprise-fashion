import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({ url: String, publicId: String }, { _id: false });

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  coverImages: [imageSchema],
  isActive: { type: Boolean, default: true },
});

categorySchema.pre("save", async function () {
  if (this.isModified("name") || this.isNew) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
