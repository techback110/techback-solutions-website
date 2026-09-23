import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { dataSource, getInquiries, getReviews } from "@/lib/data";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const [inquiries, reviews] = await Promise.all([getInquiries(), getReviews({ includePending: true })]);
  const source = dataSource();

  return (
    <div className="min-h-svh bg-ink">
      <Sidebar
        email={session.email}
        unread={inquiries.filter((i) => !i.read).length}
        pending={reviews.filter((r) => !r.approved).length}
      />
      <div className="lg:pl-64">
        {source.mode === "memory" && (
          <div className="border-b border-amber-500/20 bg-amber-500/10 px-6 py-2.5 text-xs text-amber-300">
            Demo mode: no DATABASE_URL configured — changes are kept in memory and reset when the server restarts.
          </div>
        )}
        {source.error && (
          <div className="border-b border-red-500/20 bg-red-500/10 px-6 py-2.5 text-xs text-red-300">
            Database error: {source.error} — showing fallback data. Did you run <code>npm run db:setup</code>?
          </div>
        )}
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
