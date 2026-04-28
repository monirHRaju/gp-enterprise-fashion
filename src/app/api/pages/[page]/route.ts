import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/pages/[page]">
) {
  const { page } = await ctx.params;
  await connectDB();
  const doc = await PageContent.findOne({ page }).lean();
  if (!doc) return NextResponse.json(null);
  return NextResponse.json({
    _id: String(doc._id),
    page: doc.page,
    title: doc.title ?? "",
    body: doc.body ?? "",
    images: doc.images ?? [],
  });
}
