import mongoose, { Schema } from "mongoose";

const contactInfoSchema = new Schema({
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  whatsapp: { type: String },
});

export default mongoose.models.ContactInfo || mongoose.model("ContactInfo", contactInfoSchema);
