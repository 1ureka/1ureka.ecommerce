import Block from "@/components/Block";
import { PopularSection } from "@/components/(user)/IndexSections";
import { NewestSection } from "@/components/(user)/IndexSections";

import { Box, Typography } from "@mui/material";
import { StackM } from "@/components/Motion";
import { createMotionProps } from "@/components/MotionProps";

export default async function Page() {
  return (
    <StackM {...createMotionProps()} gap={6}>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Block sx={{ width: "fit-content", textAlign: "center" }}>
          <Typography variant="h4">Welcome to our store!</Typography>
          <Typography variant="body1">
            We have a wide selection of products for you to choose from. Feel
            free to browse our collection and find the perfect item for you.
          </Typography>
        </Block>
      </Box>

      <PopularSection />
      <NewestSection />
    </StackM>
  );
}
