import { getDownload } from "@/data/table";
import { NextResponse, type NextRequest } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { downloadId } }: { params: { downloadId: string } }
) {
  const download = await getDownload(downloadId);

  if (!download) {
    return NextResponse.redirect(
      new URL("/products/download/expired", req.url)
    );
  }

  const { product } = download;

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
