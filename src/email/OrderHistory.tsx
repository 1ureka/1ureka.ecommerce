import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import type { Order, Product } from "@prisma/client";
import OrderInfo from "./components/OrderInfo";
import { Fragment } from "react";
import { orderHistoryEmailPreviewData } from "./previewData";

type History = {
  order: Order;
  product: Product;
  downloadId: string;
};

OrderHistoryEmail.PreviewProps = orderHistoryEmailPreviewData;

export default function OrderHistoryEmail({
  email,
  history,
}: {
  email: string;
  history: History[];
}) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History for {email}</Heading>
            {history.map(({ order, product, downloadId }, i) => (
              <Fragment key={order.id}>
                <OrderInfo
                  product={product}
                  order={order}
                  downloadId={downloadId}
                />
                {i < history.length - 1 && <Hr />}
              </Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
