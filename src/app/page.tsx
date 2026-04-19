import Topbar from "@/components/site/Topbar";
import Navbar from "@/components/site/Navbar";
import HeroSlider from "@/components/site/HeroSlider";
import CategoriesGrid from "@/components/site/CategoriesGrid";
import NewArrivalGrid from "@/components/site/NewArrivalGrid";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import BuyerMarquee from "@/components/site/BuyerMarquee";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-1">
        <HeroSlider />
        <CategoriesGrid />
        <NewArrivalGrid />
        <WhyChooseUs />
        <BuyerMarquee />
      </main>
      <Footer />
    </>
  );
}
