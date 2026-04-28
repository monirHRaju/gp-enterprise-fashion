import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Buyer from "@/lib/models/Buyer";

export async function GET() {
  await connectDB();
  const buyers = await Buyer.find().sort({ order: 1 }).lean();
  return NextResponse.json(
    buyers.map((b) => ({
      _id: String(b._id),
      name: b.name,
      country: b.country ?? "",
      logo: b.logo ?? null,
      order: b.order,
    }))
  );
}
