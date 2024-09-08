import { Button, Stack, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import Block from "@/components/Block";
import { ProductsSection } from "@/components/(user)/ProductsSection";
import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

export default function Page() {
  return (
    <StackM {...createMotionProps()} gap={4}>
      <Stack direction="row" alignItems="stretch" gap={4}>
        <Block
          variant="contained"
          color="primary.main"
          decoration="left"
          sx={{ width: 1 }}
        >
          <Stack
            gap={1}
            sx={{ color: "text.primary" }}
            data-mui-color-scheme="dark"
          >
            <Typography variant="h5">Products</Typography>
            <Typography variant="body2">
              Browse our collection of products and find the perfect item for
              you.
            </Typography>
          </Stack>
        </Block>

        <Block color="primary.main" decoration="right" sx={{ width: 1 }}>
          <Typography variant="subtitle1">Order By</Typography>

          <ToggleButtonGroup size="small" value="name" color="primary">
            <ToggleButton value="name">Name</ToggleButton>
            <ToggleButton value="popular">Popular</ToggleButton>
            <ToggleButton value="newest">Newest</ToggleButton>
            <ToggleButton value="price">Price</ToggleButton>
          </ToggleButtonGroup>
        </Block>
      </Stack>

      <ProductsSection />

      <Stack alignItems="center" sx={{ py: 2 }}>
        <Block>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshRoundedIcon />}
            size="large"
          >
            Load More
          </Button>
        </Block>
      </Stack>
    </StackM>
  );
}

export const dynamic = "force-dynamic";
