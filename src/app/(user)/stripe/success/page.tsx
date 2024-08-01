import { Button } from "@/components/ui/button";
import { createDownloadId, getProduct } from "@/data/table";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

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
    <div className="max-w-5xl w-full mx-auto space-y-8">
      {isSuccess ? (
        <h1 className="text-4xl font-bold">Payment Successful!</h1>
      ) : (
        <h1 className="text-4xl font-bold">Payment Failed</h1>
      )}

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
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadId(
                  product.id
                )}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
