import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/data/table";
import type { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        fetcher={() => getProducts("popular")}
      />
      <ProductGridSection
        title="Newest Products"
        fetcher={() => getProducts("newest")}
      />
    </main>
  );
}

function ProductGridSection({
  title,
  fetcher,
}: {
  title: string;
  fetcher: () => Promise<Product[]>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl">{title}</h2>
        <Button asChild variant="outline">
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense fetcher={fetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  fetcher,
}: {
  fetcher: () => Promise<Product[]>;
}) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500));
  return (await fetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
