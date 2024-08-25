"use client";

import { userOrderExists } from "@/lib/actions";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";

import { loadStripe } from "@stripe/stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { LinkAuthenticationElement } from "@stripe/react-stripe-js";

import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm({
  product,
  clientSecret,
}: {
  product: Product;
  clientSecret: string;
}) {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form priceInCents={product.priceInCents} id={product.id} />
    </Elements>
  );
}

function Form({ priceInCents, id }: { priceInCents: number; id: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const orderExists = await userOrderExists(email, id);
    if (orderExists) {
      setError(`You have already purchased this product.
        Try downloading it from My Orders page.`);
      setLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.origin}/stripe/success`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack gap={2} component="form" onSubmit={handleSubmit}>
      <Stack gap={1}>
        <Typography variant="h6">Checkout</Typography>
        {error && <Typography color="error">{error}</Typography>}
      </Stack>

      <Stack gap={1}>
        <PaymentElement />
        <LinkAuthenticationElement
          onChange={(e) => {
            setEmail(e.value.email);
          }}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{ width: 1 }}
        size="large"
        disabled={!stripe || !elements || loading}
        type="submit"
      >
        {loading
          ? "Processing..."
          : `Purchase - $${formatCurrency(priceInCents / 100)}`}
      </Button>
    </Stack>
  );
}
