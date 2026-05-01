import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FashionCategory from "@/lib/models/FashionCategory";
import FashionProduct from "@/lib/models/FashionProduct";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const cat = await FashionCategory.findById(id).lean();
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    _id: String(cat._id), name: cat.name, slug: cat.slug,
    description: cat.description ?? "", coverImages: cat.coverImages ?? [], isActive: cat.isActive ?? true,
  });
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const { name, description, coverImages, isActive } = await request.json();
  const cat = await FashionCategory.findById(id);
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (name !== undefined) cat.name = name.trim();
  if (description !== undefined) cat.description = description;
  if (coverImages !== undefined) cat.coverImages = coverImages;
  if (isActive !== undefined) cat.isActive = isActive;
  await cat.save();
  return NextResponse.json({ _id: String(cat._id), name: cat.name, slug: cat.slug, isActive: cat.isActive });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const cat = await FashionCategory.findById(id).lean();
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const count = await FashionProduct.countDocuments({ category: cat._id });
  if (count > 0) return NextResponse.json({ error: `Cannot delete: ${count} product(s) use this category.` }, { status: 400 });
  for (const img of cat.coverImages ?? []) {
    if (img.publicId) { try { await cloudinary.uploader.destroy(img.publicId); } catch { /* skip */ } }
  }
  await FashionCategory.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
