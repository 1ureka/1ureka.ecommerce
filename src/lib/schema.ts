import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "File is required" });

const imageSchema = fileSchema.refine(
  (file) => file.type.startsWith("image/"),
  { message: "Image must be an image" }
);

export const ProductSchema = z.object({
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

export const ProductEditSchema = ProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});
