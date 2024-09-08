import { createDownloadId, getProduct } from "@/data/table";
import { formatCurrency } from "@/lib/formatters";
import Stripe from "stripe";

import { Box, Button, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import Image from "next/image";

import Block from "@/components/Block";
import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";
import { Link } from "next-view-transitions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (!paymentIntent.metadata.productId) {
    throw new Error("Product ID not found in payment intent metadata");
  }

  const product = await getProduct(paymentIntent.metadata.productId);

  if (!product) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <StackM {...createMotionProps()} gap={3}>
      <Block
        variant="contained"
        color="primary.main"
        sx={{ width: "fit-content", alignSelf: "center" }}
        SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
      >
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          {isSuccess ? "Payment Successful!" : "Payment Failed"}
        </Typography>
      </Block>

      <Stack gap={2} sx={{ width: "fit-content", alignSelf: "center" }}>
        <Block>
          <Box
            sx={{
              position: "relative",
              width: 1,
              height: "auto",
              aspectRatio: 16 / 9,
            }}
          >
            <Image
              src={`${product.imagePath}`}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Block>

        <Block>
          <Stack gap={1}>
            <Typography variant="h6">
              {formatCurrency(product.priceInCents / 100)}
            </Typography>

            <Typography variant="h5">{product.name}</Typography>

            <Typography variant="body2">{product.description}</Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
              fullWidth
              component={Link}
              href={
                isSuccess
                  ? `/products/download/${await createDownloadId(product.id)}`
                  : `/products/${product.id}/purchase`
              }
            >
              {isSuccess ? "Download" : "Try Again"}
            </Button>
          </Stack>
        </Block>
      </Stack>
    </StackM>
  );
}
