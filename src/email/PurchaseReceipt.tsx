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
import { purchaseReceiptEmailPreviewData } from "./previewData";

PurchaseReceiptEmail.PreviewProps = purchaseReceiptEmailPreviewData;

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
