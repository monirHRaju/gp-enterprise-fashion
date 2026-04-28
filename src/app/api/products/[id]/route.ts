import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).populate("category", "name slug").lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    _id: String(product._id),
    title: product.title,
    images: product.images ?? [],
    category: product.category,
    isNewArrival: product.isNewArrival ?? false,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const body = await request.json();
  const allowed = ["title", "images", "category", "isNewArrival"];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  const product = await Product.findByIdAndUpdate(id, update, { new: true })
    .populate("category", "name slug")
    .lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    _id: String(product._id),
    title: product.title,
    images: product.images ?? [],
    category: product.category,
    isNewArrival: product.isNewArrival ?? false,
  });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  for (const img of product.images ?? []) {
    if (img.publicId) {
      try { await cloudinary.uploader.destroy(img.publicId); } catch { /* skip */ }
    }
  }

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
