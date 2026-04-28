import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Add Product</h1>
        <p className="text-muted text-sm mt-0.5">Fill in details and upload images.</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  );
}
