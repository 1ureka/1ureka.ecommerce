"use server";

import {
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
} from "@/data/table";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "File is required" });

const imageSchema = fileSchema.refine(
  (file) => file.type.startsWith("image/"),
  { message: "Image must be an image" }
);

const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().positive().min(1),
  file: fileSchema.refine((file) => file.size > 0, {
    message: "File is required",
  }),
  image: imageSchema.refine((file) => file.size > 0, {
    message: "Image is required",
  }),
});

const ProductEditSchema = ProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

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
    const product = await getProduct(id);

    if (!product) return notFound();

    if (data.file && data.file.size > 0) {
      // delete old file
    }

    if (data.image && data.image.size > 0) {
      // delete old image
    }

    // await updateProduct(id, {});
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }

  redirect("/admin/products");
}
