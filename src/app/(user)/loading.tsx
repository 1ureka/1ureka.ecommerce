import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ alignSelf: "center", justifySelf: "center" }}>
      <CircularProgress />
    </Box>
  );
}
