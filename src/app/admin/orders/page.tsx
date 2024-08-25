import { formatCurrency } from "@/lib/formatters";
import { getOrders } from "@/data/table";

import { Stack, Table, Typography } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Block from "@/components/Block";
import OrderActions from "@/components/(admin)/OrderAcitons";

export default function Page() {
  return (
    <Stack gap={3}>
      <Block
        variant="contained"
        color="primary.main"
        sx={{ minWidth: 300, width: "fit-content", alignSelf: "center" }}
        SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Orders
        </Typography>
      </Block>

      <Block>
        <OrdersTable />
      </Block>
    </Stack>
  );
}

async function OrdersTable() {
  const orders = await getOrders();

  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Price Paid</TableCell>
          <TableCell padding="checkbox" align="right" />
        </TableRow>
      </TableHead>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{order.user.email}</TableCell>
            <TableCell>
              {formatCurrency(order.pricePaidInCents / 100)}
            </TableCell>
            <TableCell padding="checkbox" align="right">
              <OrderActions id={order.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
