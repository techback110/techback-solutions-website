import type { Metadata } from "next";
import Link from "next/link";
import { adminCredentials } from "@/lib/auth";
import { site } from "@/lib/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next } = await searchParams;
  const creds = adminCredentials();

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff4d1c, transparent 65%)" }}
      />
      <div className="relative w-full max-w-sm">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-ember font-serif text-2xl italic leading-none text-night">n</span>
          <span className="font-medium">{site.name}</span>
        </Link>
        <div className="rounded-2xl border border-line bg-ink-2/80 p-8 backdrop-blur">
          <h1 className="display text-4xl">Welcome back.</h1>
          <p className="mb-8 mt-2 text-sm text-mute">Sign in to manage projects, services and reviews.</p>
          {creds ? (
            <LoginForm next={typeof next === "string" ? next : "/admin"} />
          ) : (
            <p className="rounded-lg border border-ember/30 bg-ember/10 p-4 text-sm text-ember">
              Admin login is disabled. Set <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code> and <code>AUTH_SECRET</code> environment variables.
            </p>
          )}
          {creds?.isDefault && (
            <p className="mt-6 rounded-lg bg-ink-3 p-3 text-xs leading-relaxed text-mute">
              Dev mode — default login: <span className="text-bone">{creds.email}</span> /{" "}
              <span className="text-bone">{creds.password}</span>. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to change.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
