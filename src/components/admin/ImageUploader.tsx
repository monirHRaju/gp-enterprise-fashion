"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";
import type { ImageAsset } from "@/types";

interface Props {
  folder?: string;
  multiple?: boolean;
  onUpload: (assets: ImageAsset[]) => void;
  existingImages?: ImageAsset[];
  onRemove?: (publicId: string) => void;
}

export default function ImageUploader({
  folder = "grameen/uploads",
  multiple = false,
  onUpload,
  existingImages = [],
  onRemove,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);
    if (!fileArray.length) return;

    setUploading(true);
    const results: ImageAsset[] = [];

    for (const file of fileArray) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) results.push({ url: data.url, publicId: data.publicId });
    }

    setUploading(false);
    if (results.length) onUpload(results);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(e.dataTransfer.files);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) uploadFiles(e.target.files);
    e.target.value = "";
  }

  async function handleRemove(publicId: string) {
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
    onRemove?.(publicId);
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-box p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-base-300 hover:border-primary/50"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
        <FiUploadCloud className="mx-auto mb-2 text-3xl text-base-content/40" />
        {uploading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            <p className="text-sm font-medium">Drop images here or click to browse</p>
            <p className="text-xs text-base-content/50 mt-1">
              {multiple ? "Multiple files supported" : "Single file only"} · JPG, PNG, WEBP
            </p>
          </>
        )}
      </div>

      {/* Previews */}
      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {existingImages.map((img) => (
            <div key={img.publicId} className="relative w-20 h-20 rounded-box overflow-hidden group">
              <Image src={img.url} alt="" fill className="object-cover" />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => handleRemove(img.publicId)}
                  className="absolute top-0.5 right-0.5 btn btn-xs btn-circle btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
