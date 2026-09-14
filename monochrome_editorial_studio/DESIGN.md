---
name: Monochrome Editorial Studio
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#2f3031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#342f2d'
  tertiary-container: '#eae1dd'
  on-tertiary-container: '#696360'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#eae1dd'
  tertiary-fixed-dim: '#cec5c1'
  on-tertiary-fixed: '#1f1b19'
  on-tertiary-fixed-variant: '#4b4643'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 112px
    fontWeight: '800'
    lineHeight: 104px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Syne
    fontSize: 52px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-lg:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.035em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-mono-sm:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
  space-2xl: 6rem
  space-3xl: 10rem
  gutter-desktop: 2rem
  gutter-tablet: 1.5rem
  gutter-mobile: 1rem
  margin-desktop: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
---

## Brand & Style

This design system embodies the commanding presence of an elite global creative studio. At the intersection of avant-garde editorial art direction and Swiss rationalism, it prioritizes pure form, stark contrast, and intentional tension. 

The aesthetic is anchored in an uncompromising monochrome palette, razor-sharp architectural geometry, and disciplined hierarchy. It deliberately avoids artificial ornamentation, skeuomorphism, and generic SaaS softness. Visual drama is achieved through extreme scale differentials: monumental display typography colliding with precise micro-labels, set against expansive fields of deep void. The emotional register is authoritative, cerebral, and impeccably refined.

## Colors

The system relies strictly on a high-contrast achromatic spectrum. Color is treated as a structural medium rather than decorative accenting.

- **Background Void (`#0B0B0B`)**: Deep charcoal-black base surface providing maximum optical depth and framing high-fidelity media.
- **Primary Ink / Signal (`#F4F4F4`)**: Crisp off-white used for dominant typography, primary actions, and prominent structural boundaries.
- **Secondary / Supporting Tone (`#8E8E8E`)**: Mid-gray neutral calculated for secondary editorial prose, timestamps, index numbering, and understated system metadata.
- **Architectural Hairlines (`#262626`)**: Precision border tone used to delineate columns, list separators, and matrix boundaries without visual clutter.
- **Sub-surface Elevation (`#141414`)**: Subtle tone reserved for state transitions, media hover overlays, and tertiary content surfaces.

## Typography

Typography establishes the architectural pace of the layout. Three distinct typefaces fulfill dedicated operational roles:

1. **Syne (Display & Primary Headlines)**: Distinctive, geometric, and unapologetically bold. Syne provides the sculptural, brutalist hook in oversized dimensions. Tightly track display sizes (`-0.03em` to `-0.04em`) with compressed line heights for solid textual mass.
2. **Hanken Grotesk (Body & Secondary Systems)**: A refined, contemporary grotesque that balances functional neutralism with modern craftsmanship. Delivers transparent legibility across extended reading passages and case study narratives.
3. **Space Mono (Indices, Metadata & Micro-Labels)**: Imparts structural rigor and technical calibration. All monospaced typography must be rendered in uppercase with deliberate letter-spacing (`0.08em` to `0.12em`).

## Layout & Spacing

The spatial architecture is driven by an asymmetric 12-column fluid grid system bounded by generous outer margins. 

### Grid Configuration
- **Desktop (>= 1200px)**: 12-column asymmetric distribution. Standard content arrangements embrace off-center weight: 7-column primary project showcases paired with 4-column contextual briefs and a 1-column negative space offset. Gutter is fixed at `2rem`, outer margins at `3rem`.
- **Tablet (768px - 1199px)**: 8-column layout. Gutters compress to `1.5rem`, outer margins to `2rem`. Project cards shift to balanced 4-column or stacked 8-column compositions.
- **Mobile (< 768px)**: 4-column layout. Gutters compress to `1rem`, outer margins to `1.25rem`. Content stacks sequentially into full-width vertical bands.

### Spacing Rhythm
Vertical cadence relies on deliberate hyper-expansion. Between major portfolio sections, allocate `space-2xl` to `space-3xl` to preserve editorial breathing room. Micro-rhythm inside components adheres to a strict 8px progression.

