import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "grameen/uploads";

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, res) => {
          if (error || !res) return reject(error);
          resolve(res);
        })
        .end(buffer);
    }
  );

  return Response.json({ url: result.secure_url, publicId: result.public_id });
}

export async function DELETE(request: NextRequest) {
  const { publicId } = await request.json();

  if (!publicId) {
    return Response.json({ error: "No publicId provided" }, { status: 400 });
  }

  await cloudinary.uploader.destroy(publicId);
  return Response.json({ success: true });
}
