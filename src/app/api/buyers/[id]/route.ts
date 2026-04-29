import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Buyer from "@/lib/models/Buyer";
import cloudinary from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const body = await request.json();
  const allowed = ["name", "country", "logo", "order"];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) update[key] = body[key];
  }
  const buyer = await Buyer.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!buyer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ _id: String(buyer._id), name: buyer.name, country: buyer.country, logo: buyer.logo, order: buyer.order });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  await connectDB();
  const buyer = await Buyer.findById(id).lean();
  if (!buyer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (buyer.logo?.publicId) {
    try { await cloudinary.uploader.destroy(buyer.logo.publicId); } catch { /* skip */ }
  }
  await Buyer.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
