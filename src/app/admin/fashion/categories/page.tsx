"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { ICategory } from "@/types";

export default function AdminFashionCategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/fashion-categories").then((r) => r.json());
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  async function toggleActive(cat: ICategory) {
    const next = !(cat.isActive ?? true);
    setCategories((prev) => prev.map((c) => (c._id === cat._id ? { ...c, isActive: next } : c)));
    await fetch(`/api/fashion-categories/${cat._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: next }),
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true); setDeleteError("");
    const res = await fetch(`/api/fashion-categories/${deleteTarget._id}`, { method: "DELETE" });
    if (res.ok) { setDeleteTarget(null); fetchCategories(); }
    else { const d = await res.json().catch(() => ({})); setDeleteError(d.error ?? "Failed to delete."); }
    setDeleting(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Fashion Categories</h1>
          <p className="text-muted text-sm mt-0.5">{categories.length} total</p>
        </div>
        <Link href="/admin/fashion/categories/new" className="btn btn-primary gap-2">
          <FiPlus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48"><span className="loading loading-spinner loading-lg text-primary" /></div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-muted">No fashion categories yet. <Link href="/admin/fashion/categories/new" className="link link-primary">Add one</Link></div>
        ) : (
          <table className="table table-zebra w-full">
            <thead><tr><th>Cover</th><th>Name</th><th>Slug</th><th>Active</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {categories.map((cat) => {
                const active = cat.isActive ?? true;
                return (
                  <tr key={cat._id} className={active ? "" : "opacity-50"}>
                    <td>
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-base-200">
                        {cat.coverImages?.[0]?.url
                          ? <Image src={cat.coverImages[0].url} alt={cat.name} fill className="object-cover" sizes="64px" />
                          : <span className="flex h-full items-center justify-center text-base-content/30 text-xs">None</span>}
                      </div>
                    </td>
                    <td className="font-medium text-ink">{cat.name}</td>
                    <td className="font-mono text-xs text-muted">{cat.slug}</td>
                    <td>
                      <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={active} onChange={() => toggleActive(cat)} />
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/fashion/categories/${cat._id}`} className="btn btn-ghost btn-sm btn-square"><FiEdit2 className="h-4 w-4" /></Link>
                        <button className="btn btn-ghost btn-sm btn-square text-error" onClick={() => { setDeleteError(""); setDeleteTarget(cat); }}><FiTrash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display font-bold text-lg">Delete Fashion Category</h3>
            <p className="py-4 text-muted">Delete <span className="font-semibold text-ink">{deleteTarget.name}</span>?</p>
            {deleteError && <div className="alert alert-error text-sm py-2 mb-2">{deleteError}</div>}
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
