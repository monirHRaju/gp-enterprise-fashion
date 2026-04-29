import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SliderImage from "@/lib/models/SliderImage";

export async function POST(request: NextRequest) {
  await connectDB();
  const { imageUrl, publicId } = await request.json();
  if (!imageUrl || !publicId) return NextResponse.json({ error: "imageUrl and publicId required" }, { status: 400 });
  const count = await SliderImage.countDocuments();
  const slide = await SliderImage.create({ imageUrl, publicId, order: count });
  return NextResponse.json({ _id: String(slide._id), imageUrl: slide.imageUrl, publicId: slide.publicId, order: slide.order }, { status: 201 });
}

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
