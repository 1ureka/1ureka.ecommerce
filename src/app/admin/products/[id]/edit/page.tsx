import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import { getProduct } from "@/data/table";

export default async function EditProductsNewPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct(id);
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
