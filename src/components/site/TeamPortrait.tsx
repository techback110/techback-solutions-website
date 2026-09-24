import type { TeamMember } from "@/lib/types";

/** A team member's photo, or an illustrated figure in their colour when there's none. */
export function TeamPortrait({ member }: { member: Pick<TeamMember, "name" | "color" | "photo_url"> }) {
  if (member.photo_url) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-ink-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-supplied hosts */}
        <img
          src={member.photo_url}
          alt={member.name}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
        />
      </div>
    );
  }
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-[6px]"
      style={{ background: `color-mix(in oklab, ${member.color} 22%, var(--color-ink))` }}
    >
      <div
        className="absolute bottom-0 left-1/2 aspect-square w-[70%] -translate-x-1/2 translate-y-1/3 rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-1/4 group-hover:scale-110"
        style={{ background: member.color }}
      />
      <div
        className="absolute left-1/2 top-[30%] aspect-square w-[34%] -translate-x-1/2 rounded-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2"
        style={{ background: member.color }}
      />
    </div>
  );
}
