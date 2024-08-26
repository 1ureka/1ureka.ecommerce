"use client";

import { useState, useTransition } from "react";
import { deleteProduct, toggleAvailability } from "@/lib/actions";
import { createDownloadLink } from "@/lib/actions";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

export default function ProductActions({
  id,
  isAvailableForPurchase,
  disabled,
}: {
  id: string;
  isAvailableForPurchase: boolean;
  disabled: boolean;
}) {
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
        <ActiveToggle id={id} isAvailableForPurchase={isAvailableForPurchase} />
        <MenuItem component={Link} href={`/admin/products/${id}/edit`}>
          Edit
        </MenuItem>
        <MenuItem component={Link} href={`/admin/products/${id}/download`}>
          Download
        </MenuItem>
        <Divider />
        <DeleteButton id={id} disabled={disabled} />
      </Menu>
    </>
  );
}

function ActiveToggle({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  return (
    <MenuItem
      disabled={isPedding}
      onClick={() => {
        startTransition(async () => {
          await toggleAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isPedding
        ? "Loading..."
        : isAvailableForPurchase
        ? "Deactivate"
        : "Activate"}
    </MenuItem>
  );
}

function DeleteButton({ id, disabled }: { id: string; disabled: boolean }) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  return (
    <MenuItem
      sx={{ color: "error.main" }}
      disabled={disabled || isPedding}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      {isPedding ? "Loading..." : "Delete"}
    </MenuItem>
  );
}
