"use client";

import { CircularProgress, IconButton, useColorScheme } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    return <CircularProgress size={24} />;
  }

  return (
    <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      {mode === "dark" ? (
        <LightModeRoundedIcon fontSize="small" />
      ) : (
        <DarkModeRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}
