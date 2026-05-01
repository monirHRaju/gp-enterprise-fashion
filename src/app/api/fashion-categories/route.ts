import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FashionCategory from "@/lib/models/FashionCategory";

export async function GET() {
  await connectDB();
  const cats = await FashionCategory.find().sort({ name: 1 }).lean();
  return NextResponse.json(
    cats.map((c) => ({
      _id: String(c._id),
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      coverImages: c.coverImages ?? [],
      isActive: c.isActive ?? true,
    }))
  );
}

export async function POST(request: NextRequest) {
  await connectDB();
  const { name, description, coverImages } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  try {
    const cat = await FashionCategory.create({
      name: name.trim(),
      description: description ?? "",
      coverImages: coverImages ?? [],
    });
    return NextResponse.json({ _id: String(cat._id), name: cat.name, slug: cat.slug }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A category with a similar name already exists." }, { status: 409 });
    }
    throw err;
  }
}
