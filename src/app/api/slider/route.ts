import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SliderImage from "@/lib/models/SliderImage";

export async function GET() {
  await connectDB();
  const slides = await SliderImage.find().sort({ order: 1 }).lean();
  return NextResponse.json(slides.map((s) => ({
    _id: String(s._id),
    imageUrl: s.imageUrl,
    publicId: s.publicId,
    order: s.order,
  })));
}
