import "server-only";

import { Suspense } from "react";
import { cache } from "@/lib/cache";
import { getProducts } from "@/data/table";

import Block from "../Block";
import { Box } from "@mui/material";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

export function ProductsSection() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      <Suspense fallback={<ProductSkeletons />}>
        <ProductCards />
      </Suspense>
    </Box>
  );
}

const productsFetcher = cache(
  () => getProducts("all"),
  ["/products", "getProducts", "all"]
);

async function ProductCards() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500));
  return (await productsFetcher()).map((product) => (
    <Block
      key={product.id}
      decoration="none"
      SlotProps={{ childContainer: { sx: { p: 2.5 } } }}
    >
      <ProductCard key={product.id} {...product} isEllipsis />
    </Block>
  ));
}

function ProductSkeletons() {
  return Array.from({ length: 5 }, (_, i) => (
    <Block
      key={i}
      decoration="none"
      SlotProps={{ childContainer: { sx: { p: 2.5 } } }}
    >
      <ProductCardSkeleton isEllipsis />
    </Block>
  ));
}
