import { Stack, Typography } from "@mui/material";
import Block from "@/components/Block";
import ProductForm from "@/components/(admin)/ProductForm";

export default function Page() {
  return (
    <Stack gap={3} sx={{ alignSelf: "center" }}>
      <Block
        variant="contained"
        color="primary.main"
        sx={{ minWidth: 300, width: "fit-content", alignSelf: "center" }}
        SlotProps={{ childContainer: { "data-mui-color-scheme": "dark" } }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Create New Product
        </Typography>
      </Block>

      <Block sx={{ minWidth: 600, width: "fit-content", alignSelf: "center" }}>
        <ProductForm />
      </Block>
    </Stack>
  );
}
