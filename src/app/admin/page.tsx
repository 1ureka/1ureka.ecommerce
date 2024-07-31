import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSalesData, getCustomerData, getProductData } from "../data/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";

export default async function AdminPage() {
  const [salesData, customerData, productData] = await Promise.all([
    getSalesData(),
    getCustomerData(),
    getProductData(),
  ]);

  const { amount, numberOfSales } = salesData;
  const { averageOrderValue, numberOfCustomers } = customerData;
  const { numberOfActive, numberOfInactive } = productData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        description={`${formatNumber(numberOfSales)} Orders`}
      >
        <p>{formatCurrency(amount)}</p>
      </DashboardCard>

      <DashboardCard
        title="Customers"
        description={`${formatCurrency(averageOrderValue)} Average Value`}
      >
        <p>{formatNumber(numberOfCustomers)}</p>
      </DashboardCard>

      <DashboardCard
        title="Active Products"
        description={`${formatNumber(numberOfInactive)} Inactive Products`}
      >
        <p>{formatNumber(numberOfActive)}</p>
      </DashboardCard>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
