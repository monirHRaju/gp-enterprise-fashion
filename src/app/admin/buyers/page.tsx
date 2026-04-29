"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { IBuyer } from "@/types";

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<IBuyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<IBuyer | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBuyers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/buyers");
    const data = await res.json();
    setBuyers(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBuyers(); }, [fetchBuyers]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/buyers/${deleteTarget._id}`, { method: "DELETE" });
    setDeleteTarget(null);
    setDeleting(false);
    fetchBuyers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Buyers</h1>
          <p className="text-muted text-sm mt-0.5">{buyers.length} total</p>
        </div>
        <Link href="/admin/buyers/new" className="btn btn-primary gap-2">
          <FiPlus className="h-4 w-4" /> Add Buyer
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : buyers.length === 0 ? (
          <div className="text-center py-16 text-muted">
            No buyers yet.{" "}
            <Link href="/admin/buyers/new" className="link link-primary">Add one</Link>
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Country</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer._id}>
                  <td>
                    <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-base-200">
                      {buyer.logo?.url ? (
                        <Image src={buyer.logo.url} alt={buyer.name} fill className="object-contain p-1" sizes="80px" />
                      ) : (
                        <span className="flex h-full items-center justify-center text-base-content/30 text-xs">None</span>
                      )}
                    </div>
                  </td>
                  <td className="font-medium text-ink">{buyer.name}</td>
                  <td className="text-sm text-muted">{buyer.country || "—"}</td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/buyers/${buyer._id}`} className="btn btn-ghost btn-sm btn-square" title="Edit">
                        <FiEdit2 className="h-4 w-4" />
                      </Link>
                      <button
                        className="btn btn-ghost btn-sm btn-square text-error"
                        onClick={() => setDeleteTarget(buyer)}
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display font-bold text-lg">Delete Buyer</h3>
            <p className="py-4 text-muted">
              Delete <span className="font-semibold text-ink">{deleteTarget.name}</span>?
              Logo will be removed from Cloudinary.
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
