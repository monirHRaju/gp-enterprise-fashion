import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import CategoryGallery from "@/components/admin/CategoryGallery";

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const cat = await Category.findById(id).lean();
  if (!cat) notFound();

  return (
    <div className="space-y-4">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors">
        <FiArrowLeft className="h-4 w-4" /> Back to Products
      </Link>
      <CategoryGallery categoryId={id} categoryName={cat.name} />
    </div>
  );
}
