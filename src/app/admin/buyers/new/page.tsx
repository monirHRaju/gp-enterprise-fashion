import BuyerForm from "@/components/admin/BuyerForm";

export default function NewBuyerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Add Buyer</h1>
        <p className="text-muted text-sm mt-0.5">Add a buyer with logo and country.</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <BuyerForm />
      </div>
    </div>
  );
}
