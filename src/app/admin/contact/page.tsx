"use client";

import { useState, useEffect, FormEvent } from "react";
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiMessageCircle } from "react-icons/fi";

const FIELDS = [
  { key: "phone", label: "Phone", Icon: FiPhone, placeholder: "+880 1712 345678", type: "tel" },
  { key: "email", label: "Email", Icon: FiMail, placeholder: "info@example.com", type: "email" },
  { key: "address", label: "Address", Icon: FiMapPin, placeholder: "123 Main St, Dhaka", type: "text" },
  { key: "facebook", label: "Facebook URL", Icon: FiFacebook, placeholder: "https://facebook.com/...", type: "url" },
  { key: "linkedin", label: "LinkedIn URL", Icon: FiLinkedin, placeholder: "https://linkedin.com/...", type: "url" },
  { key: "whatsapp", label: "WhatsApp Number", Icon: FiMessageCircle, placeholder: "+880 1712 345678", type: "tel" },
] as const;

type FormData = Record<"phone" | "email" | "address" | "facebook" | "linkedin" | "whatsapp", string>;

const EMPTY: FormData = { phone: "", email: "", address: "", facebook: "", linkedin: "", whatsapp: "" };

export default function AdminContactPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        if (data) setForm({ phone: data.phone ?? "", email: data.email ?? "", address: data.address ?? "", facebook: data.facebook ?? "", linkedin: data.linkedin ?? "", whatsapp: data.whatsapp ?? "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-48"><span className="loading loading-spinner loading-lg text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Contact Info</h1>
        <p className="text-muted text-sm mt-0.5">Shown on the public contact page and topbar.</p>
      </div>

      <div className="bg-white rounded-2xl border border-base-200 shadow-sm p-6 max-w-2xl">
        {saved && <div className="alert alert-success text-sm py-3 mb-5">Contact info saved.</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {FIELDS.map(({ key, label, Icon, placeholder, type }) => (
            <div key={key} className="form-control">
              <label className="label pb-1.5">
                <span className="label-text font-medium flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted" />{label}
                </span>
              </label>
              <input
                type={type}
                className="input input-bordered w-full"
                value={form[key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
              />
            </div>
          ))}
          <div className="pt-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving && <span className="loading loading-spinner loading-sm" />}
              Save Contact Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
