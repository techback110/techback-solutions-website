# TechBack — Brand Identity

**Concept: Pixel Rewind.** A pixel-grid lowercase `t`. The crossbar runs one module
further left than right — the "back" lean that gives the mark its signature and keeps
it from reading as a cross. Pixels say software; the lean says *back*.

Open **`BRAND-SHEET.png`** first — it's the one-page overview to review and share.

## What to use where

| Need | File |
| --- | --- |
| Website header, decks, email signature | `svg/techback-lockup-horizontal-dark.svg` |
| Anything on a light/white background | `svg/techback-lockup-horizontal-light.svg` |
| Narrow or square space | `svg/techback-lockup-stacked-dark.svg` |
| Invoices, contracts, procurement docs | `svg/techback-lockup-formal-dark.svg` (carries "solutions") |
| Mark on its own — app icon, stamp, watermark | `svg/techback-monogram-ember.svg` |
| Anything at 32px or smaller | `svg/techback-monogram-small-ember.svg` |
| One-colour print, embroidery, laser, fax | `svg/techback-lockup-horizontal-mono-*.svg` |

**Always prefer the SVG.** It is resolution-independent and the type is outlined to
paths, so it renders identically on any machine with no font installed. Use the PNGs
only where SVG isn't accepted.

## Social

| Platform | File |
| --- | --- |
| Profile picture (all platforms) | `social/avatar-ember-1000.png` |
| LinkedIn cover | `social/linkedin-cover-1584x396.png` |
| X / Twitter header | `social/x-header-1500x500.png` |
| Facebook cover | `social/facebook-cover-820x312.png` |
| Link preview card | `social/og-card-1200x630.png` |

`avatar-ink-1000.png` is the alternate (ember mark on black) if the orange reads too
hot next to a given platform's UI.

## Colour

| Name | Hex | Use |
| --- | --- | --- |
| Ember | `#FF4D1C` | The mark. Accent only — never body text. |
| Ink | `#0D0D0C` | Background |
| Bone | `#EFEBE3` | Type on dark |
| Mute | `#8C887F` | Secondary type, captions |

These are the site's existing tokens, so the logo and the website are one system.

## Type

**Inter Tight, weight 700**, tightened tracking. This is already the site's sans, so
the wordmark is the brand's own typeface rather than a borrowed one. All master files
have the type converted to outlines — there is no live text to go wrong.

## Rules

- **Clear space:** keep at least one crossbar-width of empty space on every side.
- **Minimum size:** 24px tall for the monogram, 110px wide for the horizontal lockup.
- **Below 32px, switch to the small-size mark** (`*-small-*.svg`). The full grid has a
  finer gutter that turns to mush at tab size; the small mark is drawn chunkier to survive it.
- Don't recolour the mark outside the four colours above, don't add effects, don't
  stretch it, and don't rebuild the lockup by hand — use the files.

## Folder map

```
BRAND-SHEET.png / .svg   one-page overview — start here
svg/                     master logo files (use these)
png/                     raster exports @1x @2x @3x
social/                  avatars, covers, link-preview card
favicon/                 favicon.ico + app icons 16→512 + maskable
```

Nothing here is wired into the website yet — these are design files for review.
