import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Add Category</h1>
        <p className="text-muted text-sm mt-0.5">Slug is auto-generated from the name.</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <CategoryForm />
      </div>
    </div>
  );
}
