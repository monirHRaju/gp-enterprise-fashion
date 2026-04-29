"use client";

import { useState, useEffect, FormEvent } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import type { ImageAsset } from "@/types";

type PageKey = "about" | "quality" | "home-features";

const TABS: { key: PageKey; label: string }[] = [
  { key: "about", label: "About Us" },
  { key: "quality", label: "Quality Policy" },
  { key: "home-features", label: "Home Features" },
];

interface PageData {
  title: string;
  body: string;
  images: ImageAsset[];
}

const EMPTY: PageData = { title: "", body: "", images: [] };

export default function AdminPagesPage() {
  const [activeTab, setActiveTab] = useState<PageKey>("about");
  const [pageData, setPageData] = useState<Record<PageKey, PageData>>({
    about: { ...EMPTY },
    quality: { ...EMPTY },
    "home-features": { ...EMPTY },
  });
  const [loadedTabs, setLoadedTabs] = useState<Set<PageKey>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loadedTabs.has(activeTab)) return;
    setLoading(true);
    fetch(`/api/pages/${activeTab}`)
      .then((r) => r.json())
      .then((data) => {
        setPageData((prev) => ({
          ...prev,
          [activeTab]: data ? { title: data.title ?? "", body: data.body ?? "", images: data.images ?? [] } : { ...EMPTY },
        }));
        setLoadedTabs((prev) => new Set([...prev, activeTab]));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeTab, loadedTabs]);

  function update(field: keyof PageData, value: PageData[keyof PageData]) {
    setPageData((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch(`/api/pages/${activeTab}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageData[activeTab]),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const current = pageData[activeTab];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Page Content</h1>
        <p className="text-muted text-sm mt-0.5">Edit content for public pages.</p>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`tab ${activeTab === key ? "tab-active" : ""}`}
            onClick={() => { setSaved(false); setActiveTab(key); }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6 max-w-2xl">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : (
          <>
            {saved && <div className="alert alert-success text-sm py-3 mb-5">Page content saved.</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label pb-1.5">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={current.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Page title or heading"
                />
              </div>

              <div className="form-control">
                <label className="label pb-1.5">
                  <span className="label-text font-medium">Body</span>
                  <span className="label-text-alt text-muted">Plain text or HTML</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full min-h-48 font-mono text-sm"
                  value={current.body}
                  onChange={(e) => update("body", e.target.value)}
                  placeholder="Page body content..."
                />
              </div>

              {activeTab !== "home-features" && (
                <div className="form-control">
                  <label className="label pb-1.5">
                    <span className="label-text font-medium">Images</span>
                  </label>
                  <ImageUploader
                    folder={`grameen/pages/${activeTab}`}
                    multiple
                    existingImages={current.images}
                    onUpload={(assets) => update("images", [...current.images, ...assets])}
                    onRemove={(publicId) =>
                      update("images", current.images.filter((img) => img.publicId !== publicId))
                    }
                  />
                </div>
              )}

              <div className="pt-2">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving && <span className="loading loading-spinner loading-sm" />}
                  Save {TABS.find((t) => t.key === activeTab)?.label}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
