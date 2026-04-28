import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import ProductForm from "@/components/admin/ProductForm";
import type { IProduct, ICategory } from "@/types";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const raw = await Product.findById(id).populate("category", "name slug").lean();
  if (!raw) notFound();

  const cat = raw.category as { _id: unknown; name: string; slug: string } | null;

  const product: IProduct = {
    _id: String(raw._id),
    title: raw.title,
    images: (raw.images ?? []).map((img) => ({
      url: img.url ?? "",
      publicId: img.publicId ?? "",
    })),
    category: cat
      ? ({ _id: String(cat._id), name: cat.name, slug: cat.slug, coverImages: [] } as ICategory)
      : "",
    isNewArrival: raw.isNewArrival ?? false,
    createdAt: raw.createdAt?.toISOString() ?? "",
    updatedAt: raw.updatedAt?.toISOString() ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Product</h1>
        <p className="text-muted text-sm mt-0.5 truncate max-w-md">{product.title}</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
