import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactInfo from "@/lib/models/ContactInfo";

export async function GET() {
  await connectDB();
  const doc = await ContactInfo.findOne().lean();
  if (!doc) return NextResponse.json(null);
  return NextResponse.json({
    _id: String(doc._id),
    phone: doc.phone ?? "",
    email: doc.email ?? "",
    address: doc.address ?? "",
    facebook: doc.facebook ?? "",
    linkedin: doc.linkedin ?? "",
    whatsapp: doc.whatsapp ?? "",
  });
}
