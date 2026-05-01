import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FashionProduct from "@/lib/models/FashionProduct";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const p = await FashionProduct.findById(id).populate("category", "name slug").lean();
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ _id: String(p._id), title: p.title, images: p.images ?? [], category: p.category, isNewArrival: p.isNewArrival });
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const body = await request.json();
  const allowed = ["title", "images", "category", "isNewArrival"];
  const update: Record<string, unknown> = {};
  for (const key of allowed) { if (key in body) update[key] = body[key]; }
  const p = await FashionProduct.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ _id: String(p._id), title: p.title, images: p.images ?? [], isNewArrival: p.isNewArrival });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const p = await FashionProduct.findById(id).lean();
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  for (const img of p.images ?? []) {
    if (img.publicId) { try { await cloudinary.uploader.destroy(img.publicId); } catch { /* skip */ } }
  }
  await FashionProduct.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
