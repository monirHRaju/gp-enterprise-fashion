import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Buyer from "@/lib/models/Buyer";

export async function POST(request: NextRequest) {
  await connectDB();
  const { name, country, logo } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const count = await Buyer.countDocuments();
  const buyer = await Buyer.create({ name: name.trim(), country: country ?? "", logo: logo ?? null, order: count });
  return NextResponse.json({ _id: String(buyer._id), name: buyer.name }, { status: 201 });
}

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
