"use client";

import { useState, useEffect, useCallback, useRef, KeyboardEvent, DragEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiUploadCloud, FiX, FiCheck, FiEdit2, FiPlus } from "react-icons/fi";

interface Product {
  _id: string;
  title: string;
  images: { url: string; publicId: string }[];
  isNewArrival: boolean;
}

interface PendingItem {
  localId: string;
  file: File;
  previewUrl: string;
  title: string;
  uploading: boolean;
  uploadedUrl?: string;
  uploadedPublicId?: string;
  error?: string;
}

interface Props {
  categoryId: string;
  categoryName: string;
  apiBase?: string; // default: "/api/products"
}

// ── Inline-editable title ─────────────────────────────────────────
function TitleEditor({
  productId,
  initialTitle,
  onSaved,
  apiBase,
}: {
  productId: string;
  initialTitle: string;
  onSaved: (newTitle: string) => void;
  apiBase: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  async function save() {
    const trimmed = value.trim();
    if (!trimmed) { setValue(initialTitle); setEditing(false); return; }
    if (trimmed === initialTitle) { setEditing(false); return; }
    setSaving(true);
    await fetch(`${apiBase}/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
    setSaving(false);
    setEditing(false);
    onSaved(trimmed);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") { setValue(initialTitle); setEditing(false); }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 mt-2">
        <input
          ref={inputRef}
          className="input input-xs input-bordered flex-1 min-w-0 text-xs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={handleKey}
          disabled={saving}
        />
        {saving && <span className="loading loading-spinner loading-xs" />}
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-1 mt-2 group/title cursor-pointer"
      onClick={() => setEditing(true)}
      title="Click to edit title"
    >
      <p className="text-xs text-ink font-medium leading-tight line-clamp-2 flex-1">{value}</p>
      <FiEdit2 className="h-3 w-3 text-muted shrink-0 opacity-0 group-hover/title:opacity-100 transition-opacity mt-0.5" />
    </div>
  );
}

// ── Bulk upload section ───────────────────────────────────────────
function BulkUpload({
  categoryId,
  onDone,
  apiBase,
}: {
  categoryId: string;
  onDone: () => void;
  apiBase: string;
}) {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function fileNameToTitle(name: string) {
    return name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  async function uploadItem(localId: string, file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "grameen/products");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      setItems((prev) =>
        prev.map((it) =>
          it.localId === localId
            ? { ...it, uploading: false, uploadedUrl: data.url, uploadedPublicId: data.publicId }
            : it
        )
      );
    } catch {
      setItems((prev) =>
        prev.map((it) =>
          it.localId === localId ? { ...it, uploading: false, error: "Upload failed" } : it
        )
      );
    }
  }

  function addFiles(files: FileList | File[]) {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newItems: PendingItem[] = arr.map((file) => ({
      localId: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      title: fileNameToTitle(file.name),
      uploading: true,
    }));
    setItems((prev) => [...prev, ...newItems]);
    newItems.forEach((it) => uploadItem(it.localId, it.file));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  function removeItem(localId: string) {
    setItems((prev) => prev.filter((it) => it.localId !== localId));
  }

  async function saveAll() {
    const ready = items.filter((it) => it.uploadedUrl && !it.error);
    if (!ready.length) return;
    setSaving(true);
    await Promise.all(
      ready.map((it) =>
        fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: it.title.trim() || it.file.name,
            category: categoryId,
            images: [{ url: it.uploadedUrl, publicId: it.uploadedPublicId }],
            isNewArrival: false,
          }),
        })
      )
    );
    setSaving(false);
    setItems([]);
    onDone();
  }

  const allUploaded = items.length > 0 && items.every((it) => !it.uploading);
  const readyCount = items.filter((it) => it.uploadedUrl && !it.error).length;

  return (
    <div className="bg-white rounded-2xl border border-primary/20 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-ink">Bulk Add Products</h2>
        <p className="text-xs text-muted">Each image = one product</p>
      </div>

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-base-300 hover:border-primary/50"
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
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files) { addFiles(e.target.files); e.target.value = ""; } }}
        />
        <FiUploadCloud className="mx-auto mb-2 h-8 w-8 text-base-content/30" />
        <p className="text-sm font-medium text-ink">Drop images here or click to browse</p>
        <p className="text-xs text-muted mt-1">Select as many as you want — all upload at once</p>
      </div>

      {/* Pending items */}
      {items.length > 0 && (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {items.map((it) => (
            <div key={it.localId} className="flex items-center gap-3 bg-base-100 rounded-xl p-2">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                <Image src={it.previewUrl} alt="" fill className="object-cover" sizes="48px" />
                {it.uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="loading loading-spinner loading-xs text-white" />
                  </div>
                )}
                {it.uploadedUrl && !it.error && (
                  <div className="absolute bottom-0.5 right-0.5 bg-success rounded-full p-0.5">
                    <FiCheck className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
              <input
                className="input input-xs input-bordered flex-1 min-w-0"
                value={it.title}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((p) => (p.localId === it.localId ? { ...p, title: e.target.value } : p))
                  )
                }
                placeholder="Product title"
              />
              {it.error && <span className="text-xs text-error shrink-0">Failed</span>}
              <button
                type="button"
                className="btn btn-ghost btn-xs btn-square shrink-0"
                onClick={() => removeItem(it.localId)}
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Save */}
      {items.length > 0 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted">
            {allUploaded ? `${readyCount} ready to save` : "Uploading…"}
          </p>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={() => setItems([])} disabled={saving}>
              Clear
            </button>
            <button
              className="btn btn-primary btn-sm gap-1"
              onClick={saveAll}
              disabled={!allUploaded || readyCount === 0 || saving}
            >
              {saving && <span className="loading loading-spinner loading-xs" />}
              Save {readyCount} Product{readyCount !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main gallery ──────────────────────────────────────────────────
export default function CategoryGallery({ categoryId, categoryName, apiBase = "/api/products" }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${apiBase}?categoryId=${categoryId}&limit=200`);
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }, [categoryId]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function updateTitle(id: string, newTitle: string) {
    setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, title: newTitle } : p)));
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`${apiBase}/${deleteTarget._id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    setDeleteTarget(null);
    setDeleting(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{categoryName}</h1>
          <p className="text-muted text-sm mt-0.5">{products.length} products</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/products/new`} className="btn btn-ghost btn-sm gap-1">
            <FiEdit2 className="h-4 w-4" /> Add (Form)
          </Link>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setBulkOpen((v) => !v)}
          >
            <FiPlus className="h-4 w-4" />
            {bulkOpen ? "Hide Uploader" : "Bulk Upload"}
          </button>
        </div>
      </div>

      {/* Bulk upload panel */}
      {bulkOpen && (
        <BulkUpload
          categoryId={categoryId}
          onDone={() => { fetchProducts(); setBulkOpen(false); }}
          apiBase={apiBase}
        />
      )}

      {/* Gallery */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-base-200 shadow-sm text-center py-16 text-muted">
          No products yet.{" "}
          <button className="link link-primary" onClick={() => setBulkOpen(true)}>
            Upload some
          </button>
          .
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product._id} className="group relative bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden">
              {/* Image */}
              <div className="relative aspect-square bg-base-200">
                {product.images?.[0]?.url ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-base-content/20 text-xs">
                    No image
                  </div>
                )}
                {/* Delete button — visible on hover */}
                <button
                  className="absolute top-1.5 right-1.5 btn btn-xs btn-circle btn-error opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  onClick={() => setDeleteTarget(product)}
                  title="Delete"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
                {/* isNewArrival badge */}
                {product.isNewArrival && (
                  <span className="absolute bottom-1.5 left-1.5 badge badge-sm badge-primary">New</span>
                )}
              </div>

              {/* Title — inline editable */}
              <div className="px-3 pb-3">
                <TitleEditor
                  productId={product._id}
                  initialTitle={product.title}
                  onSaved={(t) => updateTitle(product._id, t)}
                  apiBase={apiBase}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display font-bold text-lg">Delete Product</h3>
            <p className="py-4 text-muted">
              Delete <span className="font-semibold text-ink">{deleteTarget.title}</span>?
              Removes image from Cloudinary.
            </p>
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
