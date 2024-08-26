import "server-only";

import { Box, Button, Stack, Typography } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";

import { cache } from "@/lib/cache";
import { getProducts } from "@/data/table";

import Block from "../Block";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCard";
import { Suspense } from "react";
import { Link } from "next-view-transitions";

const GAP = 4;
const decorationMap = ["left", "none", "right", "none", "right"] as const;
const gridTemplateAreas = `
"b0 b0 b0 a1 a1 a2 a2" 
"a0 a0 a0 a1 a1 a2 a2" 
"a0 a0 a0 a1 a1 a2 a2" 
"a0 a0 a0 a3 a3 a4 a4" 
"a0 a0 a0 a3 a3 a4 a4" 
"a0 a0 a0 a3 a3 a4 a4" 
`;

function IndexSectionWrapper({
  color,
  icon,
  title,
  children,
}: {
  color: "primary" | "secondary";
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas,
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: GAP,
      }}
    >
      <Block
        sx={{ gridArea: "b0" }}
        decoration="right"
        variant="contained"
        color={`${color}.main`}
      >
        <Stack
          direction="row"
          gap={GAP / 2}
          alignItems="center"
          sx={{ color: "text.primary" }}
          data-mui-color-scheme="dark"
        >
          {icon}

          <Typography variant="h5">{title}</Typography>

          <Button
            color="inherit"
            variant="outlined"
            endIcon={<KeyboardArrowRightRoundedIcon />}
            component={Link}
            href="/products"
          >
            View All
          </Button>
        </Stack>
      </Block>

      {children}
    </Box>
  );
}

const popularFetcher = cache(
  () => getProducts("popular", 5),
  ["/", "getProducts", "popular"],
  { revalidate: 60 * 60 }
);

export function PopularSection() {
  return (
    <IndexSectionWrapper
      color="primary"
      icon={<CelebrationRoundedIcon />}
      title="Most Popular"
    >
      <Suspense fallback={<ProductSkeletons color="primary" />}>
        <ProductCards
          color="primary"
          fetcher={popularFetcher}
          alert={({ orders }) => {
            if (!orders) return "Something went wrong. Please try again later.";
            return `This product has been sold ${orders.length} times!`;
          }}
        />
      </Suspense>
    </IndexSectionWrapper>
  );
}

const newestFetcher = cache(
  () => getProducts("newest", 5),
  ["/", "getProducts", "newest"],
  { revalidate: 60 * 60 }
);

export function NewestSection() {
  return (
    <IndexSectionWrapper
      color="secondary"
      icon={<NewReleasesRoundedIcon />}
      title="Newest Products"
    >
      <Suspense fallback={<ProductSkeletons color="secondary" />}>
        <ProductCards
          color="secondary"
          fetcher={newestFetcher}
          alert={({ createdAt }) =>
            `This product was added on ${new Date(
              createdAt
            ).toLocaleDateString()}`
          }
        />
      </Suspense>
    </IndexSectionWrapper>
  );
}

async function ProductCards({
  color,
  fetcher,
  alert,
}: {
  color: "primary" | "secondary";
  fetcher: () => ReturnType<typeof getProducts>;
  alert: (info: Awaited<ReturnType<typeof getProducts>>[0]) => string;
}) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 3750));

  return (await fetcher()).map((product, i) => (
    <Block
      key={product.id}
      sx={{ gridArea: `a${i}` }}
      decoration={decorationMap[i]}
      color={i === 0 ? `${color}.main` : undefined}
      SlotProps={{ childContainer: { sx: { p: 2.5 } } }}
    >
      <ProductCard
        {...product}
        color={color}
        isEllipsis={i !== 0}
        alert={i === 0 ? alert(product) : undefined}
      />
    </Block>
  ));
}

function ProductSkeletons({ color }: { color: "primary" | "secondary" }) {
  return Array.from({ length: 5 }).map((_, i) => (
    <Block
      key={i}
      sx={{ gridArea: `a${i}` }}
      decoration={decorationMap[i]}
      color={i === 0 ? `${color}.main` : undefined}
      SlotProps={{ childContainer: { sx: { p: 2.5 } } }}
    >
      <ProductCardSkeleton color={color} isEllipsis={i !== 0} />
    </Block>
  ));
}
