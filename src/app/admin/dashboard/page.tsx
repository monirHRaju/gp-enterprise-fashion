import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Buyer from "@/lib/models/Buyer";
import { FiBox, FiTag, FiUsers, FiStar, FiPlus } from "react-icons/fi";

async function getStats() {
  try {
    await connectDB();
    const [totalProducts, totalCategories, totalBuyers, newArrivals] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Buyer.countDocuments(),
        Product.countDocuments({ isNewArrival: true }),
      ]);
    return { totalProducts, totalCategories, totalBuyers, newArrivals };
  } catch {
    return { totalProducts: 0, totalCategories: 0, totalBuyers: 0, newArrivals: 0 };
  }
}

const STAT_CARDS = [
  {
    label: "Total Products",
    key: "totalProducts" as const,
    Icon: FiBox,
    color: "bg-forest text-cream",
    href: "/admin/products",
  },
  {
    label: "Categories",
    key: "totalCategories" as const,
    Icon: FiTag,
    color: "bg-primary text-primary-content",
    href: "/admin/categories",
  },
  {
    label: "Buyers",
    key: "totalBuyers" as const,
    Icon: FiUsers,
    color: "bg-secondary text-secondary-content",
    href: "/admin/buyers",
  },
  {
    label: "New Arrivals",
    key: "newArrivals" as const,
    Icon: FiStar,
    color: "bg-accent text-accent-content",
    href: "/admin/products?filter=new",
  },
];

const QUICK_ACTIONS = [
  { label: "Add Product", href: "/admin/products/new", Icon: FiBox },
  { label: "Add Category", href: "/admin/categories/new", Icon: FiTag },
];

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Welcome back to Grameen Admin.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STAT_CARDS.map(({ label, key, Icon, color, href }) => (
          <Link
            key={key}
            href={href}
            className="rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 bg-white border border-base-200 group"
          >
            <div className={`rounded-xl p-3 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-ink group-hover:text-primary transition-colors">
                {stats[key]}
              </p>
              <p className="text-sm text-muted">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="btn btn-primary gap-2"
            >
              <FiPlus className="h-4 w-4" />
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl border border-base-200 p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-ink mb-3">Site Overview</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>Manage products, categories, slider images, buyers, contact info, and page content from the sidebar.</li>
          <li>All changes reflect immediately on the public website.</li>
          <li>Product images are stored on Cloudinary.</li>
        </ul>
      </div>
    </div>
  );
}
