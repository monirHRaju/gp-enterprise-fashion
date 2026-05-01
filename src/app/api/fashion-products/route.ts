import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FashionProduct from "@/lib/models/FashionProduct";

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");
  const categorySlug = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") ?? "200");
  const page = parseInt(searchParams.get("page") ?? "1");

  const filter: Record<string, unknown> = {};
  if (categoryId) {
    filter.category = categoryId;
  } else if (categorySlug) {
    const { default: FashionCategory } = await import("@/lib/models/FashionCategory");
    const cat = await FashionCategory.findOne({ slug: categorySlug }).select("_id").lean();
    if (cat) filter.category = cat._id;
    else return NextResponse.json({ products: [], total: 0, page, pages: 0 });
  }

  const [products, total] = await Promise.all([
    FashionProduct.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    FashionProduct.countDocuments(filter),
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
    total, page, pages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const { title, images, category, isNewArrival } = await request.json();
  if (!title?.trim() || !category) return NextResponse.json({ error: "title and category required" }, { status: 400 });
  const product = await FashionProduct.create({ title: title.trim(), images: images ?? [], category, isNewArrival: isNewArrival ?? false });
  return NextResponse.json({ _id: String(product._id), title: product.title }, { status: 201 });
}
