"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";

interface Slide {
  _id: string;
  imageUrl: string;
  publicId: string;
  order: number;
}

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Slide | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/slider");
    const data = await res.json();
    setSlides(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlides(); }, [fetchSlides]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "grameen/slider");

    const upRes = await fetch("/api/upload", { method: "POST", body: fd });
    const { url, publicId } = await upRes.json();
    if (!url) { setUploading(false); return; }

    await fetch("/api/slider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url, publicId }),
    });

    setUploading(false);
    fetchSlides();
  }

  async function moveSlide(index: number, dir: -1 | 1) {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const a = slides[index];
    const b = slides[newIndex];
    await Promise.all([
      fetch(`/api/slider/${a._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: b.order }) }),
      fetch(`/api/slider/${b._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: a.order }) }),
    ]);
    fetchSlides();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/slider/${deleteTarget._id}`, { method: "DELETE" });
    setDeleteTarget(null);
    setDeleting(false);
    fetchSlides();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Slider</h1>
          <p className="text-muted text-sm mt-0.5">{slides.length} slide{slides.length !== 1 ? "s" : ""}</p>
        </div>
        <label className={`btn btn-primary gap-2 cursor-pointer ${uploading ? "btn-disabled" : ""}`}>
          {uploading ? <span className="loading loading-spinner loading-sm" /> : "+ Upload Slide"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : slides.length === 0 ? (
        <div className="bg-white rounded-2xl border border-base-200 shadow-sm text-center py-16 text-muted">
          No slides yet. Upload one above.
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide, index) => (
            <div key={slide._id} className="bg-white rounded-2xl border border-base-200 shadow-sm flex items-center gap-4 p-4">
              <div className="relative h-20 w-36 rounded-xl overflow-hidden bg-base-200 shrink-0">
                <Image src={slide.imageUrl} alt={`Slide ${index + 1}`} fill className="object-cover" sizes="144px" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">Slide {index + 1}</p>
                <p className="text-xs text-muted font-mono truncate max-w-xs">{slide.publicId}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => moveSlide(index, -1)}
                  disabled={index === 0}
                  title="Move up"
                >
                  <FiChevronUp className="h-4 w-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => moveSlide(index, 1)}
                  disabled={index === slides.length - 1}
                  title="Move down"
                >
                  <FiChevronDown className="h-4 w-4" />
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-square text-error"
                  onClick={() => setDeleteTarget(slide)}
                  title="Delete"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display font-bold text-lg">Delete Slide</h3>
            <p className="py-4 text-muted">Remove this slide? Image will be deleted from Cloudinary.</p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</button>
              <button className="btn btn-error" onClick={confirmDelete} disabled={deleting}>
                {deleting && <span className="loading loading-spinner loading-sm" />}Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteTarget(null)} />
        </div>
      )}
    </div>
  );
}
