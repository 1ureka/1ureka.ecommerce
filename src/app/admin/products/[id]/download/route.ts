import { getProduct } from "@/data/table";
import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import fs from "fs/promises";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split(".").pop() || "";

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename=${product.name}.${extension}`,
      "Content-Length": size.toString(),
    },
  });
}
