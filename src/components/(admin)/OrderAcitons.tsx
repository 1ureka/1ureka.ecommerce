"use client";

import { useState, useTransition } from "react";
import { deleteOrder } from "@/lib/actions";
import { useRouter } from "next/navigation";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

export default function OrderActions({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="actions" onClick={handleClick}>
        <MoreVertRoundedIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          sx={{ color: "error.main" }}
          disabled={disabled || isPedding}
          onClick={() => {
            startTransition(async () => {
              await deleteOrder(id);
              router.refresh();
              handleClose();
            });
          }}
        >
          {isPedding ? "Deleting..." : "Delete"}
        </MenuItem>
      </Menu>
    </>
  );
}
