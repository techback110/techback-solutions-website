import { Badge, Card, Empty, PageTitle } from "@/components/admin/shell";
import { DeleteButton, ToggleAction } from "@/components/admin/ui";
import { getInquiries } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { removeInquiry, toggleInquiryRead } from "../../actions";

export default async function InquiriesPage() {
  const inquiries = await getInquiries();
  const unread = inquiries.filter((i) => !i.read).length;

  return (
    <>
      <PageTitle title="Inquiries" description={`${inquiries.length} messages from the contact form · ${unread} unread`} />
      {inquiries.length === 0 ? (
        <Card>
          <Empty title="Inbox zero" body="New project inquiries from the contact page will land here." />
        </Card>
      ) : (
        <div className="space-y-3">
          {inquiries.map((i) => (
            <Card key={i.id} className={i.read ? "" : "border-ember/30"}>
              <details className="group" open={!i.read}>
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4">
                  <span className={`size-2 shrink-0 rounded-full ${i.read ? "bg-ink-3" : "bg-ember"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {i.name}
                      {i.company && <span className="font-normal text-mute"> · {i.company}</span>}
                    </p>
                    <p className="truncate text-xs text-mute">{i.message}</p>
                  </div>
                  <div className="hidden gap-1.5 sm:flex">
                    {i.service && <Badge>{i.service}</Badge>}
                    {i.budget && <Badge tone="accent">{i.budget}</Badge>}
                  </div>
                  <span className="shrink-0 text-xs text-mute">{formatDate(i.created_at)}</span>
                </summary>
                <div className="border-t border-line px-5 py-5 sm:pl-11">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-bone/85">{i.message}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:${i.email}?subject=${encodeURIComponent("Re: your project inquiry")}`}
                      className="rounded-lg bg-bone px-4 py-2 text-xs font-semibold text-ink hover:bg-ember hover:text-night"
                    >
                      Reply to {i.email}
                    </a>
                    <div className="flex gap-1">
                      <ToggleAction action={toggleInquiryRead} id={i.id} field="read" value={i.read} on="Mark unread" off="Mark read" />
                      <DeleteButton action={removeInquiry} id={i.id} />
                    </div>
                  </div>
                </div>
              </details>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
