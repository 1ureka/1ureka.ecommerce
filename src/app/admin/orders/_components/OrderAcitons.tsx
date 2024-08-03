"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { deleteOrder } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function OrderActions({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  return (
    <>
      <DeleteButton id={id} disabled={disabled} />
    </>
  );
}

export function DeleteButton({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const [isPedding, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPedding}
      onClick={() => {
        startTransition(async () => {
          await deleteOrder(id);
          router.refresh();
        });
      }}
    >
      {isPedding ? "Loading..." : "Delete"}
    </DropdownMenuItem>
  );
}
