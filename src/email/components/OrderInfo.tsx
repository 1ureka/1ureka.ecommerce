import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Order, Product, DownloadVerification } from "@prisma/client";
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function OrderInfo({
  order,
  product,
  downloadId,
}: {
  order: Order;
  product: Product;
  downloadId: DownloadVerification["id"];
}) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
              Order Id
            </Text>
            <Text className="mt-0 mr-4 text-gray-900 font-semibold whitespace-nowrap text-nowrap">
              {order.id}
            </Text>
          </Column>

          <Column>
            <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4 text-gray-900 font-semibold whitespace-nowrap text-nowrap">
              {formatDate(order.createdAt)}
            </Text>
          </Column>

          <Column>
            <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4 text-gray-900 font-semibold whitespace-nowrap text-nowrap">
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>

      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img
          alt={product.name}
          src={`http://localhost:3000/${product.imagePath}`}
          width={"100%"}
        />

        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>

          <Column align="right">
            <Button
              className="bg-black text-white px-6 py-4 rounded text-lg"
              href={`http://localhost:3000/products/download/${downloadId}`}
            >
              Download
            </Button>
          </Column>
        </Row>

        <Row>
          <Column>
            <Text className="mb-0 text-gray-500">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
