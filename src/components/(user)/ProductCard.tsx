import "server-only";

import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";

import Image from "next/image";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { Alert, Chip } from "@mui/material";
import { Link } from "next-view-transitions";

const GAP = 1.5;

function CardMedia({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: "16/9",
        height: "auto",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

export function ProductCard({
  alert,
  color,
  isEllipsis,
  ...product
}: {
  alert?: string;
  color?: "primary" | "secondary";
  isEllipsis?: boolean;
} & Product) {
  const { id, name, description, priceInCents, imagePath } = product;

  return (
    <Stack gap={GAP} sx={{ height: 1 }}>
      {alert && (
        <Alert
          severity="info"
          variant="filled"
          sx={{ bgcolor: `${color}.main`, py: 0.5 }}
        >
          {alert}
        </Alert>
      )}

      <CardMedia>
        <Image
          src={`/${imagePath}`}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
        />
      </CardMedia>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{name}</Typography>
        <Chip
          label={formatCurrency(priceInCents / 100)}
          size="small"
          variant="outlined"
          sx={{ pt: 0.25, minWidth: "5rem" }}
          color={color ?? "primary"}
        />
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          className={isEllipsis ? "text-ellipsis" : "text-ellipsis-6"}
        >
          {description}
        </Typography>
      </Box>

      <Button
        sx={{ width: 1 }}
        size="large"
        component={Link}
        href={`/products/${id}/purchase`}
        variant="contained"
        color={color}
      >
        Purchase
      </Button>
    </Stack>
  );
}

export function ProductCardSkeleton({
  color,
  isEllipsis,
}: {
  color?: "primary" | "secondary";
  isEllipsis?: boolean;
}) {
  return (
    <Stack gap={GAP} sx={{ height: 1 }}>
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ aspectRatio: "16/9", width: 1, height: "auto" }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Skeleton variant="text" animation="wave">
          <Typography variant="h6">Product</Typography>
        </Skeleton>
        <Skeleton variant="text" animation="wave">
          <Typography variant="subtitle2">1000</Typography>
        </Skeleton>
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        {Array.from({ length: isEllipsis ? 2 : 6 }).map((_, i) => (
          <Skeleton key={i} variant="text" animation="wave" sx={{ width: 1 }} />
        ))}
      </Box>

      <Button
        sx={{ width: 1 }}
        size="large"
        disabled
        variant="contained"
        color={color}
      >
        Purchase
      </Button>
    </Stack>
  );
}
