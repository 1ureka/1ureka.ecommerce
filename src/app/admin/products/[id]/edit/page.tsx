import PageHeader from "@/components/(admin)/PageHeader";
import ProductForm from "@/components/(admin)/ProductForm";
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
