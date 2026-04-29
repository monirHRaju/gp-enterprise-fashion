import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PageContent from "@/lib/models/PageContent";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;
  await connectDB();
  const { title, body, images } = await request.json();
  const doc = await PageContent.findOneAndUpdate(
    { page },
    { title: title ?? "", body: body ?? "", images: images ?? [] },
    { upsert: true, new: true }
  ).lean();
  return NextResponse.json({ _id: String(doc!._id), page: doc!.page, title: doc!.title, body: doc!.body, images: doc!.images });
}

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
