"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { Product } from "@prisma/client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { formatCurrency } from "@/lib/formatters";
import { addProduct, editProduct } from "@/lib/actions";

export default function ProductForm({ product }: { product?: Product | null }) {
  const [formState, action] = useFormState(
    !product ? addProduct : editProduct.bind(null, product.id),
    {
      error: "",
      fieldError: {},
    }
  );
  const [price, setPrice] = useState<number | undefined>(product?.priceInCents);

  return (
    <form action={action} className="space-y-8">
      {formState.error && (
        <div className="text-destructive">{formState.error}</div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
        />
        {formState?.fieldError?.name && (
          <div className="text-destructive">{formState.fieldError.name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cent</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || undefined)}
        />
        {formState?.fieldError?.priceInCents && (
          <div className="text-destructive">
            {formState.fieldError.priceInCents}
          </div>
        )}
      </div>
      <div className="text-muted-foreground">
        Price: {formatCurrency((price || 0) / 100)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {formState?.fieldError?.description && (
          <div className="text-destructive">
            {formState.fieldError.description}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={!product} />
        {!!product && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {formState?.fieldError?.file && (
          <div className="text-destructive">{formState.fieldError.file}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={!product} />
        {!!product && (
          <Image
            src={`/${product.imagePath}`}
            alt={product.name}
            height={400}
            width={400}
          />
        )}
        {formState?.fieldError?.image && (
          <div className="text-destructive">{formState.fieldError.image}</div>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
