import type { ReactNode } from "react";
import Topbar from "@/components/site/Topbar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
