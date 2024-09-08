import { UserDocker } from "@/components/(docker)/Docker";
import { Box, Stack } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      sx={{ position: "absolute", inset: 0, bgcolor: "content.layer2" }}
      direction="row"
    >
      <UserDocker />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: 1,
          display: "grid",
          px: 15,
          py: 4,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
