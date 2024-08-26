import { notFound } from "next/navigation";
import { getProduct } from "@/data/table";

import { Typography } from "@mui/material";
import Block from "@/components/Block";
import ProductForm from "@/components/(admin)/ProductForm";
import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <StackM {...createMotionProps()} gap={3} sx={{ alignSelf: "center" }}>
      <Block
        variant="contained"
        color="primary.main"
        sx={{ minWidth: 300, width: "fit-content", alignSelf: "center" }}
        SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Edit Product: {product?.name}
        </Typography>
      </Block>

      <Block sx={{ minWidth: 600, width: "fit-content", alignSelf: "center" }}>
        <ProductForm product={product} />
      </Block>
    </StackM>
  );
}
