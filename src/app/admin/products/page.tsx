import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductTable } from "@/data/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductActions from "./_components/ProductActions";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

async function ProductTable() {
  const products = await getProductTable();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Avaliable For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(
          ({ id, name, priceInCents, orders, isAvailableForPurchase }) => (
            <TableRow key={id}>
              <TableCell>
                {isAvailableForPurchase ? (
                  <>
                    <CheckCircle2 />
                    <span className="sr-only">Available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="stroke-destructive" />
                    <span className="sr-only">Not Available</span>
                  </>
                )}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{formatCurrency(priceInCents / 100)}</TableCell>
              <TableCell>{formatNumber(orders)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <a download href={`/admin/products/${id}/download`}>
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <ProductActions
                      id={id}
                      isAvailableForPurchase={isAvailableForPurchase}
                      disabled={orders > 0}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      {products.length === 0 && (
        <caption className="text-center text-sm text-muted-foreground">
          No products found
        </caption>
      )}
    </Table>
  );
}
