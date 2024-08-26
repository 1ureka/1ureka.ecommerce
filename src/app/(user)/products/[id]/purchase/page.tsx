import Stripe from "stripe";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/formatters";
import { getProduct } from "@/data/table";

import Image from "next/image";
import Block from "@/components/Block";
import CheckoutForm from "@/components/(user)/CheckoutForm";
import { Box, Stack, Typography } from "@mui/material";

import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const GAP = 4;

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <StackM {...createMotionProps()} gap={GAP} sx={{ alignSelf: "center" }}>
      <Stack gap={GAP / 2} direction="row">
        <Block
          decoration="none"
          sx={{ position: "relative", width: 2 / 5 }}
          SlotProps={{ childContainer: { sx: { p: 0.5 } } }}
        >
          <Box
            sx={{
              position: "relative",
              width: 1,
              height: 1,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Image
              src={`/${product.imagePath}`}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Block>

        <Block decoration="right" sx={{ flexGrow: 1 }}>
          <Stack gap={GAP / 2}>
            <Typography variant="h5">
              {formatCurrency(product.priceInCents / 100)}
            </Typography>

            <Typography variant="h4">{product.name}</Typography>

            <Typography variant="body2">{product.description}</Typography>
          </Stack>
        </Block>
      </Stack>

      <Block color="primary.main">
        <CheckoutForm
          clientSecret={paymentIntent.client_secret}
          product={product}
        />
      </Block>
    </StackM>
  );
}
