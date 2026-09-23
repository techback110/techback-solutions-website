"use client";

import { useActionState } from "react";
import { FormError, inputCls, SubmitButton } from "@/components/admin/ui";
import type { ActionState } from "@/lib/types";
import { login } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState<ActionState, FormData>(login, {});
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1.5 block text-sm text-bone/80">Email</span>
        <input name="email" type="email" required autoComplete="username" className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-bone/80">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={inputCls} />
      </label>
      <FormError message={state.error} />
      <SubmitButton className="w-full py-3">Sign in</SubmitButton>
    </form>
  );
}
