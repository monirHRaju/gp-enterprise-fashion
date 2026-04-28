import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json([]);

  await connectDB();
  const regex = { $regex: q, $options: "i" };

  const [products, categories] = await Promise.all([
    Product.find({ title: regex })
      .populate("category", "name slug")
      .select("title images category")
      .limit(6)
      .lean(),
    Category.find({ name: regex })
      .select("name slug coverImages")
      .limit(3)
      .lean(),
  ]);

  const results = [
    ...products.map((p) => ({
      id: String(p._id),
      type: "product" as const,
      title: p.title,
      thumbnail: p.images?.[0]?.url ?? "",
      subtitle: (p.category as { name?: string })?.name ?? "",
      href: `/products?category=${(p.category as { slug?: string })?.slug ?? ""}`,
    })),
    ...categories.map((c) => ({
      id: String(c._id),
      type: "category" as const,
      title: c.name,
      thumbnail: c.coverImages?.[0]?.url ?? "",
      subtitle: "Category",
      href: `/products?category=${c.slug}`,
    })),
  ];

  return NextResponse.json(results);
}
