"use server";

import {
  checkOrder,
  createDownloadId,
  createProduct,
  getUserOrders,
  removeOrder,
  removeProduct,
  removeUser,
  updateProduct,
} from "@/data/table";
import { notFound, redirect } from "next/navigation";
import { ProductSchema, ProductEditSchema, EmailSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import OrderHistoryEmail from "@/email/OrderHistory";

const resend = new Resend(process.env.RESEND_API_KEY);

// Product actions
export async function addProduct(prevState: unknown, formData: FormData) {
  try {
    const result = ProductSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!result.success) {
      return {
        error: "Invalid Fields",
        fieldError: result.error.formErrors.fieldErrors,
      };
    }

    const data = result.data;

    await createProduct(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  try {
    await updateProduct(id, { isAvailableForPurchase });
  } catch (error) {
    throw new Error("Something went wrong");
  }

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  try {
    const res = await removeProduct(id);

    if (!res) return notFound();
  } catch (error) {
    throw new Error("Something went wrong");
  }

  revalidatePath("/");
  revalidatePath("/products");
}

export async function editProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  try {
    const result = ProductEditSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!result.success) {
      return {
        error: "Invalid Fields",
        fieldError: result.error.formErrors.fieldErrors,
      };
    }

    const data = result.data;
    await updateProduct(id, data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

// Order actions
export async function userOrderExists(email: string, productId: string) {
  return checkOrder(email, productId);
}

export async function deleteOrder(id: string) {
  const order = await removeOrder(id);

  if (!order) return notFound();

  return order;
}

export async function sendOrdersHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = EmailSchema.safeParse(formData.get("email"));

  if (!result.success) {
    return { error: "Invalid Email address" };
  }

  const email = result.data;
  const orderHistory = await getUserOrders(email);

  if (!orderHistory) {
    return {
      message:
        "Check your email to view your order history and download your products.",
    };
  }

  const history = await Promise.all(
    orderHistory.orders.map(async (data) => {
      const { product, ...order } = data;
      const downloadId = await createDownloadId(product.id);
      return { order, product, downloadId };
    })
  );

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "summerheadquarters001@gmail.com",
    subject: "Your Order History from 1ureka.ecommerce",
    react: <OrderHistoryEmail email={email} history={history} />,
  });

  if (data.error) {
    return { error: "There was an error sending the email" };
  }

  return {
    message:
      "Check your email to view your order history and download your products.",
  };
}

// User actions
export async function deleteUser(id: string) {
  const user = await removeUser(id);

  if (!user) return notFound();

  return user;
}
