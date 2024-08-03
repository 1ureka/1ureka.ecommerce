import { createDownloadId, getProduct, upsertUserAndOrder } from "@/data/table";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PurchaseReceiptEmail from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const priceInCents = charge.amount;

    const product = await getProduct(productId);
    if (!product || !email) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const order = await upsertUserAndOrder(email, productId, priceInCents);
    const downloadId = await createDownloadId(productId);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      // resend free tier only allows sending to one email
      to: "summerheadquarters001@gmail.com",
      subject: "Your receipt and download link from 1ureka.ecommerce",
      react: (
        <PurchaseReceiptEmail
          email={email}
          product={product}
          order={order}
          downloadId={downloadId}
        />
      ),
    });

    return new NextResponse("OK", { status: 200 });
  } else {
    return new NextResponse();
  }
}
