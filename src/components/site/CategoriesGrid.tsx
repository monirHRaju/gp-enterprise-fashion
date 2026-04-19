import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/mock";

export default function CategoriesGrid() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-base-100">
      <Container>
        <SectionHeading
          eyebrow="What we make"
          title="Our Categories"
          subtitle="Explore our full range of premium garments accessories crafted for leading apparel brands."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <CategoryCard key={c.slug} category={c} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  );
}
