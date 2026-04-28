"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import type { IProduct, ICategory, ImageAsset } from "@/types";

interface Props {
  product?: IProduct;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(product?.title ?? "");
  const [categoryId, setCategoryId] = useState(() => {
    if (!product) return "";
    return typeof product.category === "string"
      ? product.category
      : (product.category as ICategory)._id;
  });
  const [isNewArrival, setIsNewArrival] = useState(product?.isNewArrival ?? false);
  const [images, setImages] = useState<ImageAsset[]>(product?.images ?? []);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : data.categories ?? []));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !categoryId) {
      setError("Title and category are required.");
      return;
    }
    setSaving(true);
    setError("");

    const url = product ? `/api/products/${product._id}` : "/api/products";
    const method = product ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), category: categoryId, isNewArrival, images }),
    });

    if (res.ok) {
      router.push("/admin/products");
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

      {/* Title */}
      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Product Title</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Elastic Waistband"
        />
      </div>

      {/* Category */}
      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Category</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select category...</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* New Arrival */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isNewArrival}
            onChange={(e) => setIsNewArrival(e.target.checked)}
          />
          <span className="label-text font-medium">Mark as New Arrival</span>
        </label>
      </div>

      {/* Images */}
      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Product Images</span>
        </label>
        <ImageUploader
          folder="grameen/products"
          multiple
          existingImages={images}
          onUpload={(assets) => setImages((prev) => [...prev, ...assets])}
          onRemove={(publicId) =>
            setImages((prev) => prev.filter((img) => img.publicId !== publicId))
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving && <span className="loading loading-spinner loading-sm" />}
          {product ? "Update Product" : "Create Product"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
