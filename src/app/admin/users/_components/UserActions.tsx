"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { deleteUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function UserActions({
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
          await deleteUser(id);
          router.refresh();
        });
      }}
    >
      {isPedding ? "Loading..." : "Delete"}
    </DropdownMenuItem>
  );
}
