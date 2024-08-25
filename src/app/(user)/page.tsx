import Block from "@/components/Block";
import { Box, Stack, Typography } from "@mui/material";
import { PopularSection } from "@/components/(user)/IndexSections";
import { NewestSection } from "@/components/(user)/IndexSections";

export default async function Page() {
  return (
    <Stack gap={6}>
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
    </Stack>
  );
}
