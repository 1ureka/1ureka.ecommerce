"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { formatCurrency } from "@/lib/formatters";
import { addProduct, editProduct } from "@/lib/actions";
import type { Product } from "@prisma/client";

import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Chip, styled, TextField } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

export default function ProductForm({ product }: { product?: Product | null }) {
  const [price, setPrice] = useState<number | undefined>(product?.priceInCents);
  const [formState, action] = useFormState(
    !product ? addProduct : editProduct.bind(null, product.id),
    { error: "", fieldError: {} }
  );

  return (
    <Stack component="form" action={action} gap={1.5}>
      {formState.error && (
        <Typography color="error">{formState.error}</Typography>
      )}

      <TextField
        size="small"
        variant="filled"
        label="Name"
        name="name"
        required
        defaultValue={product?.name}
        error={Boolean(formState?.fieldError?.name)}
        helperText={formState?.fieldError?.name}
      />

      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={1.5}>
        <TextField
          size="small"
          variant="filled"
          label="Price In Cent"
          name="priceInCents"
          required
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || undefined)}
          error={Boolean(formState?.fieldError?.priceInCents)}
          helperText={formState?.fieldError?.priceInCents}
          sx={{ flex: 1 }}
        />

        <Chip
          variant="outlined"
          label={
            <Typography variant="body2">
              Price: {formatCurrency((price || 0) / 100)}
            </Typography>
          }
          sx={{ flex: 1, textAlign: "center" }}
        />
      </Stack>

      <TextField
        size="small"
        variant="filled"
        label="Description"
        name="description"
        required
        multiline
        rows={4}
        defaultValue={product?.description}
        error={Boolean(formState?.fieldError?.description)}
        helperText={formState?.fieldError?.description}
      />

      <Stack direction="row" flexWrap="wrap" gap={1.5}>
        <Stack sx={{ flex: 1 }} gap={1}>
          <Typography variant="subtitle1">File</Typography>

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadRoundedIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            {product ? "Change" : "Upload"} File
            <VisuallyHiddenInput type="file" name="file" required={!product} />
          </Button>

          {product && (
            <Box>
              <Typography variant="body2">current file path is </Typography>
              <Typography variant="body2">
                <code>{product.filePath || "N/A"}</code>
              </Typography>
            </Box>
          )}

          {formState?.fieldError?.file && (
            <Typography color="error">{formState.fieldError.file}</Typography>
          )}
        </Stack>

        <Stack sx={{ flex: 1 }} gap={1}>
          <Typography variant="subtitle1">Image</Typography>

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddPhotoAlternateRoundedIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            {product ? "Change" : "Upload"} Image
            <VisuallyHiddenInput type="file" name="image" required={!product} />
          </Button>

          {product && (
            <Box
              sx={{
                position: "relative",
                width: 1,
                aspectRatio: 16 / 9,
                height: "auto",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Image src={`/${product.imagePath}`} alt={product.name} fill />
            </Box>
          )}

          {formState?.fieldError?.image && (
            <Typography color="error">{formState.fieldError.image}</Typography>
          )}
        </Stack>
      </Stack>

      <SubmitButton />
    </Stack>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      size="large"
      type="submit"
      fullWidth
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
