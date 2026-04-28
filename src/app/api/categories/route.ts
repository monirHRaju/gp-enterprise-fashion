import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";

export async function GET() {
  await connectDB();
  const cats = await Category.find().lean();
  return NextResponse.json(
    cats.map((c) => ({
      _id: String(c._id),
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      coverImages: c.coverImages ?? [],
    }))
  );
}
