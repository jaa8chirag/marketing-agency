# Cordinit Media — Website Project Brief

> Source: `Confidential Media_Brief.pdf`, dated 06-Sep-2026. Saved here as text (the original PDF file itself wasn't available on disk — this is a full transcription of its content) so it lives alongside [`REQUIREMENTS_TRACKER.md`](./REQUIREMENTS_TRACKER.md) as the source of truth. Note: the source PDF redacts the parent holding-company name as **"Confidential"** throughout — replace with the real name before this doc is shared externally.
>
> **Implementation note (2026-09-29), not part of the original brief:** §5's tech stack table recommends a headless CMS (Sanity/Strapi/Payload). By your decision, this build instead uses a **custom PostgreSQL + Prisma backend with a bespoke admin panel** (login + CRUD screens covering Capabilities, Services, Industries, Case Studies, Insights, Testimonials, and Client Logos), plus real `Lead` and `NewsletterSubscriber` tables for the contact/booking and newsletter flows described in §9.10 and the Website Flow addendum. The content model, relationships, and every field this brief specifies are preserved — only the storage/editing mechanism differs from the brief's suggested off-the-shelf CMS. See `docs/REQUIREMENTS_TRACKER.md` for live build status and `prisma/schema.prisma` for the resulting schema.

Integrated Creative • Production • Digital • Media • Performance • Automation • Growth

**Purpose:** Define the business model, brand architecture, information architecture, UX/UI direction, content model, technical requirements, CMS structure and delivery expectations for the Confidential Media public website.

**Positioning principle:** Confidential Media is the creative, media and growth company within the Confidential ecosystem. It should feel like a modern, technology-enabled integrated partner — not a generic "360° digital marketing agency."

**Prepared for:** Confidential leadership, design team, content/marketing team and web development team.

---

## 1. Project Summary

Confidential Media is a specialist business within the broader Confidential ecosystem, focused on creative, media, production, digital experiences and measurable growth. The website must establish Confidential Media as a credible integrated partner that can support a client from an initial business or marketing challenge through strategy, creative development, production, digital execution, media activation, performance optimization and ongoing growth.

The website is not just a brochure. It is the commercial foundation for a scalable media business and should be built as a modular, CMS-driven content platform. It must support future expansion into new services, industries, case studies, specialist teams, acquired businesses, client-facing tools and technology-enabled marketing services without requiring a rebuild.

### What we are building in this phase

- Responsive, high-performance, SEO-ready public website for Confidential Media.
- Capabilities-led information architecture covering Brand & Creative, Content & Production, Website & Digital Experiences, Digital Marketing, Media, Performance Marketing, Automation & AI, and Commerce & Growth.
- Dedicated work/case study experience for client proof.
- Insights hub for articles/blog content, reports, guides, white papers, videos, and perspectives.
- Industry pages that connect industry challenges to relevant capabilities and proof.
- Confidential Ecosystem page explaining the relationship between Confidential, Confidential Media and future specialist/acquired businesses.
- CMS-driven content relationships so one case study can appear on relevant capability, service and industry pages.
- Lead capture and newsletter infrastructure designed to connect to a future CRM and marketing automation stack.

---

## 2. Business & Brand Model

### 2.1 Confidential Architecture

```
Confidential
│
├── Confidential Technology
│     Technology • Transformation • Engineering
│
└── Confidential Media
      Creative • Media • Production • Growth
      │
      ├── Brand & Creative
      ├── Content & Production
      ├── Website & Digital Experiences
      ├── Digital Marketing
      ├── Media
      ├── Performance Marketing
      ├── Automation & AI
      └── Commerce & Growth
      │
      └── Future specialist / acquired businesses
```

Confidential Media should be a distinct brand, not merely a marketing department inside Confidential. The model should allow future acquisitions or specialist companies to retain their own brand equity where strategically appropriate, while gaining access to Confidential's technology, infrastructure, clients, talent and operating capabilities.

### 2.2 Positioning

**Recommended positioning:** Confidential Media is a creative, media and digital growth company helping brands build, launch, market and scale in a connected digital world.

**Core differentiator:** Creative + Technology + Performance. Make people care. Make experiences work. Make growth measurable.

### 2.3 What Confidential Media should NOT look like

- A generic "360° digital marketing agency".
- A list of commodity services such as SEO | SEM | Social Media | Graphic Design.
- A website where creative, production, web, media and performance appear as unrelated departments.
- A portfolio-only agency site without a clear business-growth proposition.

---

## 3. Goals

| Goal | Why it matters |
|---|---|
| Establish a premium, credible first impression | The site itself must demonstrate the quality, creativity and digital maturity Confidential Media sells. |
| Clearly communicate capabilities | Visitors should quickly understand what Confidential Media can do and where to enter based on their need. |
| Generate qualified leads | Primary commercial purpose is project enquiries and conversations with decision-makers. |
| Show proof of execution | Work, case studies, outcomes, client logos and testimonials build trust. |
| Differentiate from generic agencies | Position the company at the intersection of creative, technology and measurable growth. |
| Create SEO foundation | Capabilities, services, industries, work and insights provide long-term organic acquisition opportunities. |
| Enable cross-selling | A client entering through website services should discover media, production, performance, automation and growth capabilities. |
| Support acquisition strategy | The group architecture must be able to accommodate specialist/acquired businesses. |
| Create a scalable CMS | Marketing should be able to add and manage content without developer involvement. |
| Establish the Confidential ecosystem | Confidential Media should connect clearly to the wider Confidential technology and transformation business. |

---

## 4. Target Audience

**Primary**
- CMOs and Marketing Directors
- Brand Directors and Heads of Brand
- Founders and CEOs
- Growth and Revenue leaders
- Digital and E-commerce leaders
- Product and Technology leaders
- Business decision-makers seeking an integrated agency partner

**Secondary**
- Potential acquisition targets and agency owners
- Creative agencies, production houses and performance agencies
- Technology and marketing partners
- Creators and production talent
- Potential employees
- Investors and strategic partners

### 4.1 Client Need → Capability Mapping

| Client need / intent | Confidential Media capability |
|---|---|
| "I need a new brand." | Brand & Creative |
| "I need content/video." | Content & Production |
| "I need a new website." | Website & Digital Experiences |
| "I need a digital product or platform." | Website & Digital Experiences |
| "I need better online visibility." | Digital Marketing |
| "I need more leads." | Performance Marketing |
| "I need someone to manage media." | Media |
| "I need marketing automation." | Automation & AI |
| "I need to grow e-commerce." | Commerce & Growth |
| "I need an integrated campaign." | Integrated Creative + Media + Performance |

---

## 5. Recommended Tech Stack (same as coordit website)

The website should retain the API-first, modular and performance-first architecture used as the basis for the existing Confidential website brief.

| Layer | Recommendation | Requirement |
|---|---|---|
| Frontend | Next.js / React + TypeScript | SSR/SSG where appropriate; indexable content must not depend on client-only rendering. |
| Styling | Tailwind CSS + design tokens | Tokens should come from approved Figma/design system. |
| CMS | Sanity / Strapi / Payload or approved headless CMS | All marketing content must be editable by non-developers. |
| API | REST or GraphQL | Dynamic content and forms should use an API layer. |
| Hosting | AWS / GCP / Azure | Confirm with technical lead. |
| CI/CD | GitHub Actions or equivalent | Merge to main deploys to staging; production deployment controlled. |
| Assets | CDN + responsive image delivery | Required for high-volume visual/video content. |
| Containers | Docker | Environment consistency. |
| Forms | Server-side handling + validation | Spam protection, structured storage and CRM-ready webhook/API. |
| Analytics | GA4 + GTM + approved advertising pixels | Consent-aware tracking and event taxonomy. |
| Email | Approved ESP | Newsletter signup and transactional confirmation. |

---

## 6. Site Structure — Information Architecture

This section is the source of truth for navigation, routing and CMS relationships.

| Level | URL Path | Page / Description |
|---|---|---|
| L1 | `/` | Home |
| L1 | `/capabilities` | Capabilities overview |
| L2 | `/capabilities/brand-creative` | Brand & Creative |
| L3 | `/capabilities/brand-creative/brand-strategy` | Brand Strategy |
| L3 | `/capabilities/brand-creative/branding` | Branding |
| L3 | `/capabilities/brand-creative/creative-campaigns` | Creative Campaigns |
| L2 | `/capabilities/content-production` | Content & Production |
| L3 | `/capabilities/content-production/video-production` | Video Production |
| L3 | `/capabilities/content-production/ugc` | UGC & Creator Content |
| L3 | `/capabilities/content-production/photography` | Photography |
| L3 | `/capabilities/content-production/post-production` | Post Production |
| L2 | `/capabilities/digital-experiences` | Website & Digital Experiences |
| L3 | `/capabilities/digital-experiences/websites` | Website Development |
| L3 | `/capabilities/digital-experiences/ux-ui` | UX/UI |
| L3 | `/capabilities/digital-experiences/ecommerce` | E-commerce Websites |
| L3 | `/capabilities/digital-experiences/digital-products` | Digital Products / Platforms |
| L2 | `/capabilities/digital-marketing` | Digital Marketing |
| L3 | `/capabilities/digital-marketing/social-media` | Social Media |
| L3 | `/capabilities/digital-marketing/seo` | SEO |
| L3 | `/capabilities/digital-marketing/content-marketing` | Content Marketing |
| L3 | `/capabilities/digital-marketing/influencer-marketing` | Influencer & Creator Marketing |
| L2 | `/capabilities/media` | Media |
| L3 | `/capabilities/media/media-strategy` | Media Strategy |
| L3 | `/capabilities/media/media-planning-buying` | Media Planning & Buying |
| L3 | `/capabilities/media/paid-media` | Paid Media |
| L3 | `/capabilities/media/programmatic` | Programmatic |
| L2 | `/capabilities/performance-marketing` | Performance Marketing |
| L3 | `/capabilities/performance-marketing/lead-generation` | Lead Generation |
| L3 | `/capabilities/performance-marketing/customer-acquisition` | Customer Acquisition |
| L3 | `/capabilities/performance-marketing/cro` | Conversion Optimization |
| L3 | `/capabilities/performance-marketing/analytics` | Performance Analytics |
| L2 | `/capabilities/automation-ai` | Automation & AI |
| L3 | `/capabilities/automation-ai/marketing-automation` | Marketing Automation |
| L3 | `/capabilities/automation-ai/crm` | CRM & Lifecycle |
| L3 | `/capabilities/automation-ai/ai-marketing` | AI for Marketing |
| L3 | `/capabilities/automation-ai/personalization` | Personalization |
| L2 | `/capabilities/commerce-growth` | Commerce & Growth |
| L3 | `/capabilities/commerce-growth/ecommerce-growth` | E-commerce Growth |
| L3 | `/capabilities/commerce-growth/cro` | Conversion Optimization |
| L3 | `/capabilities/commerce-growth/acquisition` | Customer Acquisition |
| L3 | `/capabilities/commerce-growth/retention` | Customer Retention |
| L1 | `/industries` | Industries overview |
| L2 | `/industries/[slug]` | Industry detail template |
| L1 | `/work` | Work / Case Studies |
| L2 | `/work/[slug]` | Case study detail |
| L1 | `/insights` | Insights hub |
| L2 | `/insights/[slug]` | Insight/article/resource detail |
| L2 | `/insights/category/[category]` | Optional category/filter view |
| L1 | `/about` | About Confidential Media |
| L1 | `/ecosystem` | Confidential ecosystem |
| L1 | `/contact` | Contact / Start a Project |
| L1 | `/careers` | Careers — footer/utility access in V1 |
| L1 | `/legal/privacy-policy` | Privacy Policy |
| L1 | `/legal/terms-of-service` | Terms of Service |
| L1 | `/404` | Not Found |
| L1 | `/500` | Server Error |

### 6.1 Navigation

| Navigation layer | Items |
|---|---|
| Primary | Capabilities \| Industries \| Work \| Insights \| About |
| Primary CTA | Start a Project |
| Utility | Confidential \| Careers \| Contact |
| Footer | Full sitemap, capabilities, industries, work, insights, about, ecosystem, careers, social, legal, newsletter |

### 6.2 Careers / Blog / Case Studies / Resources

| Section | V1 treatment | Implementation |
|---|---|---|
| Careers | Not a primary navigation item | Accessible in footer/utility navigation. Can be promoted later. |
| Blog | No separate Blog section | Blog/articles are a content type/category inside Insights. |
| Case Studies | Required | Dedicated Work / Case Studies experience; also reusable on capability/service/industry pages. |
| Resources | No separate Resources section | Guides, reports, whitepapers, downloads and similar content live inside Insights. |
| Insights | Primary content hub | Articles, case studies where appropriate, reports, guides, whitepapers, videos and perspectives. |

> **Developer rule:** Do not create separate hardcoded Blog or Resources systems. Use one centralized Insights content model. Case Studies must have a dedicated Work experience because client proof is a primary commercial conversion asset.

---

## 7. Overall Website Model

The site should behave as a connected content and conversion system, not as a collection of isolated pages.

```
CLIENT NEED
   ↓
CAPABILITY
   ↓
SERVICE
   ↓
RELEVANT WORK / PROOF
   ↓
INDUSTRY CONTEXT
   ↓
INSIGHT / EDUCATION
   ↓
START A PROJECT
```

### 7.1 Core content relationships

| Entity | Must relate to |
|---|---|
| Capability | Services, Industries, Work, Insights |
| Service | Parent Capability, Industries, Work, Insights |
| Industry | Capabilities, Services, Work, Insights |
| Case Study | Multiple Capabilities, Services and Industries |
| Insight | Capability, Service, Industry, Content Type |
| Team Member | Capabilities / Expertise where applicable |
| Testimonial | Client / Case Study / Capability where applicable |

### 7.2 Example customer journey

```
Visitor searches: "B2B website development agency"
   ↓
Website & Digital Experiences
   ↓
Website Development
   ↓
Relevant website case studies
   ↓
Technology / industry proof
   ↓
Start a Project
   ↓
Lead captured with "Website" interest
   ↓
Future CRM / marketing automation
```

---

## 8. Capability Architecture & Service Scope

### 01. Brand & Creative
- Brand Strategy
- Brand Positioning
- Naming & Identity
- Brand Architecture
- Creative Strategy
- Campaign Concepts
- Creative Direction
- Art Direction
- Copywriting
- Advertising Creative
- Communication Strategy

### 02. Content & Production
- Video Production
- Corporate / Brand Films
- Product Videos
- Social Video / Reels
- Photography
- UGC
- Creator Campaigns
- Influencer Content
- Animation
- Motion Graphics
- VFX
- Editing
- Color Grading
- Sound Design
- Post Production

### 03. Website & Digital Experiences
- Corporate Websites
- Marketing Websites
- Campaign Websites
- Landing Pages
- E-commerce Websites
- UX/UI Design
- Design Systems
- Web Applications
- Digital Platforms
- CMS Development
- API Integrations
- Conversion-focused Experiences

### 04. Digital Marketing
- Social Strategy
- Social Media Management
- Community Management
- SEO
- Technical SEO
- Content Marketing
- Blogs
- Thought Leadership
- Influencer Marketing
- Creator Marketing
- Email / Newsletter Marketing

### 05. Media
- Media Strategy
- Audience Planning
- Media Planning
- Media Buying
- Paid Search
- Paid Social
- Programmatic
- Display
- YouTube / Video Media
- Retail Media
- Campaign Measurement

### 06. Performance Marketing
- Lead Generation
- Customer Acquisition
- Conversion Optimization
- Retargeting
- Funnel Optimization
- Landing Page Optimization
- ROAS / ROI Optimization
- Performance Analytics
- Attribution

### 07. Automation & AI
- Marketing Automation
- CRM Setup / Integration
- Lead Nurturing
- Customer Journeys
- Lifecycle Marketing
- AI Content Workflows
- AI Marketing
- AI Chatbots
- Lead Qualification
- Personalization
- Marketing Operations

### 08. Commerce & Growth
- E-commerce Strategy
- E-commerce Growth
- Marketplace Strategy
- Product Page Optimization
- CRO
- Social Commerce
- Retail Media
- Customer Acquisition
- Retention
- Loyalty

---

## 9. Page-by-Page Requirements

### 9.1 Home Page
- Hero: positioning, supporting copy, primary CTA, secondary CTA and high-impact visual/showreel.
- Value proposition: Creative Thinking, Connected Execution, Technology Advantage, Measurable Growth.
- Capabilities overview: 8 capability cards.
- Client Need → Capability module for high-intent entry points.
- Integrated operating model: Think → Create → Build → Launch → Grow → Scale.
- Featured work / case studies.
- Industries teaser.
- Social proof: logos, testimonials, verified metrics and awards where approved.
- Confidential ecosystem module.
- Insights teaser.
- Final CTA banner.
- Footer.

**Recommended homepage copy direction**

> **Hero:** Creative. Media. Technology. Growth.
>
> Confidential Media connects creative, production, digital, media and performance to help ambitious brands build, launch and grow.

### 9.2 Capabilities Hub
- Overview of all eight capabilities.
- Clear service hierarchy under each capability.
- Entry points based on client intent.
- Related work and industries.
- CTA to start a project.
- CMS-driven and reusable.

### 9.3 Capability Overview Template
- Capability hero.
- Business problems solved.
- Service list.
- Approach / methodology.
- Deliverables.
- Featured work.
- Relevant industries.
- Related capabilities.
- Relevant insights.
- CTA.

### 9.4 Service Detail Template
- Service definition.
- Client problem.
- Approach.
- Deliverables.
- Technology / platforms where relevant.
- Expected outcomes — only verified/defensible claims.
- Related work.
- Related services.
- FAQ section if SEO/content strategy requires it.
- CTA.

### 9.5 Industries
- Industry overview grid.
- Industry detail template.
- Industry-specific challenges.
- Relevant capabilities/services.
- Relevant case studies.
- Relevant insights.
- CTA.

### 9.6 Work / Case Studies
- Filter by capability, service and industry.
- Case study cards should show client, challenge, capabilities and outcome where available.
- Case study detail: Client → Challenge → Objective → Strategy → Creative → Execution → Technology → Media → Results → Gallery.
- Support multiple capability/service/industry relationships.
- Related case studies.
- CTA.

### 9.7 Insights
- Central editorial hub.
- Filters by capability, industry, topic and content type.
- Article/resource detail template.
- Author, date, reading time, share controls.
- Related content.
- Related capabilities.
- Optional gated downloads with lead capture.
- Case studies may be indexed as a content type here for editorial discovery, while remaining accessible through `/work`.

### 9.8 About
- Who we are.
- Company story.
- Vision, mission and values.
- Leadership/team.
- How Confidential Media connects to Confidential.
- Operating philosophy.
- CTA.

### 9.9 Ecosystem
- Explain Confidential as the parent ecosystem.
- Explain Confidential Technology.
- Explain Confidential Media.
- Explain future specialist/acquired businesses.
- Show connected capabilities without implying that future entities already exist.
- Design so new businesses can be added later.

### 9.10 Contact / Start a Project
- Name, work email, company, job title, country, website, area of interest, optional budget and project description.
- Area of interest must pull from the same CMS taxonomy as Capabilities.
- Success/error states.
- Confirmation email.
- Internal notification.
- Structured database storage.
- Webhook/API for future CRM.

### 9.11 Careers
Careers is not a primary navigation item in V1. It should be accessible from the footer/utility navigation and use a CMS-driven structure that can be expanded later.

---

## 10. Functional Requirements

- All marketing copy, service names, capability content, industries, case studies, insights, testimonials and team data must be CMS-editable.
- Content relationships must be managed through references, not duplicated manually.
- Search across Work, Insights, Capabilities and Services.
- Newsletter signup connected to approved email service provider.
- Analytics event tracking for major CTA and conversion actions.
- Consent-aware tracking where required.
- Forms must have client- and server-side validation.
- Spam protection and rate limiting.
- Clear form success/error states.
- All pages must have editable SEO metadata.
- All images require alt text in CMS.
- Case study filtering must be dynamic.
- Capability/service taxonomy must be reusable in contact forms and filters.
- Multi-environment support: local, staging, production.
- 404 and 500 pages.
- Redirect management capability in CMS or deployment layer.

---

## 11. CMS / Content Model

| Content Type | Key fields / relationships |
|---|---|
| Capability | Name, slug, summary, hero, body, services, industries, work, insights, SEO |
| Service | Name, slug, parent capability, summary, body, deliverables, industries, work, insights, SEO |
| Industry | Name, slug, overview, challenges, capabilities, services, work, insights, SEO |
| Case Study | Client, slug, challenge, objective, strategy, execution, results, metrics, gallery, capabilities, services, industries, testimonial, SEO |
| Insight | Title, slug, content type, author, date, reading time, category, capability, service, industry, body, assets, CTA, SEO |
| Team Member | Name, role, bio, photo, expertise, capability relationships, social links |
| Testimonial | Quote, person, role, company, case study/capability relationship |
| Client Logo | Client name, logo, industry, approved display flag |
| CTA | Title, supporting text, CTA label, destination |
| Site Settings | Global navigation, footer, social, contact details, analytics IDs, legal links |

The content model must allow new capabilities/services/industries to be added without code changes, subject to approved taxonomy.

---

## 12. Design & UX Requirements

### 12.1 Brand expression
- Distinct from Confidential Technology while visibly part of the Confidential ecosystem.
- Premium, bold, creative, modern and digital-native.
- Strong editorial/art-direction approach.
- Visual storytelling should be a first-class experience.
- Design must work equally well for corporate decision-makers and creative audiences.

### 12.2 Design system
- Design tokens for color, typography, spacing, radius, shadows and semantic states.
- Reusable component library.
- Responsive variants for all components.
- Documented interaction states.
- Accessible contrast and focus states.
- Motion system with reduced-motion behavior.
- No hardcoded design values in reusable components where tokens should be used.

### 12.3 Visual content
- Use high-quality project imagery, video, campaign work and motion.
- Support hero video/showreel where performance allows.
- Provide static fallback/poster image for video.
- Optimize media for mobile.
- Do not sacrifice performance for visual effects.

### 12.4 Key UX principle

> **Findability:** A visitor should understand within seconds what Confidential Media does, which capability fits their need, see proof of relevant work, and have a clear path to Start a Project.

---

## 13. SEO Requirements

- Server-rendered or statically generated indexable pages.
- Editable title and meta description for every indexable page.
- Editable OG title, description and image.
- Canonical URLs.
- XML sitemap.
- Robots.txt.
- Semantic HTML and proper heading hierarchy.
- Breadcrumbs.
- JSON-LD where applicable: Organization, Article, BreadcrumbList and other relevant schema.
- Clean URL structure.
- Internal linking between capabilities, services, industries, work and insights.
- Indexable service and industry pages.
- SEO-friendly pagination/filter strategy.
- Redirect support for changed slugs.

**SEO content strategy note:** The site should target high-intent service searches such as website development, video production, performance marketing, media buying, marketing automation and related industry/service combinations. Final keyword strategy should be developed by marketing/SEO before content production.

---

## 14. Analytics & Conversion Tracking

| Event | Purpose |
|---|---|
| `start_project_click` | Primary CTA engagement |
| `contact_form_start` | Form intent |
| `contact_form_submit` | Lead conversion |
| `newsletter_signup` | Audience acquisition |
| `case_study_view` | Proof engagement |
| `service_view` | Service intent |
| `capability_view` | Capability intent |
| `insight_view` | Content engagement |
| `resource_download` | Lead/content conversion |
| `video_start` / `video_complete` | Media engagement |
| `outbound_click` | External partner/platform activity |

All analytics implementation must follow the approved consent and privacy requirements.

---

## 15. Non-Functional Requirements

**Performance**
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Lighthouse target: 90+ on mobile and desktop.
- CDN delivery for images and static assets.
- Responsive image formats and srcset.
- Lazy loading below the fold.
- Video compression, poster images and adaptive delivery where appropriate.

**Accessibility**
- WCAG 2.1 AA minimum.
- Keyboard navigable.
- ARIA labels where required.
- Accessible forms and errors.
- Sufficient contrast.
- Alt text required for CMS imagery.
- Reduced-motion support.

**Responsive**
- Mobile
- Tablet
- Desktop
- Test on real devices.

**Security**
- HTTPS enforced.
- Input sanitization and validation.
- Rate limiting.
- CSP headers.
- No secrets/API keys in client-side code.
- Environment variables + secrets manager.
- CMS/admin protected with strong authentication; MFA recommended.

---

## 16. Recommended Repository Structure

```
/Confidential-media
├── /app
│   ├── /components
│   ├── /features
│   ├── /lib
│   ├── /styles
│   ├── /types
│   └── /api
├── /public
│   ├── /images
│   ├── /icons
│   └── /videos
├── /cms
│   ├── /schemas
│   ├── /capabilities
│   ├── /services
│   ├── /industries
│   ├── /case-studies
│   └── /insights
├── /tests
├── /docs
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## 17. Forward Compatibility

- API-first architecture for dynamic content and form data.
- Lead schema designed for future CRM.
- Authentication architecture should be able to support a future client portal.
- The design system should be reusable for future Confidential Media client-facing applications.
- CMS content model should support additional capability/service depth without code changes.
- Case study and capability taxonomy should be reusable by future dashboards and AI systems.
- Analytics events should use stable naming so future reporting platforms can consume them.
- Acquisition/specialist-business architecture should allow new businesses to be added to the ecosystem without restructuring the main site.

**Future platform direction:** Potential future journey: Brief → Strategy → Creative → Approval → Production → Media → Performance → Reporting → Optimization. The v1 website does not implement this platform; it should simply avoid blocking it.

---

## 18. Competitor / Market Reference Framework

These companies are reference points for business architecture, capability organization and market positioning. They are not templates to copy visually or verbally. Confidential Media should develop its own identity and proposition.

| Reference | What to learn | Implication for Confidential Media |
|---|---|---|
| Monk | Connection of media, creativity, production, commerce and technology; integrated content production. | Make connected execution and scalable content a core proposition. |
| Instrument | Platform/"Connecting Company" model; agency brands can coexist with shared operational backbone. | Build an ecosystem model rather than a single-service agency structure. |

---

## 19. Deliverables & Milestones

| Phase | Deliverable | Primary owner(s) |
|---|---|---|
| 1. Discovery & Architecture | Final sitemap, taxonomy, content model, user journeys, requirements confirmation | Strategy + Marketing + Design + Tech |
| 2. Design System | Brand application, typography, colors, components, responsive system, motion principles | Design |
| 3. Technical Setup | Repository, CI/CD, staging, CMS, analytics foundation, environments | Development |
| 4. Core Pages | Home, About, Contact, Ecosystem | Design + Development |
| 5. Capabilities | Capabilities hub, capability templates, service detail templates | Design + Development + Content |
| 6. Industries | Industry hub + detail template | Design + Development + Content |
| 7. Work | Work hub, filters, case study template | Design + Development + Content |
| 8. Insights | Insights hub, filters, article/resource template | Design + Development + Content |
| 9. Integrations | Forms, newsletter, analytics, pixels, CRM-ready webhook | Development + Marketing Ops |
| 10. QA & Launch | Accessibility, performance, SEO, security, device/browser testing | QA + Development + Design |
| 11. Launch | Production deployment, DNS, monitoring, analytics verification, sitemap submission | Development + Marketing |

---

## 20. Definition of Done

- [ ] Functionally matches this brief.
- [ ] Responsive on mobile, tablet and desktop.
- [ ] Passes WCAG 2.1 AA requirements.
- [ ] Lighthouse target ≥90.
- [ ] All marketing content is CMS-editable.
- [ ] Capability/service/industry/work/insight relationships work correctly.
- [ ] SEO metadata exists for every indexable page.
- [ ] Structured data implemented where applicable.
- [ ] Forms validated client + server side.
- [ ] Forms protected against spam and abuse.
- [ ] Analytics events implemented and verified.
- [ ] Images and video optimized.
- [ ] No critical console errors.
- [ ] Cross-browser tested.
- [ ] Real-device tested.
- [ ] Code reviewed and merged through PR.
- [ ] CMS schemas documented.
- [ ] Component library documented.
- [ ] API/integration documentation complete.
- [ ] Deployment and environment documentation complete.
- [ ] No secrets committed to repository.
- [ ] Redirects and 404/500 behavior verified.
- [ ] Content ownership and approval responsibilities confirmed.

---

## 21. Final Website Model — One-Page Reference

```
Confidential MEDIA
Creative • Media • Production • Digital Growth

PRIMARY NAV
Capabilities | Industries | Work | Insights | About
CTA: Start a Project

CAPABILITIES
01 Brand & Creative
02 Content & Production
03 Website & Digital Experiences
04 Digital Marketing
05 Media
06 Performance Marketing
07 Automation & AI
08 Commerce & Growth

CONTENT SYSTEM
Capabilities ↔ Services ↔ Industries ↔ Work ↔ Insights

CLIENT JOURNEY
Need → Capability → Service → Proof → Industry Context → Contact

V1 CONTENT RULES
Blog → Insights
Resources → Insights
Case Studies → Work (+ discoverable in Insights)
Careers → Footer / Utility

PRIMARY CONVERSION
Start a Project → Structured Lead → Future CRM / Automation
```

---

## Website Flow & Customer Journey — Implementation Flow

### 1. Global Conversion Principle

Each commercial page should use one clear, outcome-led primary CTA: **Book a Call**. Secondary CTAs support discovery, such as *Explore related solutions* or *View insights*. The global Book a Call CTA should open `/contact?intent=book-a-call`.

### 2. End-to-End Website Journey

Visitor enters → discovers a solution, industry, accelerator or insight → selects a relevant CTA → explores further or converts → confirmation → Confidential receives the lead and attribution context.

**Recommended Book a Call journey:** Book a Call → `/contact?intent=book-a-call` → qualification form → embedded scheduling → select available date/time → meeting created → confirmation + calendar invitation → reminder → meeting.

### 3. Book a Call — Final Field Set

CTA → `/contact?intent=book-a-call` → Qualification → Schedule → Select time → Confirm → Calendar invite → Reminder → Meeting

**Book a Call micro-flow**
- First Name*
- Last Name*
- Work Email*
- Company*
- Job Title
- Area of Interest*
- What would you like help with?*
- Consent checkbox*

**Area of Interest:** Cybersecurity; Salesforce; AI & Automation; Cloud & Infrastructure; Application Engineering; Data & Integration; Managed Services; Something else.

> Note: this Area of Interest list (Cybersecurity, Salesforce, etc.) is copied from a sister-brand tech-services brief and does not match Confidential Media's own capability taxonomy (Brand & Creative, Content & Production, etc.) used elsewhere in this document. Flag with the client — the site's actual "Area of Interest" field should pull from Confidential Media's 8 capabilities, not this list.

### 4. Hidden Lead & Attribution Data

- Source / landing page
- CTA location
- Solution / service
- Industry
- Accelerator
- Insight/content
- UTM Source / Medium / Campaign / Content
- Referrer
- Submission date/time
- Booking date/time

**Example:** Cybersecurity → Vulnerability Management → Book a Call should retain both the practice and specific service context.

### 5. Confirmation States

**General enquiry:** "Thank you — we have received your enquiry. We will be in touch soon." Then *Explore Solutions* and *View Insights*.

**Booked call:** "You're booked." Show date/time and meeting details, confirm the calendar invitation was sent, and provide reschedule/cancel options where supported.

### 6. Tracking Events

- `book_call_click`
- `contact_form_view`
- `contact_form_start`
- `contact_form_submit`
- `contact_form_success`
- `contact_form_error`
- `solution_explore`
- `industry_explore`
- `accelerator_explore`
- `insight_read`
- `newsletter_view`
- `newsletter_start`
- `newsletter_submit`
- `newsletter_success`

### General Contact / Enquiry Journey

| Field | Required | Purpose |
|---|---|---|
| First name | Yes | Contact identity |
| Last name | Yes | Contact identity |
| Work email | Yes | Response / lead identity |
| Company | Yes | Organisation context |
| Job title | Recommended | Role/context |
| Area of interest | Yes | Solution qualification |
| What would you like help with? | Yes | Requirement |
| Consent | Yes | Permission to respond |

Submit → client/server validation → spam protection → confirmation email → internal notification → database storage → confirmation page with *Explore Solutions* and *View Insights*.

### Insights Journey

Insights Hub → search/filter → featured/latest content → Read Article / Case Study / Report → `/insights/[slug]` → related content / Solutions → Book a Call.

**Newsletter:** Insights → Work email + consent → Subscribe → success state. Newsletter is separate from the Book a Call journey.

### Final notes from this section

- Book a Call is the consistent primary commercial CTA.
- Book a Call opens the booking-intent contact route and retains source context.
- If live scheduling is embedded, remove the manual Preferred time field.
- Use Confidential-approved calendar availability and meeting configuration.
- Successful bookings create the meeting and send the visitor a calendar invitation/confirmation.
- General enquiry submissions validate, use spam protection, notify the internal team, send visitor confirmation and store data for future CRM use.
- Solutions taxonomy is centrally managed and reused by the contact form and relevant filters/related-content modules.
- Track conversion source and relevant solution/industry/accelerator/insight context.
- Do not publish unconfirmed response times, contact details or team-routing information.
- Calendar, email, CRM and analytics accounts/configuration should remain under Confidential control.

**Preferences for integration:** [calendly.com](https://calendly.com/) or [cal.com](https://cal.com/ai) — or an affordable platform that gives more flexibility.

---

## Website Design Reference

- https://www.dmsukltd.com/services/
- https://www.influencer.com/

## Competitors

- https://www.monks.com/
- https://www.schbang.com/
- https://mysterymonks.com/
- https://www.pangolinmarketing.com/
- https://nowmedia.in/
- https://www.nitrousdesign.com/
- https://www.bridgenext.com/ (only for reference)
- https://shabangslo.com/experiences/

**Proposed Navigation Map:** `Cordinit_Media_Advanced_Navigation_and_User_Flows.xlsx` (referenced in the brief as an attached spreadsheet — not included in the PDF text; ask the client for this file if the navigation map needs cross-checking beyond §6 above).

---

## ⚠️ Design Note — High Creative Expectation

This is a **creative-first, experience-led website**. The UI, graphics, typography, motion, interaction, transitions, imagery, video and navigation should feel **modern, premium, experimental and distinctive**. Advanced web interactions and emerging technologies should be explored where they strengthen the experience. The website itself must demonstrate **Creative + Media + Technology + AI** capabilities and should feel like a **showcase of Cordinit Media's own work**, not a conventional agency/template website. Creativity must be balanced with usability, performance, accessibility and conversion.
