"use client";

import {
  Briefcase,
  ExternalLink,
  Inbox,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: UserCog },
];

export function Sidebar({ email, unread, pending }: { email: string; unread: number; pending: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const badges: Record<string, number> = { "/admin/inquiries": unread, "/admin/reviews": pending };

  return (
    <>
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-ink/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-medium">{site.shortName} Admin</span>
        <ThemeToggle className="ml-auto mr-2 size-9" />
        <button onClick={() => setOpen(true)} aria-label="Open navigation" className="rounded-md p-2 hover:bg-ink-3">
          <Menu className="size-5" />
        </button>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-ink-2 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-ember font-serif text-xl italic leading-none text-night">n</span>
            <span>
              <span className="block text-sm font-semibold">{site.shortName}</span>
              <span className="block text-xs text-mute">Studio admin</span>
            </span>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-md p-1.5 hover:bg-ink-3 lg:hidden">
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            const count = badges[href];
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-ink-3 text-bone" : "text-bone/65 hover:bg-ink-3/60 hover:text-bone"
                )}
              >
                <Icon className={cn("size-4", active && "text-ember")} />
                {label}
                {count ? (
                  <span className="ml-auto rounded-full bg-ember px-2 py-0.5 text-[11px] font-semibold text-night">{count}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-line p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-bone/65 transition-colors hover:bg-ink-3/60 hover:text-bone"
          >
            <ExternalLink className="size-4" /> View website
          </Link>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-bone/65 transition-colors hover:bg-ink-3/60 hover:text-bone">
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
          <div className="flex items-center justify-between gap-2 px-3 pt-2">
            <p className="truncate text-xs text-mute">{email}</p>
            <ThemeToggle className="size-9 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
