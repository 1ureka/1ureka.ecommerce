"use server";

import { createProduct, removeProduct, updateProduct } from "@/data/table";
import { notFound, redirect } from "next/navigation";
import { ProductSchema, ProductEditSchema } from "@/lib/schema";

// Product
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
}

export async function deleteProduct(id: string) {
  try {
    const res = await removeProduct(id);

    if (!res) return notFound();
  } catch (error) {
    throw new Error("Something went wrong");
  }
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

  redirect("/admin/products");
}

// Other actions
