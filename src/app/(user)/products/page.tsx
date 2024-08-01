import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { getProducts } from "@/data/table";
import { cache } from "@/lib/cache";
import type { Product } from "@prisma/client";
import { Suspense } from "react";

const productsFetcher = cache(
  () => getProducts("all"),
  ["/products", "getProducts", "all"]
);

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense fetcher={productsFetcher} />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense({
  fetcher,
}: {
  fetcher: () => Promise<Product[]>;
}) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500));
  return (await fetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
