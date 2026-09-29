"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../auth-actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors disabled:opacity-40"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className="min-h-screen bg-surface text-fg flex items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm border border-edge p-8">
        <span className="font-mono text-[11px] uppercase tracking-superwide text-signal block mb-2">
          Cordinit Media
        </span>
        <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Admin sign in</h1>

        <div className="flex flex-col gap-5">
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full bg-transparent border-b border-edge py-3 text-fg focus:outline-none focus:border-signal transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-edge py-3 text-fg focus:outline-none focus:border-signal transition-colors"
            />
          </div>

          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

          <div className="mt-2">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}
