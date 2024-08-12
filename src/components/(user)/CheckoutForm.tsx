"use client";

import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

import { userOrderExists } from "@/lib/actions";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@prisma/client";

import { loadStripe } from "@stripe/stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { LinkAuthenticationElement } from "@stripe/react-stripe-js";

import { useState } from "react";
import Image from "next/image";

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
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="flex-shrink aspect-video w-1/3 relative">
          <Image
            src={`/${product.imagePath}`}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>

      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={product.priceInCents} id={product.id} />
      </Elements>
    </div>
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {error && (
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => {
              setEmail(e.value.email);
            }}
          />
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={!stripe || !elements || loading}
          >
            {loading
              ? "Processing..."
              : `Purchase - $${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
