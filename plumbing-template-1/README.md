# Plumbing Website Template

A fast, responsive, single-page marketing site template for plumbing / drainage
contractors. No build step, no dependencies, no framework.

## Structure

```
plumbing-template/
├── index.html    markup + copy + SEO metadata + JSON-LD
├── styles.css    design tokens, layout, components, animations
├── script.js     scroll reveal, mobile nav, sticky header, parallax, form
└── README.md
```

## Sections

Emergency bar (24/7) · Nav · Hero · Trust bar · Services grid (6) · Emergency CTA ·
Upfront pricing · Service area · Testimonials (3) · Contact + form · Footer

## Customizing for a client

Every client-specific string is a bracketed placeholder. Find and replace across
`index.html`:

| Placeholder | Replace with |
| --- | --- |
| `[Business Name]` | The client's business name |
| `(555) 123-4567` | Their phone number (also in every `tel:+15551234567` link) |
| `service@yourbusiness.com` | Their email (also in the `mailto:` links) |
| `[Street Address]`, `[City]`, `[ST]`, `[ZIP]` | Their address |
| `[Service Area]` | The region they cover |
| `[Town One]` … `[Town Eight]` | The towns in the service-area chips |
| `[Year]` | Year founded |
| `[##]`, `[####]`, `[#.#]` | Trust-bar stats and hero response time |
| `$[##]` | Real call-out / service fee |
| `[License Number]` | Contractor license number (footer) |
| `[Customer Name]` | Real testimonial attribution |
| `https://www.example.com/` | The live domain (canonical + Open Graph + JSON-LD) |

Also update: the `<title>`, `<meta name="description">`, the Open Graph block, the
JSON-LD `Plumber` schema, the favicon emoji, and the footer social links.

> **Pricing disclosure:** the `.finance-fine` paragraph and the `$[##]` call-out figure
> are placeholders. Replace them with your real pricing policy before the site ships.

### Images

Image placeholders are `<div class="media" data-label="…">` elements. Each has a fixed
`aspect-ratio`, so swapping in a real photo causes **no layout shift**:

```html
<img src="images/plumber.jpg" alt="Plumber fitting a new valve"
     width="1200" height="1500" loading="lazy" />
```

Keep the `width`/`height` attributes and give every image a descriptive `alt`.

### Colors & type

All theming lives in the `:root` block at the top of `styles.css`. The palette pairs a
deep ocean-blue primary with a warm copper accent and a fresh aqua secondary — the
water-and-pipework feel. Change `--color-primary`, `--color-accent`, and `--color-cool`
to re-skin. Fonts are two families (Sora for display, Inter for body).

### The contact form

`script.js` validates and shows a success message, but does **not** send anything.
Wire it to Formspree, Netlify Forms, or your own endpoint before going live.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- Respects `prefers-reduced-motion` — all animation, including the pulsing emergency dot,
  is disabled for users who ask for it.
- Keyboard accessible: skip link, focus rings, Escape closes the mobile nav.
- No external JS/CSS dependencies; the only network request is Google Fonts.
