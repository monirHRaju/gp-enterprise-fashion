"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import type { ICategory, ImageAsset } from "@/types";

interface Props {
  category?: ICategory;
}

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export default function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [coverImages, setCoverImages] = useState<ImageAsset[]>(category?.coverImages ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required."); return; }
    setSaving(true);
    setError("");

    const url = category ? `/api/categories/${category._id}` : "/api/categories";
    const method = category ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), description, coverImages }),
    });

    if (res.ok) {
      router.push("/admin/categories");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="alert alert-error text-sm py-3">{error}</div>}

      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Category Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Elastic Products"
        />
        {name && (
          <p className="text-xs text-muted mt-1.5">
            Slug: <span className="font-mono">{toSlug(name)}</span>
          </p>
        )}
      </div>

      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Description</span>
          <span className="label-text-alt text-muted">Optional</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full min-h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of this category..."
        />
      </div>

      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Cover Images</span>
          <span className="label-text-alt text-muted">Shown in category card slider</span>
        </label>
        <ImageUploader
          folder="grameen/categories"
          multiple
          existingImages={coverImages}
          onUpload={(assets) => setCoverImages((prev) => [...prev, ...assets])}
          onRemove={(publicId) =>
            setCoverImages((prev) => prev.filter((img) => img.publicId !== publicId))
          }
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving && <span className="loading loading-spinner loading-sm" />}
          {category ? "Update Category" : "Create Category"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
