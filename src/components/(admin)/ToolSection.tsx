"use client";

import { deleteExpiredDownloadLinks } from "@/lib/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button, Stack, Typography } from "@mui/material";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";

export default function ToolSection({
  expiredDownloadLinks,
}: {
  expiredDownloadLinks: number;
}) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <CleaningServicesRoundedIcon color="action" />

        <Typography>Expired download links: {expiredDownloadLinks}</Typography>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        disableElevation
        disabled={expiredDownloadLinks === 0 || isPedding}
        onClick={() => {
          startTransition(() => {
            deleteExpiredDownloadLinks();
            router.refresh();
          });
        }}
      >
        Clear all
      </Button>
    </Stack>
  );
}
