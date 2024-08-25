"use client";

import Block from "@/components/Block";
import { sendOrdersHistory } from "@/lib/actions";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormState, useFormStatus } from "react-dom";

export default function OrdersPage() {
  const [data, action] = useFormState(sendOrdersHistory, {});

  return (
    <Stack
      gap={3}
      alignItems="center"
      sx={{ alignSelf: "center", justifySelf: "center", width: "fit-content" }}
    >
      <Block sx={{ width: 1 }}>
        <Stack gap={1}>
          <Typography variant="h5">My Orders</Typography>
          <Typography variant="body2">
            Enter your email and we will email you your order history and
            download links.
          </Typography>
        </Stack>
      </Block>

      <Block sx={{ width: 1 }}>
        <form action={action}>
          <Stack gap={1}>
            <Typography variant="subtitle1">
              Enter the email you used to purchase:
            </Typography>

            <TextField
              type="email"
              required
              label="email"
              name="email"
              variant="filled"
              error={!!data.error}
              size="small"
            />

            {data.message && (
              <Typography color="success.main">
                {"📧 "}
                {data.message}
              </Typography>
            )}

            {data.error && <Typography color="error">{data.error}</Typography>}

            <SubmitButton disabled={!!data.message} />
          </Stack>
        </form>
      </Block>
    </Stack>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      sx={{ width: 1, mt: 1.5 }}
      size="large"
      type="submit"
      variant="contained"
    >
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
