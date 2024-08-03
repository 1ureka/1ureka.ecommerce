import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInfo from "./components/OrderInfo";
import type { Order, Product, DownloadVerification } from "@prisma/client";

PurchaseReceiptEmail.PreviewProps = {
  email: "test@gmail.com",
  product: {
    id: "1",
    name: "Image 01",
    priceInCents: 1000,
    filePath: "path/to/file",
    imagePath:
      "products/dc873dc3-b4dd-419b-bdc0-c37c4f87ff2b-2016-04-17_13.20.11.png",
    description: "Description",
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  order: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    productId: "1",
    pricePaidInCents: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  downloadId: crypto.randomUUID(),
};

export default function PurchaseReceiptEmail({
  email,
  product,
  order,
  downloadId,
}: {
  email: string;
  product: Product;
  order: Order;
  downloadId: DownloadVerification["id"];
}) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipet</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt for {email}</Heading>
            <OrderInfo
              product={product}
              order={order}
              downloadId={downloadId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
