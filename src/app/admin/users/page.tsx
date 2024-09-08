import { formatCurrency, formatNumber } from "@/lib/formatters";
import { getUsers } from "@/data/table";

import { Table, Typography } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import Block from "@/components/Block";
import UserActions from "@/components/(admin)/UserActions";
import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

export default function Page() {
  return (
    <StackM {...createMotionProps()} gap={3}>
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
          Customers
        </Typography>
      </Block>

      <Block>
        <UserTable />
      </Block>
    </StackM>
  );
}

async function UserTable() {
  const users = await getUsers();

  if (users.length === 0) return <p>No customers found</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Orders</TableCell>
          <TableCell>Value</TableCell>
          <TableCell padding="checkbox" align="right" />
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(user.orders.length)}</TableCell>
            <TableCell>
              {formatCurrency(
                user.orders.reduce(
                  (sum, order) => sum + order.pricePaidInCents,
                  0
                ) / 100
              )}
            </TableCell>
            <TableCell padding="checkbox" align="right">
              <UserActions id={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
