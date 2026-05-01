import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import FashionCategory from "@/lib/models/FashionCategory";
import FashionProduct from "@/lib/models/FashionProduct";
import { FiFolder, FiChevronRight } from "react-icons/fi";

async function getCategoryStats() {
  await connectDB();
  const [categories, counts] = await Promise.all([
    FashionCategory.find().sort({ name: 1 }).lean(),
    FashionProduct.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
  ]);
  const countMap = Object.fromEntries(counts.map((d) => [String(d._id), d.count as number]));
  return categories.map((c) => ({
    _id: String(c._id),
    name: c.name,
    isActive: c.isActive ?? true,
    coverImage: (c.coverImages as { url?: string }[])?.[0]?.url ?? null,
    productCount: countMap[String(c._id)] ?? 0,
  }));
}

export default async function AdminFashionProductsPage() {
  const categories = await getCategoryStats();
  const total = categories.reduce((s, c) => s + c.productCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Fashion Products</h1>
          <p className="text-muted text-sm mt-0.5">{total} products across {categories.length} categories</p>
        </div>
        <Link href="/admin/fashion/categories/new" className="btn btn-ghost btn-sm gap-2">+ Add Category</Link>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-base-200 shadow-sm text-center py-16 text-muted">
          No fashion categories yet.{" "}
          <Link href="/admin/fashion/categories/new" className="link link-primary">Create one</Link> first.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/admin/fashion/products/category/${cat._id}`}
              className={`group bg-white rounded-2xl border border-base-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex items-center gap-4 p-4 ${!cat.isActive ? "opacity-50" : ""}`}
            >
              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-base-200 shrink-0">
                {cat.coverImage ? (
                  <Image src={cat.coverImage} alt={cat.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FiFolder className="h-6 w-6 text-base-content/30" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink truncate group-hover:text-primary transition-colors">{cat.name}</p>
                <p className="text-sm text-muted mt-0.5">
                  {cat.productCount} product{cat.productCount !== 1 ? "s" : ""}
                  {!cat.isActive && <span className="ml-2 text-xs text-warning">(inactive)</span>}
                </p>
              </div>
              <FiChevronRight className="h-5 w-5 text-muted group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
