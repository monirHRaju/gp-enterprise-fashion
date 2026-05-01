import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { connectDB } from "@/lib/mongodb";
import FashionCategory from "@/lib/models/FashionCategory";
import CategoryGallery from "@/components/admin/CategoryGallery";

export default async function FashionCategoryProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const cat = await FashionCategory.findById(id).lean();
  if (!cat) notFound();

  return (
    <div className="space-y-4">
      <Link href="/admin/fashion/products" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors">
        <FiArrowLeft className="h-4 w-4" /> Back to Fashion Products
      </Link>
      <CategoryGallery
        categoryId={id}
        categoryName={cat.name}
        apiBase="/api/fashion-products"
      />
    </div>
  );
}
