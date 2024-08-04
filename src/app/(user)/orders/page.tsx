"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOrdersHistory } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function OrdersPage() {
  const [data, action] = useFormState(sendOrdersHistory, {});

  return (
    <form className="max-w-xl mx-auto" action={action}>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history and
            download links.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" required name="email" id="email" />
            {data.message && (
              <p className="text-sm text-green-700">
                {"📧 "}
                {data.message}
              </p>
            )}
            {data.error && (
              <p className="text-sm text-destructive">{data.error}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton disabled={!!data.message} />
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      className="w-full"
      size="lg"
      type="submit"
    >
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
