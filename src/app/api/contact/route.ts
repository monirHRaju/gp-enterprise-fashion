import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactInfo from "@/lib/models/ContactInfo";

export async function PUT(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const fields = ["phone", "email", "address", "facebook", "linkedin", "whatsapp"];
  const update: Record<string, string> = {};
  for (const f of fields) update[f] = body[f] ?? "";
  const doc = await ContactInfo.findOneAndUpdate({}, update, { upsert: true, new: true }).lean();
  return NextResponse.json({ _id: String(doc!._id), ...update });
}

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
