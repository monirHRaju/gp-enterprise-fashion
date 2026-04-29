import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SliderImage from "@/lib/models/SliderImage";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const { order } = await request.json();
  const slide = await SliderImage.findByIdAndUpdate(id, { order }, { new: true }).lean();
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ _id: String(slide._id), order: slide.order });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const slide = await SliderImage.findById(id).lean();
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (slide.publicId) {
    try { await cloudinary.uploader.destroy(slide.publicId); } catch { /* skip */ }
  }
  await SliderImage.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
