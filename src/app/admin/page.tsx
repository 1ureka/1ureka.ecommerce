import Block from "@/components/Block";
import { getSalesData, getCustomerData, getProductData } from "@/data/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Box, Stack, Typography } from "@mui/material";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const [salesData, customerData, productData] = await Promise.all([
    getSalesData(),
    getCustomerData(),
    getProductData(),
  ]);

  const { amount, numberOfSales } = salesData;
  const { averageOrderValue, numberOfCustomers } = customerData;
  const { numberOfActive, numberOfInactive } = productData;

  return (
    <Box>
      <Block sx={{ minWidth: 300, width: "fit-content", mb: 4, mx: "auto" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Overview
        </Typography>
      </Block>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 4,
        }}
      >
        <DashboardCard
          decoration="left"
          color="primary.main"
          variant="contained"
          title="Sales"
          description={`${formatNumber(numberOfSales)} Orders`}
          SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
        >
          <p>{formatCurrency(amount)}</p>
        </DashboardCard>

        <DashboardCard
          decoration="left"
          color="primary.main"
          title="Customers"
          description={`${formatCurrency(averageOrderValue)} Average Value`}
        >
          <p>{formatNumber(numberOfCustomers)}</p>
        </DashboardCard>

        <DashboardCard
          decoration="left"
          color="secondary.main"
          variant="contained"
          title="Active Products"
          description={`${formatNumber(numberOfInactive)} Inactive Products`}
          SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
        >
          <p>{formatNumber(numberOfActive)}</p>
        </DashboardCard>
      </Box>
    </Box>
  );
}

function DashboardCard({
  title,
  description,
  children,
  ...props
}: {
  title: string;
  description: string;
} & React.ComponentProps<typeof Block>) {
  return (
    <Block {...props}>
      <Stack gap={2} sx={{ color: "text.primary" }}>
        <Stack gap={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>

        {children}
      </Stack>
    </Block>
  );
}
