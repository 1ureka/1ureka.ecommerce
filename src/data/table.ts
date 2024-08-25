import db from "./db";
import type { Product } from "@prisma/client";
import fs from "fs/promises";

export async function getSalesData() {
  const { _sum, _count } = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (_sum.pricePaidInCents ?? 0) / 100,
    numberOfSales: _count,
  };
}

export async function getCustomerData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _avg: { pricePaidInCents: true },
    }),
  ]);

  return {
    averageOrderValue: (orderData._avg.pricePaidInCents ?? 0) / 100,
    numberOfCustomers: userCount,
  };
}

export async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    numberOfActive: activeCount,
    numberOfInactive: inactiveCount,
  };
}

export async function getProductTable() {
  const data = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  return data.map(({ _count, ...rest }) => ({
    ...rest,
    orders: _count.orders,
  }));
}

export async function getProduct(id: string) {
  return db.product.findUnique({ where: { id } });
}

export async function getProducts(
  type: "popular" | "newest" | "all",
  take?: number
) {
  switch (type) {
    case "popular":
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        include: { orders: true },
        take: take ?? 5,
      });
    case "newest":
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        include: { orders: true },
        take: take ?? 5,
      });
    case "all":
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: "asc" },
        include: { orders: true },
      });
  }
}

export async function getDownload(id: string) {
  return db.downloadVerification.findUnique({
    where: { id, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });
}

export async function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserOrders(email: string) {
  return db.user.findUnique({
    where: { email },
    select: {
      email: true,
      orders: { include: { product: true } },
    },
  });
}

export async function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(
  data: Pick<Product, "name" | "priceInCents" | "description"> & {
    file: File;
    image: File;
  }
) {
  try {
    await fs.mkdir("private/products", { recursive: true });
    const filePath = `private/products/${crypto.randomUUID()}-${
      data.file.name
    }`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    await fs.mkdir("public/products", { recursive: true });
    const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public/${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );

    return db.product.create({
      data: {
        name: data.name,
        priceInCents: data.priceInCents,
        description: data.description,
        filePath,
        imagePath,
        isAvailableForPurchase: false,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function updateProduct(
  id: string,
  data: Partial<Product> & { file?: File; image?: File }
) {
  const product = await getProduct(id);

  if (!product) {
    throw new Error("Product not found");
  }

  let filePath = product.filePath;
  let imagePath = product.imagePath;
  try {
    if (data.file && data.file.size > 0) {
      await fs.unlink(product.filePath);
      filePath = `private/products/${crypto.randomUUID()}-${data.file.name}`;
      await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    if (data.image && data.image.size > 0) {
      await fs.unlink(`public/${product.imagePath}`);
      imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
      await fs.writeFile(
        `public/${imagePath}`,
        Buffer.from(await data.image.arrayBuffer())
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }

  delete data.file;
  delete data.image;

  return db.product.update({
    where: { id },
    data: { ...data, filePath, imagePath },
  });
}

export async function removeProduct(id: string) {
  const data = await db.product.delete({ where: { id } });

  if (data) {
    await Promise.all([
      fs.unlink(data.filePath),
      fs.unlink(`public/${data.imagePath}`),
    ]);
  }

  return data;
}

export async function removeUser(id: string) {
  return db.user.delete({ where: { id } });
}

export async function removeOrder(id: string) {
  return db.order.delete({ where: { id } });
}

export async function checkOrder(email: string, productId: string) {
  const data = await db.order.findFirst({
    where: { user: { email }, productId },
    select: { id: true },
  });

  return !!data;
}

export async function createDownloadId(productId: string) {
  const data = await db.downloadVerification.create({
    data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 5) },
  });

  return data.id;
}

export async function upsertUserAndOrder(
  email: string,
  productId: string,
  priceInCents: number
) {
  const userFields = {
    email,
    orders: {
      create: { productId, pricePaidInCents: priceInCents },
    },
  };

  const data = await db.user.upsert({
    where: { email },
    create: userFields,
    update: userFields,
    select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  return data.orders[0];
}
