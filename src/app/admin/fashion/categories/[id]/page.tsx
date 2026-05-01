import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import FashionCategory from "@/lib/models/FashionCategory";
import CategoryForm from "@/components/admin/CategoryForm";
import type { ICategory } from "@/types";

export default async function EditFashionCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const raw = await FashionCategory.findById(id).lean();
  if (!raw) notFound();

  const category: ICategory = {
    _id: String(raw._id),
    name: raw.name,
    slug: raw.slug ?? "",
    description: raw.description ?? "",
    coverImages: (raw.coverImages ?? []).map((img: { url?: string; publicId?: string }) => ({
      url: img.url ?? "",
      publicId: img.publicId ?? "",
    })),
    isActive: raw.isActive ?? true,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Fashion Category</h1>
        <p className="text-muted text-sm mt-0.5">{category.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <CategoryForm
          category={category}
          apiBase="/api/fashion-categories"
          backHref="/admin/fashion/categories"
        />
      </div>
    </div>
  );
}
