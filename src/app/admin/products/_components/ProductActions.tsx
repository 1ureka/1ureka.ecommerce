"use client";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleAvailability } from "../../_actions/product";
import { useRouter } from "next/navigation";

export default function ProductActions({
  id,
  isAvailableForPurchase,
  disabled,
}: {
  id: string;
  isAvailableForPurchase: boolean;
  disabled: boolean;
}) {
  return (
    <>
      <ActiveToggle id={id} isAvailableForPurchase={isAvailableForPurchase} />
      <DropdownMenuSeparator />
      <DeleteButton id={id} disabled={disabled} />
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
    <DropdownMenuItem
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
    </DropdownMenuItem>
  );
}

function DeleteButton({ id, disabled }: { id: string; disabled: boolean }) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPedding}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      {isPedding ? "Loading..." : "Delete"}
    </DropdownMenuItem>
  );
}
