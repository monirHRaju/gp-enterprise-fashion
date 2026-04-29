"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import type { IBuyer, ImageAsset } from "@/types";

interface Props {
  buyer?: IBuyer;
}

export default function BuyerForm({ buyer }: Props) {
  const router = useRouter();
  const [name, setName] = useState(buyer?.name ?? "");
  const [country, setCountry] = useState(buyer?.country ?? "");
  const [logo, setLogo] = useState<ImageAsset | null>(buyer?.logo ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required."); return; }
    setSaving(true);
    setError("");

    const url = buyer ? `/api/buyers/${buyer._id}` : "/api/buyers";
    const method = buyer ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), country, logo }),
    });

    if (res.ok) {
      router.push("/admin/buyers");
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
          <span className="label-text font-medium">Buyer Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. H&M Group"
        />
      </div>

      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Country</span>
          <span className="label-text-alt text-muted">Optional</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="e.g. Sweden"
        />
      </div>

      <div className="form-control">
        <label className="label pb-1.5">
          <span className="label-text font-medium">Logo</span>
          <span className="label-text-alt text-muted">Single image, white background preferred</span>
        </label>
        <ImageUploader
          folder="grameen/buyers"
          multiple={false}
          existingImages={logo ? [logo] : []}
          onUpload={(assets) => setLogo(assets[0] ?? null)}
          onRemove={() => setLogo(null)}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving && <span className="loading loading-spinner loading-sm" />}
          {buyer ? "Update Buyer" : "Add Buyer"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
