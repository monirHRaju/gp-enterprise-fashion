import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const cat = await Category.findById(id).lean();
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    _id: String(cat._id),
    name: cat.name,
    slug: cat.slug,
    description: cat.description ?? "",
    coverImages: cat.coverImages ?? [],
    isActive: cat.isActive ?? true,
  });
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const { name, description, coverImages, isActive } = await request.json();
  const update: Record<string, unknown> = {};
  if (name !== undefined) update.name = name.trim();
  if (description !== undefined) update.description = description;
  if (coverImages !== undefined) update.coverImages = coverImages;
  if (isActive !== undefined) update.isActive = isActive;

  const cat = await Category.findById(id);
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  Object.assign(cat, update);
  await cat.save();
  return NextResponse.json({ _id: String(cat._id), name: cat.name, slug: cat.slug, isActive: cat.isActive ?? true });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const cat = await Category.findById(id).lean();
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const productCount = await Product.countDocuments({ category: cat._id });
  if (productCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${productCount} product(s) use this category. Reassign them first.` },
      { status: 400 }
    );
  }

  for (const img of cat.coverImages ?? []) {
    if (img.publicId) {
      try { await cloudinary.uploader.destroy(img.publicId); } catch { /* skip */ }
    }
  }
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
