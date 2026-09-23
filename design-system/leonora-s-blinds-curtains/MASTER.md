# Leonora's Blinds & Curtains

## Art direction

An independent home-textile atelier: tactile, calm, locally grounded, and quietly expressive.
Use the warmth of real interiors and the restraint of an editorial lookbook.
Let the work and photography lead; do not make the brand feel like a SaaS dashboard, a generic contractor, or a luxury hotel chain.

## Design tokens

| Role | Token | Value |
| --- | --- | --- |
| Main canvas | `--paper` | `#f4f1e9` |
| Light surface | `--paper-light` | `#faf8f3` |
| Soft surface | `--paper-deep` | `#e8e1d5` |
| Main text | `--ink` | `#292c26` |
| Supporting text | `--ink-soft` | `#53564f` |
| Deep canvas | `--forest` | `#252a24` |
| Warm accent | `--clay` | `#79583e` |
| Light accent | `--sand` | `#c7b69b` |
| Fine rules | `--line` | `rgba(41, 44, 38, .18)` |

Use clay for short labels, understated emphasis, and progress indicators, not large blocks of text.
Pair light text with the forest surface and dark text with the paper surfaces.
Do not rely on muted colors alone to communicate selection.

## Type

- Display: Playfair Display, primarily regular weight, with restrained italic emphasis.
- Body and controls: Manrope, minimum 16px for standard copy.
- Utility labels: DM Mono, uppercase sparingly, never below 12px where practical.
- Headlines are editorial and large, but avoid condensed tracking that harms legibility.

## Layout and components

- Use generous breathing room, fine warm-gray rules, square or subtly softened corners, and asymmetry inspired by an editorial spread.
- Keep primary actions clear and solid; secondary actions are simple underlined text links.
- Services use spare custom line drawings rather than invented project photography.
- Portfolio images are user-supplied local assets, with informative captions and direct selection controls.
- Keep phone and Facebook contact routes visible because the static GitHub Pages site has no form backend.
- Mobile layouts prioritize readable type, tap targets of at least 44px, and native horizontal scrolling for the thumbnail rail.

## Motion and accessibility

- Reveal sections with a short fade and an 18px upward settle; stagger only small sibling groups.
- Open featured photography with a one-second curtain reveal and transition gallery changes with a brief fade.
- Keep all animation additive and optional. No autoplay, scroll-jacking, long parallax, or motion needed to understand content.
- Respect `prefers-reduced-motion` and provide visible keyboard focus, semantic landmarks, alt text, and keyboard-operable controls.
- Animate transforms and opacity only when practical; lazy-load below-the-fold images.
