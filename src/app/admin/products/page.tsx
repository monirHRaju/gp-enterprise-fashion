"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { IProduct, ICategory } from "@/types";

const PAGE_SIZE = 10;

type ProductRow = IProduct & { category: ICategory };

export default function AdminProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const [products, setProducts] = useState<ProductRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/products?page=${page}&limit=${PAGE_SIZE}`);
    const data = await res.json();
    setProducts(data.products ?? []);
    setTotal(data.total ?? 0);
    setPages(data.pages ?? 1);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function toggleNewArrival(product: ProductRow) {
    const updated = !product.isNewArrival;
    setProducts((prev) =>
      prev.map((p) => (p._id === product._id ? { ...p, isNewArrival: updated } : p))
    );
    await fetch(`/api/products/${product._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isNewArrival: updated }),
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await fetch(`/api/products/${deleteTarget._id}`, { method: "DELETE" });
    setDeleteTarget(null);
    setDeleting(false);
    fetchProducts();
  }

  function goToPage(p: number) {
    router.push(`/admin/products?page=${p}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Products</h1>
          <p className="text-muted text-sm mt-0.5">{total} total</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary gap-2">
          <FiPlus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted">
            No products yet.{" "}
            <Link href="/admin/products/new" className="link link-primary">
              Add one
            </Link>
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>New Arrival</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-base-200 shrink-0">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-base-content/30 text-xs">
                          No img
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="font-medium text-ink max-w-xs truncate">{product.title}</td>
                  <td className="text-muted text-sm">
                    {typeof product.category === "object" ? product.category.name : "—"}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-sm"
                      checked={product.isNewArrival}
                      onChange={() => toggleNewArrival(product)}
                    />
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Edit"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Link>
                      <button
                        className="btn btn-ghost btn-sm btn-square text-error"
                        title="Delete"
                        onClick={() => setDeleteTarget(product)}
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

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-1">
          <button
            className="btn btn-sm btn-ghost"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            Prev
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`btn btn-sm ${p === page ? "btn-primary" : "btn-ghost"}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn btn-sm btn-ghost"
            disabled={page >= pages}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display font-bold text-lg">Delete Product</h3>
            <p className="py-4 text-muted">
              Delete <span className="font-semibold text-ink">{deleteTarget.title}</span>? This
              removes all images from Cloudinary and cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting && <span className="loading loading-spinner loading-sm" />}
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteTarget(null)} />
        </div>
      )}
    </div>
  );
}
