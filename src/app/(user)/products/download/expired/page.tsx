import Link from "next/link";
import Block from "@/components/Block";
import { Button, Stack, Typography } from "@mui/material";

export default function Expired() {
  return (
    <Block
      sx={{ alignSelf: "center", justifySelf: "center", width: "fit-content" }}
    >
      <Stack gap={2}>
        <Typography variant="h6">Download link expired</Typography>
        <Button
          size="large"
          component={Link}
          href="/orders"
          fullWidth
          variant="contained"
        >
          Get New Link
        </Button>
      </Stack>
    </Block>
  );
}
