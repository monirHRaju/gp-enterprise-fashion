import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export async function POST(request: NextRequest) {
  await connectDB();
  const { title, images, category, isNewArrival } = await request.json();
  if (!title?.trim() || !category) {
    return NextResponse.json({ error: "title and category required" }, { status: 400 });
  }
  const product = await Product.create({
    title: title.trim(),
    images: images ?? [],
    category,
    isNewArrival: isNewArrival ?? false,
  });
  return NextResponse.json({ _id: String(product._id), title: product.title }, { status: 201 });
}

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const isNewArrival = searchParams.get("isNewArrival");
  const categorySlug = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") ?? "50");
  const page = parseInt(searchParams.get("page") ?? "1");

  const filter: Record<string, unknown> = {};
  if (isNewArrival === "true") filter.isNewArrival = true;

  if (categorySlug) {
    const cat = await Category.findOne({ slug: categorySlug }).select("_id").lean();
    if (cat) filter.category = cat._id;
    else return NextResponse.json({ products: [], total: 0, page, pages: 0 });
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  return NextResponse.json({
    products: products.map((p) => ({
      _id: String(p._id),
      title: p.title,
      images: p.images ?? [],
      category: p.category,
      isNewArrival: p.isNewArrival,
      createdAt: p.createdAt,
    })),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
