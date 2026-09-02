# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences:

- **Public visitors** — people looking to buy or rent a property in Morón/Castelar (Buenos Aires, Argentina). They browse and search listings by city, state (venta/alquiler), and max price, view property detail pages, and reach out via WhatsApp or the contact form.
- **Julián Cabrera and staff** — the agency's own team, who manage the property catalog (create, edit, activate/deactivate, delete, mark as "destacada") through a protected `/admin` panel backed by Supabase auth + RLS.

## Product Purpose

A self-owned marketing and listing site for Cabrera Inmobiliaria (public-facing brand: "juliancabrerapropiedades"), a family real estate agency in Morón, Buenos Aires. It lets the agency publish and manage its own property listings (casa, departamento, PH, local; venta/alquiler) without depending entirely on third-party portals, and lets prospects find a property and make direct contact. Success is a visitor finding a relevant listing and reaching the agency (WhatsApp message, contact form submission, or call).

## Positioning

Local family trust and direct attention, not portal-scale inventory: 30+ years serving the Morón/Castelar community, family-run since 1990, direct WhatsApp/phone contact with the agency itself rather than a lead-gen funnel on a large anonymous portal (ZonaProp, Argenprop, etc.).

## Operating Context

- Public site: home (search + hero + latest listings), property listing/search page, property detail page, about ("Nosotros"), contact ("Contacto").
- Admin panel (`/admin`, login-gated): paginated property list with toggle-active, edit, delete, and a create/edit property form (`/admin/nueva`, `/admin/editar/:id`).
- Data and auth via Supabase (`propiedades` table for listings, `consultas` table for contact-form leads, Supabase Auth + RLS for admin access).
- Contact channels published site-wide: WhatsApp (click-to-chat with prefilled message), phone, email, physical address (PTE D. F. Sarmiento 2401, Morón), and an embedded map on the About page.
- Site is Spanish-language (es-AR), single Vite + React SPA, no native app wrapper.

## Capabilities and Constraints

- Listings have: type (casa/departamento/PH/local), city, state (venta/alquiler), price, address, images, active flag, "destacada" (featured) flag.
- Property search on the public site filters by city, state, and max price.
- Contact form writes leads directly into Supabase (`consultas` table); no CRM integration beyond that today.
- Admin write access requires authentication; row-level security enforces who can mutate `propiedades`.
- **Planned/roadmap (not yet built):** the admin panel should eventually be able to push/sync published listings out to third-party portals such as ZonaProp and Argenprop, in addition to (or instead of manually re-entering data on) those platforms. No integration exists yet — this is a stated direction for future work, not a current capability.

## Brand Commitments

- Name: **Cabrera Inmobiliaria**, public-facing domain/brand "juliancabrerapropiedades" (juliancabrerapropiedades.com.ar).
- Run by **Julián Cabrera**, martillero (licensed Argentine real estate broker), the firm's responsable comercial.
- Family in the community since the 1960s; in the real estate business since 1990.
- Existing logo asset at `public/images/icons/logo-v2.png`.
- Established brand fonts: Manrope (sans) and Fraunces (serif), loaded via Google Fonts; brand color tokens already defined in CSS/Tailwind (`--accent`, `--terracota`, `--whatsapp`, `--cta-dark`, etc.).
- WhatsApp is a primary, explicitly branded contact channel throughout the site (dedicated button component, prefilled messages).

## Evidence on Hand

- Real published contact details: phone `4624-7581`, email `info@juliancabrerapropiedades.com.ar`, address `PTE D. F. SARMIENTO 2401, Morón`, WhatsApp number `+54 11 3333-3274`.
- Stated tenure claim: "30+ años" / family in the area since the 1960s, in the business since 1990.
- No customer testimonials, case studies, sales figures, or press mentions exist in the codebase or content today — future work must not invent any.

## Product Principles

- The agency's own site is a direct-contact and self-managed-inventory alternative to third-party portals, not a copy of them.
- Direct, low-friction contact (WhatsApp first) matters more than a heavy lead-qualification flow.
- Admin tooling should stay lean and fast for one small team managing a modest catalog, not a full multi-tenant CRM.
- Listing data is the durable source of truth; any future portal-sync work (ZonaProp/Argenprop) should be additive and must not compromise the agency's own site as the canonical listing manager.
