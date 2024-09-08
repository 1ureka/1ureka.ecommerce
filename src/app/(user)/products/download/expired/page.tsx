import Block from "@/components/Block";
import { Button, Stack, Typography } from "@mui/material";
import { createMotionProps } from "@/components/MotionProps";
import { BoxM } from "@/components/Motion";
import { Link } from "next-view-transitions";

export default function Expired() {
  return (
    <BoxM
      {...createMotionProps()}
      sx={{ alignSelf: "center", justifySelf: "center", width: "fit-content" }}
    >
      <Block>
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
    </BoxM>
  );
}
