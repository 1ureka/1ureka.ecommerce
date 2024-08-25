import { formatCurrency, formatNumber } from "@/lib/formatters";
import { getProductTable } from "@/data/table";

import Link from "next/link";
import { Box, Button, Stack, Typography, Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Block from "@/components/Block";
import ProductActions from "@/components/(admin)/ProductActions";

export default function Page() {
  return (
    <Stack gap={3}>
      <Block
        variant="contained"
        color="primary.main"
        sx={{ minWidth: 300, width: "fit-content", alignSelf: "center" }}
        SlotProps={{
          childContainer: {
            "data-mui-color-scheme": "dark",
            sx: { color: "text.primary", textAlign: "center" },
          },
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Products
        </Typography>
        <Button
          component={Link}
          href="/admin/products/new"
          variant="outlined"
          color="inherit"
        >
          Add Product
        </Button>
      </Block>

      <Block>
        <ProductTable />
      </Block>
    </Stack>
  );
}

async function ProductTable() {
  const products = await getProductTable();

  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" align="left" />
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Orders</TableCell>
          <TableCell padding="checkbox" align="right" />
        </TableRow>
      </TableHead>

      <TableBody>
        {products.map(
          ({ id, name, priceInCents, orders, isAvailableForPurchase }) => (
            <TableRow key={id}>
              <TableCell
                padding="checkbox"
                align="left"
                sx={{ color: "text.secondary" }}
              >
                <Box sx={{ display: "grid", placeItems: "center" }}>
                  {isAvailableForPurchase ? (
                    <CheckCircleRoundedIcon color="secondary" />
                  ) : (
                    <CancelRoundedIcon color="warning" />
                  )}
                </Box>
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{formatCurrency(priceInCents / 100)}</TableCell>
              <TableCell>{formatNumber(orders)}</TableCell>
              <TableCell padding="checkbox" align="right">
                <ProductActions
                  id={id}
                  isAvailableForPurchase={isAvailableForPurchase}
                  disabled={orders > 0}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
