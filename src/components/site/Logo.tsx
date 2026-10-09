import { cn } from "@/lib/utils";

/* The grid is the master artwork — same geometry as /brand. Edit here and every
   placement follows. Crossbar runs one module further left than right. */
const MARK = [
  "...XX..",
  "...XX..",
  "...XX..",
  "XXXXXXX",
  "XXXXXXX",
  "...XX..",
  "...XX..",
  "...XX..",
  "...XX..",
  "...XX..",
  "...XXXX",
  "...XXXX",
];

/* Chunkier grid for anything rendering below ~24px, where the fine gutter fills in. */
const MARK_COMPACT = [
  "..XX..",
  "..XX..",
  "XXXXXX",
  "..XX..",
  "..XX..",
  "..XX..",
  "..XXXX",
];

const CELL = 12;
const MODULE = 10.2;
const MODULE_COMPACT = 10.6;

export function LogoMark({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const grid = compact ? MARK_COMPACT : MARK;
  const size = compact ? MODULE_COMPACT : MODULE;
  const pad = (CELL - size) / 2;

  return (
    <svg
      viewBox={`0 0 ${grid[0].length * CELL} ${grid.length * CELL}`}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      {grid.map((row, r) =>
        [...row].map((cell, c) =>
          cell === "X" ? (
            <rect
              key={`${r}-${c}`}
              x={c * CELL + pad}
              y={r * CELL + pad}
              width={size}
              height={size}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  /* compact: every in-app placement renders at ~28px, where the full grid's
     gutter fills in and the mark turns to mush. */
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark compact className={cn("h-7 w-auto text-ember", markClassName)} />
      <span className={cn("text-[15px] font-medium tracking-tight", wordClassName)}>
        techback
      </span>
    </span>
  );
}
