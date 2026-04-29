import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Buyer from "@/lib/models/Buyer";
import BuyerForm from "@/components/admin/BuyerForm";
import type { IBuyer } from "@/types";

export default async function EditBuyerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const raw = await Buyer.findById(id).lean();
  if (!raw) notFound();

  const buyer: IBuyer = {
    _id: String(raw._id),
    name: raw.name,
    country: raw.country ?? "",
    logo: raw.logo?.url ? { url: raw.logo.url, publicId: raw.logo.publicId ?? "" } : undefined,
    order: raw.order ?? 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Edit Buyer</h1>
        <p className="text-muted text-sm mt-0.5">{buyer.name}</p>
      </div>
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6">
        <BuyerForm buyer={buyer} />
      </div>
    </div>
  );
}
