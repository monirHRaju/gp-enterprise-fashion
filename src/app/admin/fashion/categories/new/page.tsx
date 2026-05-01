import CategoryForm from "@/components/admin/CategoryForm";

export default function NewFashionCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Add Fashion Category</h1>
        <p className="text-muted text-sm mt-0.5">e.g. T-Shirts, Pants, Shirts</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <CategoryForm apiBase="/api/fashion-categories" backHref="/admin/fashion/categories" />
      </div>
    </div>
  );
}
