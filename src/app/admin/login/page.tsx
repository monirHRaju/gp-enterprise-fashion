"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative h-16 w-16 mb-4">
            <Image src="/grameen-logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">Admin Panel</h1>
          <p className="text-muted text-sm mt-1">Grameen Enterprise and Fashion</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-base-200 p-8">
          <h2 className="font-display text-xl font-semibold text-ink mb-6">Sign in</h2>

          {error && (
            <div className="alert alert-error mb-5 text-sm py-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FiMail className="h-4 w-4 text-muted shrink-0" />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="grow"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text font-medium">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FiLock className="h-4 w-4 text-muted shrink-0" />
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="grow"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <FiLogIn className="h-4 w-4" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