## Elevation & Depth

Elevation is conveyed purely through surface contrast, structural alignment, and low-contrast borders. Drop shadows, directional lighting, and skeuomorphic bevels are strictly forbidden.

- **Hairline Framing**: Spatial boundaries are defined by `1px` solid hairlines in `#262626`. Vertical grid lines may run through the entire layout to reveal the structural canvas underneath.
- **Planar Stacking**: Layer depth is communicated through tonal shifts (`#0B0B0B` base to `#141414` raised). Overlays, drawers, and modal sheets sit flush against borders with zero ambient shadow.
- **Media Luminance**: Color and depth reside within case study media assets (images, motion captures, WebGL viewports). The UI acts as a dark frame, intensifying the perceived brightness and spatial presence of client work.

## Shapes

The geometric vocabulary is uncompromisingly sharp (`roundedness: 0`). 

- Every structural element—including cards, interactive buttons, modal frames, video viewports, and tag pills—features exact 90-degree right angles with `0px` border radii.
- The visual identity reflects industrial precision, print layout discipline, and architectural blueprints. Form follows structure; circular elements are limited strictly to functional glyph indicators (such as live status dots) measuring no larger than `6px`.

## Components

### Buttons
- **Primary Action**: Sharp rectangular container with `#F4F4F4` background, `#0B0B0B` text in `Space Mono` (`12px`, uppercase, bold), and `16px 32px` padding. Hover: Inverts to `#0B0B0B` background with a `1px` inset border of `#F4F4F4` and `#F4F4F4` text.
- **Secondary / Ghost**: `1px` solid border in `#262626`, transparent background, `#F4F4F4` text. Hover: Border color transitions instantly to `#F4F4F4`.
- **Text Link / Arrow Button**: Underline-free text in `Hanken Grotesk` followed by an ASCII or inline geometric arrow (`->`). Hover: Arrow slides horizontally by `4px` with no easing deceleration.

### Chips & Metadata Tags
- Built with `1px` `#262626` solid borders, `0px` radius, and transparent backgrounds.
- Text rendered in `Space Mono` (`10px` or `12px`), uppercase with `0.1em` letter-spacing.
- Padding: `4px 10px`. No active toggle shadow; selected states invert background to `#F4F4F4` and text to `#0B0B0B`.

### Editorial Case Study Lists
- Full-width rows divided by `1px` `#262626` horizontal hairlines.
- Asymmetrical column distribution: Column 1 (`Space Mono` index: `01`, `02`), Column 2 (`Syne` project title: `headline-md`), Column 3 (`Hanken Grotesk` discipline/scope), Column 4 (`Space Mono` year/client).
- Hover state: Row background subtly shifts to `#141414`, revealing a floating media preview cursor.

### Form Inputs & Checkboxes
- **Inputs**: Flat bottom-border only (`1px` `#262626`) or full hairline boxes. Transparent background, crisp `#F4F4F4` caret, and input text in `Hanken Grotesk` (`16px`). Placeholder set in `#8E8E8E`. Focus: Border transitions to `#F4F4F4`.
- **Checkboxes**: Unrounded `16x16px` square box with `1px` `#262626` border. Checked state renders a solid `#F4F4F4` fill with an inverted miniature black checkmark or simple filled square.

### Project & Media Showcase Cards
- Completely borderless or framed by a hairline perimeter (`#262626`).
- Image containers maintain locked aspect ratios (`16:10` or `4:5`) with `overflow: hidden`. Images render in rich high contrast; on hover, subtle optical scale (`scale(1.02)`) over a crisp 400ms linear ease.
- Card caption sits below the media viewport: Client title in `Syne` (`headline-md`) aligned left, technical sector tag in `Space Mono` aligned right.

### Custom Status Badges
- Precision micro-elements featuring a `4px` glowing live dot (`#F4F4F4` or subtle warm white) accompanied by uppercase monospaced text (e.g., `"AVAILABLE FOR Q3 / TOKYO — NYC"`).