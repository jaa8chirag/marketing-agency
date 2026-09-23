// Central content model for Cordinit Media.
// UI-only static data — designed so this shape can later be swapped for a headless CMS
// (Sanity / Strapi / Payload) without changing any page templates.

export type Service = {
  slug: string;
  name: string;
  hook: string;
  definition: string;
  forWhen: string[];
  approach: { title: string; description: string }[];
  deliverables: string[];
  outcomes: string[];
};

export type Capability = {
  num: string;
  slug: string;
  name: string;
  shortName: string;
  clientNeed: string;
  tagline: string;
  summary: string;
  heroDescription: string;
  problems: string[];
  deliverables: string[];
  industries: string[];
  services: Service[];
};

export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  challenges: string[];
  capabilities: string[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  year: string;
  summary: string;
  capabilities: string[];
  industry: string;
  challenge: string;
  objective: string;
  strategy: string;
  creative: string;
  execution: string;
  technology: string;
  media: string;
  results: { metric: string; label: string }[];
};

export type Insight = {
  slug: string;
  title: string;
  type: "Article" | "Guide" | "Report" | "Perspective" | "Video" | "Whitepaper";
  summary: string;
  body: string[];
  capability?: string;
  industry?: string;
  author: string;
  date: string;
  readingTime: string;
};

export const capabilities: Capability[] = [
  {
    num: "01",
    slug: "brand-creative",
    name: "Brand & Creative",
    shortName: "Brand & Creative",
    clientNeed: "“I need a new brand.”",
    tagline: "Give people a reason to care.",
    summary:
      "Strategy, positioning and creative direction that give a business a distinct, ownable point of view before a single asset gets made.",
    heroDescription:
      "We build brands the way we build campaigns — with a strategic spine underneath. Positioning, naming, identity and creative direction that hold up across every channel, market and format a growing business will need.",
    problems: [
      "The brand looks like everyone else in the category.",
      "Positioning changes depending on who in the company you ask.",
      "Creative output feels disconnected from business strategy.",
    ],
    deliverables: [
      "Brand strategy & positioning framework",
      "Naming and verbal identity",
      "Visual identity & brand architecture",
      "Campaign concepts and creative platforms",
    ],
    industries: ["consumer-lifestyle", "hospitality-real-estate", "fintech-financial-services"],
    services: [
      {
        slug: "brand-strategy",
        name: "Brand Strategy",
        hook: "The thinking before the design.",
        definition:
          "A structured process to define who a brand is for, what it stands for, and why it deserves to win — turned into a framework the whole business can use to make decisions.",
        forWhen: [
          "Leadership can't agree on what the brand actually stands for.",
          "You're entering a new market, category or audience.",
          "Marketing, sales and product all tell a different story.",
        ],
        approach: [
          { title: "Discovery", description: "Stakeholder interviews, category audit and audience research to find the real gap." },
          { title: "Positioning", description: "A single, defensible position built around a genuine competitive advantage." },
          { title: "Architecture", description: "How the brand, sub-brands and offers relate to one another as the business grows." },
          { title: "Activation framework", description: "Messaging pillars and a voice guide that creative and content teams can run with." },
        ],
        deliverables: ["Positioning statement", "Audience & competitive audit", "Brand architecture map", "Messaging pillars", "Voice & tone guide"],
        outcomes: ["A single source of truth for every future creative decision", "Faster creative sign-off because the strategy already did the arguing"],
      },
      {
        slug: "branding",
        name: "Branding",
        hook: "Identity systems built to scale, not just launch.",
        definition:
          "Visual and verbal identity — logo, typography, colour, motion and language — built as a flexible system rather than a one-off design.",
        forWhen: [
          "The current identity doesn't reflect where the business is headed.",
          "Design is inconsistent across product, marketing and social.",
          "You're preparing for a rebrand, merger, or new product line.",
        ],
        approach: [
          { title: "Concept exploration", description: "Multiple distinct creative territories, stress-tested against the strategy." },
          { title: "System design", description: "Logo, type, colour, imagery style and motion principles built to work together." },
          { title: "Guidelines", description: "A living brand system, not a static PDF — built for design and marketing teams to actually use." },
          { title: "Rollout support", description: "Templates and training so the identity survives contact with day-to-day production." },
        ],
        deliverables: ["Logo & identity system", "Typography & colour system", "Brand guidelines", "Templates for key touchpoints"],
        outcomes: ["A recognisable identity across every channel", "Design decisions made in minutes, not weeks"],
      },
      {
        slug: "creative-campaigns",
        name: "Creative Campaigns",
        hook: "Ideas built to travel across every channel.",
        definition:
          "Campaign concepts and creative direction that translate a brand platform into ideas people actually stop for — across paid, social, film, out-of-home and experiential.",
        forWhen: [
          "Recent campaigns have felt like disconnected one-offs.",
          "You need a big idea that can flex across many channels and formats.",
          "Creative and media teams aren't briefed from the same platform.",
        ],
        approach: [
          { title: "Creative platform", description: "One idea, flexible enough to hold a year of campaigns without going stale." },
          { title: "Concept development", description: "Multiple executions, art directed and copywritten to a production-ready standard." },
          { title: "Channel adaptation", description: "The idea reshaped — not just resized — for each format and platform." },
          { title: "Campaign toolkit", description: "Assets and guidelines handed to media and production without losing the idea." },
        ],
        deliverables: ["Creative platform & key visual", "Campaign concepts", "Channel adaptation guidelines", "Copy & art direction"],
        outcomes: ["Campaigns that are recognisably ‘on brand’ without being repetitive", "One idea reused profitably across a full media plan"],
      },
    ],
  },
  {
    num: "02",
    slug: "content-production",
    name: "Content & Production",
    shortName: "Content & Production",
    clientNeed: "“I need content/video.”",
    tagline: "Make things worth watching.",
    summary:
      "Video, photography, UGC and post-production built for how content actually gets consumed — fast, social-first, and at the volume modern marketing demands.",
    heroDescription:
      "From brand films to the ten pieces of social content shot in a single afternoon — our production model is built for both the flagship moment and the relentless weekly output modern channels need.",
    problems: [
      "Production is too slow or expensive to keep up with content demand.",
      "Hero campaign films don't translate into usable social content.",
      "Creator and UGC content feels disconnected from brand quality standards.",
    ],
    deliverables: [
      "Brand films & product video",
      "Photography & content shoots",
      "UGC & creator campaigns",
      "Editing, motion & post-production",
    ],
    industries: ["consumer-lifestyle", "hospitality-real-estate", "healthcare-wellness"],
    services: [
      {
        slug: "video-production",
        name: "Video Production",
        hook: "From brand films to product and social video.",
        definition:
          "End-to-end video production — concept, shoot, edit — for brand films, product videos and social-first formats.",
        forWhen: [
          "You need a flagship brand or campaign film.",
          "Product launches need video across multiple platforms.",
          "In-house teams can't keep pace with video demand.",
        ],
        approach: [
          { title: "Pre-production", description: "Concept, scripting, storyboarding and shot planning against the brief." },
          { title: "Production", description: "Full crew or lean creator-led shoots, matched to the format and budget." },
          { title: "Post-production", description: "Edit, colour, sound design and motion graphics to a broadcast-ready finish." },
          { title: "Cutdown strategy", description: "One shoot engineered to deliver hero, mid-form and social cutdowns." },
        ],
        deliverables: ["Hero brand/product film", "Channel-specific cutdowns", "Raw asset library", "Captioned social versions"],
        outcomes: ["One production day, months of usable content", "Consistent visual quality across every cut"],
      },
      {
        slug: "ugc",
        name: "UGC & Creator Content",
        hook: "Native-feeling content that still protects the brand.",
        definition:
          "Creator-sourced and UGC-style content programmes, briefed and quality-controlled to feel authentic while staying on-brand.",
        forWhen: [
          "Polished ads are underperforming against native creator content.",
          "You need volume and variety for constant paid social testing.",
          "There's no system for sourcing, briefing or rights-managing creators.",
        ],
        approach: [
          { title: "Creator sourcing", description: "Matching creators to audience and category, not just follower count." },
          { title: "Briefing system", description: "Guardrails that protect brand and message without killing authenticity." },
          { title: "Production management", description: "Rights, usage and delivery handled end-to-end." },
          { title: "Performance feedback loop", description: "Content iterated against what's actually converting in paid." },
        ],
        deliverables: ["Creator brief templates", "Sourced & managed creator roster", "UGC content library", "Usage rights documentation"],
        outcomes: ["A constant supply of testable ad creative", "Lower cost-per-asset than traditional production"],
      },
      {
        slug: "photography",
        name: "Photography",
        hook: "Product, lifestyle and brand imagery, shot for reuse.",
        definition:
          "Photography planned around every channel it needs to serve — e-commerce, campaign, social and editorial — in a single efficient shoot.",
        forWhen: [
          "Product imagery is inconsistent across e-commerce and marketing.",
          "You need a shoot that serves paid, social, PR and web at once.",
          "Current imagery doesn't reflect the current brand direction.",
        ],
        approach: [
          { title: "Shot planning", description: "A shot list mapped to every channel that will use the output." },
          { title: "Art direction", description: "Styling, set and lighting direction consistent with the brand system." },
          { title: "Production", description: "Studio or location shoots, managed end-to-end." },
          { title: "Retouch & delivery", description: "Colour-graded, retouched, and delivered in every required format." },
        ],
        deliverables: ["Product & lifestyle imagery", "Retouched final assets", "Format variants for e-commerce & social", "Usage-ready asset library"],
        outcomes: ["One shoot, reused across every channel for a full season", "Consistent visual quality across the catalogue"],
      },
      {
        slug: "post-production",
        name: "Post Production",
        hook: "Editing, motion, VFX and sound that finish the story.",
        definition:
          "Editing, colour grading, motion graphics, animation and sound design that turn raw footage into channel-ready assets.",
        forWhen: [
          "Footage exists but there's no capacity to finish it properly.",
          "Motion graphics and animation need to match brand guidelines.",
          "Multiple cutdowns are needed from a single piece of hero content.",
        ],
        approach: [
          { title: "Assembly edit", description: "Story-first cut built from the raw footage or supplied assets." },
          { title: "Motion & VFX", description: "Animated titles, graphics and effects layered to brand spec." },
          { title: "Colour & sound", description: "Grading and sound design for a consistent, premium finish." },
          { title: "Format delivery", description: "Every cutdown, aspect ratio and caption style the media plan needs." },
        ],
        deliverables: ["Finished edits & cutdowns", "Motion graphics & animation", "Colour grade", "Sound design & mix"],
        outcomes: ["A consistent finished look across all content", "Faster turnaround from raw footage to publish-ready asset"],
      },
    ],
  },
  {
    num: "03",
    slug: "digital-experiences",
    name: "Website & Digital Experiences",
    shortName: "Digital Experiences",
    clientNeed: "“I need a new website.”",
    tagline: "Build experiences that work, not just look good.",
    summary:
      "Marketing websites, e-commerce platforms and digital products built on modern, API-first architecture — designed to convert and engineered to scale.",
    heroDescription:
      "We design and build websites and digital products with the same rigour we bring to campaigns: research-led UX, a real design system, and an engineering approach that won't need a rebuild in eighteen months.",
    problems: [
      "The website doesn't reflect the brand or convert visitors into leads.",
      "Marketing can't update content without waiting on developers.",
      "The current platform can't support planned growth or new markets.",
    ],
    deliverables: [
      "UX research, IA & wireframes",
      "Design systems & UI design",
      "CMS-driven website builds",
      "E-commerce & digital product development",
    ],
    industries: ["technology-saas", "ecommerce-retail", "fintech-financial-services"],
    services: [
      {
        slug: "websites",
        name: "Website Development",
        hook: "Corporate, marketing and campaign websites, built to be edited.",
        definition:
          "Responsive, SEO-ready websites on a modular, headless-CMS architecture — fast to build, and editable by marketing without developer involvement.",
        forWhen: [
          "The current site is slow, hard to maintain, or hard-coded.",
          "Marketing needs to publish and update pages independently.",
          "The site needs to support growth into new services or markets.",
        ],
        approach: [
          { title: "Discovery & IA", description: "Sitemap, content model and user journeys mapped before any design starts." },
          { title: "Design system", description: "Reusable, token-based components designed for every page type up front." },
          { title: "Build", description: "Next.js / React front-end on a headless CMS, API-first from day one." },
          { title: "SEO & performance", description: "Core Web Vitals, structured data and clean URLs built in, not bolted on." },
        ],
        deliverables: ["Sitemap & content model", "Design system & UI kit", "CMS-driven website", "SEO foundation & analytics setup"],
        outcomes: ["A site marketing can maintain without a dev ticket", "A platform that can grow without a rebuild"],
      },
      {
        slug: "ux-ui",
        name: "UX/UI",
        hook: "Research-led design for interfaces people actually use.",
        definition:
          "User research, information architecture and interface design for websites, products and platforms — grounded in how people actually behave, not assumptions.",
        forWhen: [
          "Users are dropping off at a specific step in a journey.",
          "The interface feels inconsistent across screens and teams.",
          "A new product or platform needs a design system from scratch.",
        ],
        approach: [
          { title: "Research", description: "User interviews, journey mapping and usability review of the current state." },
          { title: "Information architecture", description: "Structure and flows that match how users actually think and search." },
          { title: "UI design", description: "High-fidelity, token-based interface design, prototyped and tested." },
          { title: "Design system", description: "Documented components and states so design and engineering stay in sync." },
        ],
        deliverables: ["User research & journey maps", "Wireframes & prototypes", "High-fidelity UI design", "Design system documentation"],
        outcomes: ["Measurable improvement in task completion and conversion", "A design system engineering can build from directly"],
      },
      {
        slug: "ecommerce",
        name: "E-commerce Websites",
        hook: "Storefronts built to convert and easy to merchandise.",
        definition:
          "E-commerce platform design and build — storefront UX, product discovery, checkout and merchandising tools that reduce friction between browse and buy.",
        forWhen: [
          "Conversion rate lags behind the quality of the traffic you're buying.",
          "The current platform makes merchandising slow and manual.",
          "You're migrating platforms or launching a new storefront.",
        ],
        approach: [
          { title: "Conversion audit", description: "Funnel and UX review to find where revenue is currently leaking." },
          { title: "Storefront design", description: "Product discovery, PDP and checkout UX designed around real shopping behaviour." },
          { title: "Platform build", description: "Headless or platform-native builds (Shopify, and equivalent) suited to scale." },
          { title: "Merchandising enablement", description: "Tools and templates so commercial teams can merchandise without developers." },
        ],
        deliverables: ["Conversion audit", "Storefront UX & UI", "E-commerce platform build", "Merchandising & CRO toolkit"],
        outcomes: ["A measurable lift in conversion rate", "A storefront the commercial team can run day-to-day"],
      },
      {
        slug: "digital-products",
        name: "Digital Products / Platforms",
        hook: "Client portals, tools and platforms beyond the marketing site.",
        definition:
          "Design and front-end build of digital products and platforms — client portals, internal tools and product experiences — on an API-first architecture.",
        forWhen: [
          "You need a client-facing portal or self-serve tool.",
          "A product idea needs a design-validated prototype before engineering investment.",
          "An internal tool needs a usable interface built around real workflows.",
        ],
        approach: [
          { title: "Product discovery", description: "Requirements, user flows and technical constraints mapped together." },
          { title: "Prototyping", description: "Clickable prototypes tested before committing to full engineering." },
          { title: "Interface design", description: "Component-based UI designed for the platform's real states and edge cases." },
          { title: "Front-end build", description: "API-first front-end architecture ready to connect to any backend or CRM." },
        ],
        deliverables: ["Product discovery documentation", "Prototypes", "UI design & design system", "Front-end implementation"],
        outcomes: ["A validated product direction before heavy engineering spend", "A front-end architecture ready for future integration"],
      },
    ],
  },
  {
    num: "04",
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Digital Marketing",
    clientNeed: "“I need better online visibility.”",
    tagline: "Be found, be followed, be quoted.",
    summary:
      "Social, SEO, content and influencer marketing that build durable organic visibility instead of chasing algorithm changes.",
    heroDescription:
      "Visibility that compounds. We combine organic search, content, social and creator marketing into one connected system — built on the same content and brand foundation as everything else we make.",
    problems: [
      "Organic visibility isn't growing despite consistent content output.",
      "Social channels are active but disconnected from business goals.",
      "SEO and content sit in a different plan from brand and campaigns.",
    ],
    deliverables: [
      "Social strategy & community management",
      "Technical & content SEO",
      "Content marketing & thought leadership",
      "Influencer & creator marketing",
    ],
    industries: ["consumer-lifestyle", "technology-saas", "healthcare-wellness"],
    services: [
      {
        slug: "social-media",
        name: "Social Media",
        hook: "Strategy, content and community management that compounds.",
        definition:
          "Social strategy, content planning and community management built around platform-native behaviour, not repurposed ad creative.",
        forWhen: [
          "Growth has plateaued despite regular posting.",
          "Content feels reactive rather than strategic.",
          "Community engagement isn't being managed consistently.",
        ],
        approach: [
          { title: "Platform strategy", description: "Channel priorities and content pillars matched to where the audience actually is." },
          { title: "Content planning", description: "A calendar built around formats that perform, not just what's easy to make." },
          { title: "Community management", description: "Active, on-brand engagement that builds trust, not just reach." },
          { title: "Performance review", description: "Monthly reporting that ties content back to awareness and pipeline." },
        ],
        deliverables: ["Social strategy & content pillars", "Content calendar", "Community management", "Monthly performance reporting"],
        outcomes: ["Consistent, compounding audience growth", "A content engine that doesn't depend on one channel"],
      },
      {
        slug: "seo",
        name: "SEO",
        hook: "Technical and content SEO built for long-term compounding.",
        definition:
          "Technical SEO, content strategy and on-page optimisation designed to build durable organic visibility across the sitemap.",
        forWhen: [
          "Organic traffic is flat or declining despite content investment.",
          "The site has technical issues limiting how it's indexed.",
          "Service and industry pages aren't ranking for high-intent searches.",
        ],
        approach: [
          { title: "Technical audit", description: "Crawl, indexation and Core Web Vitals review across the whole site." },
          { title: "Keyword & content strategy", description: "High-intent terms mapped to capability, service and industry pages." },
          { title: "On-page optimisation", description: "Metadata, structured data and internal linking implemented systematically." },
          { title: "Ongoing iteration", description: "Ranking and traffic data used to prioritise the next round of content." },
        ],
        deliverables: ["Technical SEO audit", "Keyword & content strategy", "On-page optimisation", "Monthly ranking & traffic reporting"],
        outcomes: ["Durable organic traffic growth", "Service and industry pages that rank for buyer-intent search"],
      },
      {
        slug: "content-marketing",
        name: "Content Marketing",
        hook: "Editorial content and thought leadership that earns attention.",
        definition:
          "Blog, guide, report and thought-leadership content built on one editorial content model — planned around SEO, sales enablement and brand authority together.",
        forWhen: [
          "Content is produced ad hoc without a clear editorial strategy.",
          "Sales needs credible, shareable material for the funnel.",
          "The brand wants to build category authority, not just post updates.",
        ],
        approach: [
          { title: "Editorial strategy", description: "Content pillars and formats mapped to funnel stage and audience." },
          { title: "Production", description: "Writing, design and video produced against a consistent editorial calendar." },
          { title: "Distribution", description: "Content pushed through owned, earned and paid channels, not left to be found." },
          { title: "Measurement", description: "Content tied to traffic, leads and sales enablement usage." },
        ],
        deliverables: ["Editorial strategy & calendar", "Articles, guides & reports", "Distribution plan", "Content performance reporting"],
        outcomes: ["A content engine sales can actually use", "Compounding organic reach through evergreen content"],
      },
      {
        slug: "influencer-marketing",
        name: "Influencer & Creator Marketing",
        hook: "Creator partnerships that build trust, not just reach.",
        definition:
          "Influencer and creator marketing programmes — sourcing, briefing, negotiation and campaign management — built around audience fit over follower count.",
        forWhen: [
          "Influencer activity has been one-off rather than a repeatable programme.",
          "You need trusted third-party voices to support a launch.",
          "Current partnerships aren't translating into measurable performance.",
        ],
        approach: [
          { title: "Creator strategy", description: "Tiering and audience-fit criteria matched to campaign goals." },
          { title: "Sourcing & negotiation", description: "Outreach, vetting and contracting managed end-to-end." },
          { title: "Campaign management", description: "Briefing, content review and publishing coordinated across creators." },
          { title: "Performance tracking", description: "Reach, engagement and conversion tracked back to the campaign." },
        ],
        deliverables: ["Creator strategy & tiering", "Sourced creator roster", "Campaign management", "Performance reporting"],
        outcomes: ["A repeatable creator marketing programme", "Trusted third-party content driving measurable results"],
      },
    ],
  },
  {
    num: "05",
    slug: "media",
    name: "Media",
    shortName: "Media",
    clientNeed: "“I need someone to manage media.”",
    tagline: "Put the work in front of the right people.",
    summary:
      "Media strategy, planning and buying across paid search, paid social, programmatic and video — built on audience data, not guesswork.",
    heroDescription:
      "Media that's planned, not just bought. We connect audience strategy, channel planning and buying discipline so every media dollar is working toward a measurable outcome.",
    problems: [
      "Media spend is scattered across channels without a unifying strategy.",
      "Performance is reported per-channel with no view of overall efficiency.",
      "Campaign creative and media planning happen in separate silos.",
    ],
    deliverables: [
      "Media & audience strategy",
      "Cross-channel media planning",
      "Paid search, paid social & programmatic buying",
      "Campaign measurement & optimisation",
    ],
    industries: ["ecommerce-retail", "fintech-financial-services", "hospitality-real-estate"],
    services: [
      {
        slug: "media-strategy",
        name: "Media Strategy",
        hook: "The plan that connects audience, channel and budget.",
        definition:
          "A media strategy that defines audience, channel mix and budget allocation before a single impression is bought.",
        forWhen: [
          "Channel decisions are made ad hoc, campaign by campaign.",
          "There's no clear view of which channels drive incremental results.",
          "Budget needs a defensible, data-backed allocation model.",
        ],
        approach: [
          { title: "Audience definition", description: "First-party and market data used to define who media should actually reach." },
          { title: "Channel strategy", description: "Channel mix modelled against reach, cost and funnel stage." },
          { title: "Budget allocation", description: "Investment split by expected marginal return, not historical habit." },
          { title: "Measurement plan", description: "KPIs and attribution approach agreed before launch, not after." },
        ],
        deliverables: ["Audience strategy", "Channel mix & budget plan", "Measurement framework", "Media strategy deck"],
        outcomes: ["A defensible, data-backed media plan", "Clear KPIs agreed before spend goes live"],
      },
      {
        slug: "media-planning-buying",
        name: "Media Planning & Buying",
        hook: "Execution discipline across every major platform.",
        definition:
          "Hands-on planning and buying across search, social, display and video — platform expertise paired with daily optimisation.",
        forWhen: [
          "Campaigns are live but not being actively optimised.",
          "You need specialist buying expertise across multiple platforms.",
          "Media execution needs to move faster than an internal team can manage.",
        ],
        approach: [
          { title: "Campaign build", description: "Targeting, creative rotation and bidding structure set up per platform best practice." },
          { title: "Launch & QA", description: "Tracking and tagging verified before spend starts." },
          { title: "Daily optimisation", description: "Bids, budgets and creative adjusted against live performance data." },
          { title: "Reporting cadence", description: "Regular, transparent reporting against agreed KPIs." },
        ],
        deliverables: ["Campaign build & setup", "Ongoing buying & optimisation", "Creative rotation plan", "Weekly performance reports"],
        outcomes: ["Media spend actively managed, not set-and-forget", "Consistent, transparent reporting against KPIs"],
      },
      {
        slug: "paid-media",
        name: "Paid Media",
        hook: "Paid search and paid social built to perform.",
        definition:
          "Paid search and paid social campaign management — account structure, creative testing and bid strategy tuned for efficient, scalable spend.",
        forWhen: [
          "Cost per acquisition is rising without a clear cause.",
          "Account structure hasn't been revisited in a long time.",
          "Creative testing isn't happening systematically.",
        ],
        approach: [
          { title: "Account audit", description: "Structure, targeting and historical performance reviewed for waste." },
          { title: "Rebuild & structure", description: "Campaigns rebuilt around efficient, testable account architecture." },
          { title: "Creative testing", description: "A constant testing cadence across ad formats and messaging." },
          { title: "Scaling plan", description: "Budget scaled against proven, efficient performance." },
        ],
        deliverables: ["Account audit", "Campaign structure & setup", "Creative testing roadmap", "Performance dashboard"],
        outcomes: ["Lower cost per acquisition at the same or greater volume", "A structured, ongoing creative testing programme"],
      },
      {
        slug: "programmatic",
        name: "Programmatic",
        hook: "Automated, data-driven buying at scale.",
        definition:
          "Programmatic display and video buying across DSPs — audience targeting, inventory quality and bid strategy managed for efficient scale.",
        forWhen: [
          "You need reach beyond what search and social alone can deliver.",
          "Brand safety and inventory quality need active management.",
          "Retargeting and prospecting need to be run as one connected system.",
        ],
        approach: [
          { title: "DSP setup", description: "Platform and inventory sources selected against campaign goals." },
          { title: "Audience & targeting", description: "First-party and contextual data layered for efficient reach." },
          { title: "Brand safety controls", description: "Inventory and placement quality actively monitored." },
          { title: "Optimisation", description: "Bids and audiences refined against conversion and viewability data." },
        ],
        deliverables: ["DSP & inventory strategy", "Audience targeting setup", "Brand safety monitoring", "Performance reporting"],
        outcomes: ["Efficient scale beyond search and social", "Quality-controlled inventory and placements"],
      },
    ],
  },
  {
    num: "06",
    slug: "performance-marketing",
    name: "Performance Marketing",
    shortName: "Performance Marketing",
    clientNeed: "“I need more leads.”",
    tagline: "Make growth measurable.",
    summary:
      "Lead generation, conversion optimisation and funnel analytics built to turn traffic into pipeline — with every result tied back to a number.",
    heroDescription:
      "Performance marketing without the guesswork. We build full-funnel systems — from acquisition through conversion — and report on the metrics that actually connect to revenue.",
    problems: [
      "Traffic is growing but leads and revenue aren't following.",
      "There's no clear view of which channels are driving qualified pipeline.",
      "Landing pages and funnels haven't been tested in months.",
    ],
    deliverables: [
      "Lead generation programmes",
      "Conversion rate optimisation",
      "Funnel & landing page testing",
      "Performance analytics & attribution",
    ],
    industries: ["fintech-financial-services", "technology-saas", "ecommerce-retail"],
    services: [
      {
        slug: "lead-generation",
        name: "Lead Generation",
        hook: "Full-funnel programmes built to fill pipeline.",
        definition:
          "Lead generation programmes spanning paid, content and conversion design — built around a defined cost-per-qualified-lead target.",
        forWhen: [
          "Pipeline isn't keeping pace with the sales team's capacity.",
          "Lead quality is inconsistent across channels.",
          "There's no repeatable system connecting marketing spend to sales-ready leads.",
        ],
        approach: [
          { title: "Funnel mapping", description: "The journey from first touch to qualified lead mapped and instrumented." },
          { title: "Offer & channel strategy", description: "Lead magnets and channels matched to how the audience actually buys." },
          { title: "Conversion design", description: "Landing pages and forms designed and tested for qualified conversion." },
          { title: "Sales handoff", description: "Lead scoring and routing aligned with how sales actually works leads." },
        ],
        deliverables: ["Funnel & offer strategy", "Landing pages & forms", "Lead scoring model", "Monthly pipeline reporting"],
        outcomes: ["A predictable, repeatable lead volume", "Higher lead quality reaching the sales team"],
      },
      {
        slug: "customer-acquisition",
        name: "Customer Acquisition",
        hook: "Efficient growth across every acquisition channel.",
        definition:
          "Cross-channel customer acquisition strategy — balancing paid, organic and lifecycle channels against target CAC and payback period.",
        forWhen: [
          "Customer acquisition cost is rising faster than customer value.",
          "Growth depends too heavily on a single channel.",
          "There's no unified view of blended acquisition performance.",
        ],
        approach: [
          { title: "Channel diagnostic", description: "Current acquisition mix reviewed against cost, volume and quality." },
          { title: "Diversification plan", description: "New channels tested against a clear, capped budget and hypothesis." },
          { title: "Efficiency modelling", description: "Target CAC and payback period modelled by channel and cohort." },
          { title: "Scaling roadmap", description: "Budget shifted toward what's proven to work at increasing scale." },
        ],
        deliverables: ["Acquisition channel audit", "Diversification test plan", "CAC & payback modelling", "Quarterly growth roadmap"],
        outcomes: ["A more resilient, diversified acquisition mix", "Acquisition cost brought back in line with target"],
      },
      {
        slug: "cro",
        name: "Conversion Optimization",
        hook: "Structured testing that compounds conversion gains.",
        definition:
          "Conversion rate optimisation through structured, hypothesis-led testing across landing pages, forms and checkout flows.",
        forWhen: [
          "Traffic volume is healthy but conversion rate is underperforming.",
          "There's no formal testing process on key pages.",
          "Recent redesigns were based on opinion rather than data.",
        ],
        approach: [
          { title: "Behavioural audit", description: "Analytics, heatmaps and session recordings reviewed to find drop-off points." },
          { title: "Hypothesis backlog", description: "Prioritised test ideas ranked by expected impact and effort." },
          { title: "Testing", description: "A/B and multivariate tests run to a statistically sound standard." },
          { title: "Iteration", description: "Winning variants rolled out and the next round of tests queued." },
        ],
        deliverables: ["Behavioural audit", "Prioritised testing roadmap", "A/B test execution", "Monthly optimisation report"],
        outcomes: ["A compounding lift in conversion rate over time", "A repeatable, evidence-based testing process"],
      },
      {
        slug: "analytics",
        name: "Performance Analytics",
        hook: "Attribution and reporting you can actually trust.",
        definition:
          "Analytics infrastructure, dashboarding and attribution modelling that give a single, trustworthy view of what's driving performance.",
        forWhen: [
          "Different teams report different numbers for the same campaign.",
          "Tracking gaps mean some conversions aren't being captured.",
          "Attribution doesn't account for the full customer journey.",
        ],
        approach: [
          { title: "Tracking audit", description: "Analytics, tagging and consent implementation reviewed for gaps." },
          { title: "Attribution modelling", description: "A model matched to the business's actual sales cycle and channel mix." },
          { title: "Dashboarding", description: "A single reporting view stakeholders can trust and self-serve." },
          { title: "Ongoing governance", description: "Tracking maintained as campaigns, pages and platforms change." },
        ],
        deliverables: ["Tracking & tagging audit", "Attribution model", "Reporting dashboards", "Governance documentation"],
        outcomes: ["One trusted source of truth for performance data", "Attribution that reflects the real customer journey"],
      },
    ],
  },
  {
    num: "07",
    slug: "automation-ai",
    name: "Automation & AI",
    shortName: "Automation & AI",
    clientNeed: "“I need marketing automation.”",
    tagline: "Let the system do the repeatable work.",
    summary:
      "Marketing automation, CRM and AI-enabled workflows that nurture leads, personalise experiences and free the team from manual, repetitive work.",
    heroDescription:
      "We connect strategy to systems. Marketing automation, CRM architecture and applied AI that turn a good marketing plan into something that runs itself — consistently, at scale.",
    problems: [
      "Leads go cold because follow-up depends on manual effort.",
      "CRM data is inconsistent, so lifecycle marketing isn't possible.",
      "AI tools are being used ad hoc without a workflow or governance model.",
    ],
    deliverables: [
      "Marketing automation setup",
      "CRM architecture & integration",
      "Lifecycle & nurture journeys",
      "AI-enabled marketing workflows",
    ],
    industries: ["technology-saas", "fintech-financial-services", "ecommerce-retail"],
    services: [
      {
        slug: "marketing-automation",
        name: "Marketing Automation",
        hook: "Nurture journeys that run without manual effort.",
        definition:
          "Automated marketing workflows — email, lifecycle and lead-nurture sequences — built on the platforms a team already uses or is migrating to.",
        forWhen: [
          "Follow-up with leads happens manually, if at all.",
          "The same email is being built from scratch every campaign.",
          "Lifecycle stages have no defined, automated marketing response.",
        ],
        approach: [
          { title: "Journey mapping", description: "Lifecycle stages and triggers mapped against the real customer journey." },
          { title: "Platform setup", description: "Automation platform configured and connected to source data." },
          { title: "Workflow build", description: "Nurture, onboarding and re-engagement journeys built and tested." },
          { title: "Optimisation", description: "Journeys refined against open, click and conversion data." },
        ],
        deliverables: ["Journey maps", "Automated workflow builds", "Email & content templates", "Performance reporting"],
        outcomes: ["Consistent lead nurture without manual effort", "Higher conversion from existing lead volume"],
      },
      {
        slug: "crm",
        name: "CRM & Lifecycle",
        hook: "CRM architecture that marketing and sales both trust.",
        definition:
          "CRM setup, integration and lifecycle-stage design so marketing, sales and customer teams work from the same accurate data.",
        forWhen: [
          "CRM data is incomplete, duplicated or inconsistently used.",
          "Marketing and sales define lifecycle stages differently.",
          "The CRM isn't connected to the website, forms or ad platforms.",
        ],
        approach: [
          { title: "CRM audit", description: "Data quality, fields and current usage reviewed against actual needs." },
          { title: "Lifecycle design", description: "Stage definitions agreed and aligned across marketing and sales." },
          { title: "Integration", description: "Forms, ad platforms and tools connected via API or webhook." },
          { title: "Adoption support", description: "Documentation and training so the system is actually used." },
        ],
        deliverables: ["CRM audit & data model", "Lifecycle stage definitions", "Integration setup", "Team documentation & training"],
        outcomes: ["One accurate, shared view of every contact", "A CRM ready to power lifecycle and automation work"],
      },
      {
        slug: "ai-marketing",
        name: "AI for Marketing",
        hook: "AI workflows applied where they save real time.",
        definition:
          "Practical AI adoption across content workflows, lead qualification and personalisation — chosen for measurable impact over novelty.",
        forWhen: [
          "Content and campaign production takes too long to keep pace.",
          "Lead qualification and routing is still fully manual.",
          "The team wants to adopt AI tools but lacks a workflow or governance model.",
        ],
        approach: [
          { title: "Opportunity mapping", description: "Workflows audited for where AI genuinely saves time or improves quality." },
          { title: "Tool & workflow design", description: "Tools selected and workflows built around real team processes." },
          { title: "Implementation", description: "Workflows deployed with quality control and human review built in." },
          { title: "Governance", description: "Guidelines for responsible, on-brand AI use across the team." },
        ],
        deliverables: ["AI opportunity audit", "Workflow design & tooling", "Implementation & training", "Usage governance guidelines"],
        outcomes: ["Measurable time savings in content and campaign production", "AI adopted responsibly, without diluting brand quality"],
      },
      {
        slug: "personalization",
        name: "Personalization",
        hook: "Experiences that adapt to who's actually looking.",
        definition:
          "Website and lifecycle personalisation — content, offers and journeys tailored by segment, behaviour or lifecycle stage.",
        forWhen: [
          "The same experience is shown to every visitor regardless of intent.",
          "Segments are defined but not actually used to change the experience.",
          "Return visitors get no benefit from previous engagement.",
        ],
        approach: [
          { title: "Segmentation strategy", description: "Segments defined around behaviour and data that's actually available." },
          { title: "Personalisation mapping", description: "Content and offers matched to each segment and journey stage." },
          { title: "Implementation", description: "Personalisation rules built into the website, email and ad platforms." },
          { title: "Testing & iteration", description: "Personalised experiences tested against a control group." },
        ],
        deliverables: ["Segmentation model", "Personalisation content mapping", "Implementation across channels", "Performance testing report"],
        outcomes: ["Higher engagement and conversion from personalised journeys", "A segmentation model the whole team can use"],
      },
    ],
  },
  {
    num: "08",
    slug: "commerce-growth",
    name: "Commerce & Growth",
    shortName: "Commerce & Growth",
    clientNeed: "“I need to grow e-commerce.”",
    tagline: "Turn traffic into a growing customer base.",
    summary:
      "E-commerce growth strategy, conversion optimisation and retention programmes built to grow order value and customer lifetime value together.",
    heroDescription:
      "Commerce growth is a system, not a single campaign. We work across acquisition, conversion and retention so every part of the funnel compounds rather than competing for the same budget.",
    problems: [
      "Growth depends entirely on discounting and paid acquisition.",
      "Product pages and checkout haven't been optimised in years.",
      "Retention and loyalty are an afterthought compared to new customer spend.",
    ],
    deliverables: [
      "E-commerce growth strategy",
      "Product page & checkout optimisation",
      "Retention & loyalty programmes",
      "Social & retail commerce",
    ],
    industries: ["ecommerce-retail", "consumer-lifestyle", "hospitality-real-estate"],
    services: [
      {
        slug: "ecommerce-growth",
        name: "E-commerce Growth",
        hook: "A growth plan across acquisition, conversion and retention.",
        definition:
          "A connected e-commerce growth strategy spanning acquisition, conversion and retention — so growth doesn't rely on a single lever.",
        forWhen: [
          "Growth has stalled despite continued marketing investment.",
          "Acquisition, CRO and retention are being run as separate, uncoordinated efforts.",
          "There's no clear view of which levers actually move revenue.",
        ],
        approach: [
          { title: "Growth audit", description: "Acquisition, conversion and retention metrics reviewed as one funnel." },
          { title: "Opportunity sizing", description: "Growth levers ranked by revenue impact and effort to implement." },
          { title: "Roadmap", description: "A prioritised, quarter-by-quarter growth plan across the funnel." },
          { title: "Execution & iteration", description: "Initiatives shipped and measured against the original growth model." },
        ],
        deliverables: ["Full-funnel growth audit", "Opportunity sizing model", "Quarterly growth roadmap", "Ongoing performance reporting"],
        outcomes: ["Revenue growth that doesn't depend on one channel", "A prioritised roadmap the whole team can align around"],
      },
      {
        slug: "cro",
        name: "Conversion Optimization",
        hook: "Product and checkout experience built to convert.",
        definition:
          "Conversion optimisation focused specifically on product pages, cart and checkout — the highest-leverage pages in an e-commerce funnel.",
        forWhen: [
          "Cart or checkout abandonment is higher than category benchmarks.",
          "Product pages haven't been tested against current best practice.",
          "Mobile conversion lags significantly behind desktop.",
        ],
        approach: [
          { title: "Funnel diagnostic", description: "Drop-off points identified across product, cart and checkout." },
          { title: "UX redesign", description: "Friction points redesigned based on behavioural data, not opinion." },
          { title: "Testing", description: "Changes validated through structured A/B testing before full rollout." },
          { title: "Mobile optimisation", description: "Mobile experience treated as the primary, not secondary, journey." },
        ],
        deliverables: ["Funnel diagnostic", "Redesigned PDP & checkout flows", "A/B test programme", "Conversion performance report"],
        outcomes: ["Reduced cart and checkout abandonment", "A measurable lift in revenue per visitor"],
      },
      {
        slug: "acquisition",
        name: "Customer Acquisition",
        hook: "New customer growth without inflating acquisition cost.",
        definition:
          "Acquisition strategy specific to e-commerce — balancing paid, organic and marketplace channels against target CAC and margin.",
        forWhen: [
          "New customer acquisition cost is squeezing margin.",
          "Marketplace and social commerce channels are underused.",
          "Acquisition strategy hasn't accounted for full customer lifetime value.",
        ],
        approach: [
          { title: "Channel audit", description: "Current acquisition channels reviewed against cost, margin and LTV." },
          { title: "Marketplace & social commerce", description: "Additional acquisition surfaces evaluated and tested." },
          { title: "LTV-based budgeting", description: "Acquisition spend modelled against customer lifetime value, not just CAC." },
          { title: "Scaling plan", description: "Investment shifted toward the channels proving the best long-term return." },
        ],
        deliverables: ["Acquisition channel audit", "Marketplace & social commerce plan", "LTV-based budget model", "Quarterly scaling roadmap"],
        outcomes: ["New customer growth at a sustainable acquisition cost", "New acquisition surfaces beyond paid search and social"],
      },
      {
        slug: "retention",
        name: "Customer Retention",
        hook: "Loyalty and lifecycle programmes that lift repeat purchase.",
        definition:
          "Retention, loyalty and lifecycle marketing programmes designed to increase repeat purchase rate and customer lifetime value.",
        forWhen: [
          "Repeat purchase rate is low relative to the category.",
          "There's no loyalty programme or structured retention lifecycle.",
          "Most marketing budget goes to acquisition rather than existing customers.",
        ],
        approach: [
          { title: "Retention audit", description: "Repeat purchase and churn behaviour analysed by customer segment." },
          { title: "Loyalty design", description: "A loyalty and rewards structure designed around real purchase behaviour." },
          { title: "Lifecycle campaigns", description: "Post-purchase, win-back and VIP journeys built and automated." },
          { title: "Measurement", description: "Retention tracked as a growth metric alongside acquisition." },
        ],
        deliverables: ["Retention & churn audit", "Loyalty programme design", "Lifecycle campaign build", "Retention performance reporting"],
        outcomes: ["Higher repeat purchase rate and customer lifetime value", "A loyalty programme that reduces reliance on new customer acquisition"],
      },
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    eyebrow: "Industry",
    summary:
      "Brands competing on both product and experience — where conversion, retention and brand consistency all have to work together.",
    challenges: [
      "Rising acquisition costs squeezing margin",
      "Inconsistent brand experience across storefront, social and marketplaces",
      "Retention treated as an afterthought to new customer growth",
    ],
    capabilities: ["digital-experiences", "commerce-growth", "performance-marketing", "content-production"],
  },
  {
    slug: "fintech-financial-services",
    name: "Fintech & Financial Services",
    eyebrow: "Industry",
    summary:
      "Regulated, trust-driven categories where brand credibility and conversion clarity matter as much as compliance.",
    challenges: [
      "Building trust and credibility in a low-trust category",
      "Complex products that are hard to explain simply",
      "Long consideration cycles that need structured nurture",
    ],
    capabilities: ["brand-creative", "digital-experiences", "automation-ai", "performance-marketing"],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    eyebrow: "Industry",
    summary:
      "Brands balancing regulatory sensitivity with the need for warm, human, high-trust communication.",
    challenges: [
      "Communicating credibly without overpromising outcomes",
      "Content and creative constrained by compliance requirements",
      "Building an emotional brand in a clinical category",
    ],
    capabilities: ["brand-creative", "content-production", "digital-marketing"],
  },
  {
    slug: "technology-saas",
    name: "Technology & SaaS",
    eyebrow: "Industry",
    summary:
      "Fast-moving product companies that need marketing to keep pace with product velocity and technical buyers.",
    challenges: [
      "Explaining technical products to both technical and business buyers",
      "Long, multi-stakeholder B2B sales cycles",
      "Content and SEO competing in a crowded, jargon-heavy category",
    ],
    capabilities: ["digital-experiences", "automation-ai", "digital-marketing", "performance-marketing"],
  },
  {
    slug: "hospitality-real-estate",
    name: "Hospitality & Real Estate",
    eyebrow: "Industry",
    summary:
      "Experience-led categories where visual storytelling and local, high-intent demand generation both matter.",
    challenges: [
      "Communicating an experience through content, not just specification",
      "Seasonal and location-based demand generation",
      "Managing brand consistency across many properties or listings",
    ],
    capabilities: ["brand-creative", "content-production", "media", "digital-experiences"],
  },
  {
    slug: "consumer-lifestyle",
    name: "Consumer & Lifestyle Brands",
    eyebrow: "Industry",
    summary:
      "Culture-driven brands where creative distinctiveness is the primary competitive advantage.",
    challenges: [
      "Standing out in a crowded, aesthetically similar category",
      "Producing enough content to sustain always-on social presence",
      "Scaling a founder-led creative voice across a growing team",
    ],
    capabilities: ["brand-creative", "content-production", "digital-marketing", "commerce-growth"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "solace-wellness-rebrand",
    client: "Solace Wellness",
    title: "Rebuilding a wellness brand around trust, not trend",
    year: "2026",
    summary:
      "A full repositioning and identity system for a telehealth wellness brand, paired with a content engine built to earn trust in a sceptical category.",
    capabilities: ["brand-creative", "content-production", "digital-marketing"],
    industry: "healthcare-wellness",
    challenge:
      "Solace Wellness had strong clinical credibility but a brand that looked and read like every other wellness start-up — soft gradients, stock photography, interchangeable messaging. Growth had plateaued and paid acquisition costs were climbing as differentiation disappeared.",
    objective:
      "Reposition Solace around a defensible point of view, rebuild the visual and verbal identity, and stand up a content engine that could earn organic trust rather than renting attention through paid media alone.",
    strategy:
      "We anchored the brand on clinical transparency — showing the actual process behind every recommendation rather than promising outcomes. This became the organising idea for every piece of brand and content work that followed.",
    creative:
      "A new identity system built around editorial typography and restrained, documentary-style photography — deliberately closer to a trusted publication than a wellness app.",
    execution:
      "Identity rollout across web, app and clinical materials, paired with a monthly editorial content programme co-produced with in-house clinicians.",
    technology: "Headless CMS content model shared between the marketing site and in-app content library.",
    media: "Organic and owned-first launch, with paid social used to amplify top-performing editorial content.",
    results: [
      { metric: "+64%", label: "Organic traffic in 6 months" },
      { metric: "−31%", label: "Blended cost per acquisition" },
      { metric: "3.2x", label: "Content engagement rate vs. category benchmark" },
    ],
  },
  {
    slug: "northbound-bank-platform",
    client: "Northbound Bank",
    title: "A digital banking platform built to explain itself",
    year: "2025",
    summary:
      "A ground-up website and onboarding experience redesign for a challenger bank, paired with lifecycle automation to move applicants from interest to funded account.",
    capabilities: ["digital-experiences", "performance-marketing", "automation-ai"],
    industry: "fintech-financial-services",
    challenge:
      "Northbound's product was genuinely differentiated, but the website buried the differentiation under financial-services jargon, and the account-opening funnel lost most applicants before they ever spoke to a human.",
    objective:
      "Rebuild the marketing site and application funnel around plain-language clarity, and build lifecycle automation to recover and nurture applicants who dropped off mid-journey.",
    strategy:
      "Treat every page as an answer to a specific applicant question, and treat every funnel drop-off as a solvable UX or communication problem rather than an acceptable loss rate.",
    creative:
      "A calmer, more editorial design language than the category norm — fewer stock icons, more plain-English explanation, and real product screens instead of illustration.",
    execution:
      "New CMS-driven marketing site, redesigned application funnel, and an automated email/SMS nurture sequence triggered by funnel stage.",
    technology: "Next.js front-end on a headless CMS, integrated with the CRM via webhook for lifecycle triggers.",
    media: "Performance media redirected toward the highest-converting funnel entry points identified during the redesign.",
    results: [
      { metric: "+41%", label: "Application completion rate" },
      { metric: "−27%", label: "Cost per funded account" },
      { metric: "+2.1x", label: "Recovered applicants via lifecycle nurture" },
    ],
  },
  {
    slug: "fernweh-hotels-brand-film",
    client: "Fernweh Hotels",
    title: "Selling a feeling, not a room type",
    year: "2025",
    summary:
      "A brand film and always-on content system for a boutique hotel group, paired with always-on media designed around seasonal demand.",
    capabilities: ["brand-creative", "media", "digital-experiences"],
    industry: "hospitality-real-estate",
    challenge:
      "Fernweh's properties were consistently well-reviewed but invisible in a crowded, algorithm-driven booking landscape dominated by aggregator listings rather than the brand's own channels.",
    objective:
      "Build a distinctive creative platform strong enough to justify direct bookings over aggregator listings, and a media plan built around real seasonal booking windows.",
    strategy:
      "Position each property around a specific feeling rather than a room count or amenities list, giving media and content a consistent emotional throughline across a diverse portfolio.",
    creative:
      "A cinematic brand film shot across three properties, cut into a modular content library spanning hero film, social, and property-specific campaign assets.",
    execution:
      "Direct booking site rebuild, brand film production, and a rolling always-on social and paid media calendar tied to booking seasonality by property.",
    technology: "Property-level content modelling in the CMS so campaigns could scale across new locations without a rebuild.",
    media: "Seasonal paid social and programmatic video, weighted toward each property's specific high-demand booking window.",
    results: [
      { metric: "+38%", label: "Direct bookings vs. OTA bookings" },
      { metric: "−19%", label: "Blended cost per booking" },
      { metric: "5", label: "Properties launched on one scalable content system" },
    ],
  },
  {
    slug: "havenly-goods-growth-system",
    client: "Havenly Goods",
    title: "Turning a Shopify store into a growth system",
    year: "2026",
    summary:
      "A full-funnel e-commerce growth engagement spanning storefront redesign, checkout optimisation, and a lifecycle retention programme.",
    capabilities: ["commerce-growth", "performance-marketing", "content-production"],
    industry: "ecommerce-retail",
    challenge:
      "Havenly Goods had healthy traffic and brand awareness but revenue growth had stalled — conversion rate sat below category benchmark and repeat purchase rate was declining year over year.",
    objective:
      "Rebuild the highest-leverage parts of the funnel — product pages, checkout and post-purchase lifecycle — and pair the redesign with an ongoing testing programme.",
    strategy:
      "Treat acquisition, conversion and retention as one connected growth system rather than three separately-owned budgets competing for the same attention.",
    creative:
      "New product photography and PDP content built around the specific objections stopping visitors from buying, identified through session recordings and customer interviews.",
    execution:
      "Storefront and checkout redesign, a structured A/B testing programme, and an automated post-purchase and win-back lifecycle campaign.",
    technology: "Shopify Plus storefront with headless content sections and an integrated testing and analytics stack.",
    media: "Paid social and search reallocated toward the funnel stages with the strongest post-redesign conversion rate.",
    results: [
      { metric: "+52%", label: "Site-wide conversion rate" },
      { metric: "+23%", label: "Repeat purchase rate" },
      { metric: "+1.8x", label: "Revenue per visitor" },
    ],
  },
  {
    slug: "loopstack-lifecycle-automation",
    client: "Loopstack",
    title: "From free trial to paid, without the manual chase",
    year: "2025",
    summary:
      "A marketing automation and lifecycle build for a B2B SaaS platform, designed to convert free-trial users without manual sales follow-up.",
    capabilities: ["digital-experiences", "automation-ai", "digital-marketing"],
    industry: "technology-saas",
    challenge:
      "Loopstack's free-trial signups were strong, but trial-to-paid conversion relied entirely on manual outreach from a small sales team that couldn't keep pace with volume.",
    objective:
      "Design an automated onboarding and lifecycle nurture system that increased trial engagement and surfaced only the most sales-ready accounts to the team.",
    strategy:
      "Use in-product behaviour, not just form data, to trigger lifecycle messaging — so follow-up matched what a user had actually done, not just who they were.",
    creative:
      "A redesigned onboarding flow and lifecycle email system with a consistent, product-led tone across every touchpoint.",
    execution:
      "CRM and product-analytics integration, behaviour-triggered onboarding sequences, and a lead-scoring model to route sales-ready accounts.",
    technology: "CRM and marketing automation platform integrated via API with the product's in-app analytics events.",
    media: "Content marketing and SEO used to keep top-of-funnel trial signups growing alongside the lifecycle rebuild.",
    results: [
      { metric: "+35%", label: "Trial-to-paid conversion rate" },
      { metric: "−58%", label: "Manual sales touches per converted account" },
      { metric: "+44%", label: "Organic trial signups" },
    ],
  },
  {
    slug: "kindred-market-creator-campaign",
    client: "Kindred Market",
    title: "Building a creator engine for a culture-first brand",
    year: "2026",
    summary:
      "A creative platform, UGC production system and always-on creator marketing programme for a fast-growing lifestyle brand.",
    capabilities: ["brand-creative", "content-production", "media"],
    industry: "consumer-lifestyle",
    challenge:
      "Kindred Market's founder-led social voice had built an early, loyal audience, but the brand couldn't scale content production or creative consistency as the team and paid budget grew.",
    objective:
      "Build a creative platform flexible enough to hold the brand's voice at scale, and a creator and UGC pipeline that could sustain always-on paid social testing.",
    strategy:
      "Codify what made the founder's original voice work, then build a system — creators, briefs, production cadence — that could reproduce it without the founder personally making every piece of content.",
    creative:
      "A flexible creative platform and tone-of-voice guide, paired with a recurring monthly UGC and creator production sprint.",
    execution:
      "Creator sourcing and management programme, monthly content production sprints, and a paid social testing calendar fed directly by the new content pipeline.",
    technology: "Content and rights-management workflow built to track creator usage rights across the growing asset library.",
    media: "Always-on paid social, continuously refreshed with new creator and UGC-style creative from the monthly production cycle.",
    results: [
      { metric: "4.6x", label: "Increase in testable ad creative volume" },
      { metric: "−24%", label: "Cost per acquisition on paid social" },
      { metric: "+71%", label: "Engagement rate on creator content vs. brand-only" },
    ],
  },
];

export const insights: Insight[] = [
  {
    slug: "connected-growth-model",
    title: "The Connected Growth Model: Why Creative and Performance Can't Sit in Different Rooms",
    type: "Perspective",
    summary:
      "Most growth problems aren't creative problems or media problems — they're coordination problems. A look at what changes when they're run as one system.",
    body: [
      "Ask most marketing teams to draw their org chart and you'll find creative and performance sitting in different rooms, reporting through different lines, briefed through different documents — and quietly working against each other.",
      "Creative teams optimise for distinctiveness and brand consistency. Performance teams optimise for the next incremental percentage of conversion rate. Both are right. Neither, working alone, builds a durable growth engine.",
      "The brands seeing compounding growth right now share one structural trait: creative and performance share a single brief, a single measurement framework, and a single accountable owner for the full funnel — not two owners quietly trading blame at the handoff point.",
      "That doesn't mean flattening every discipline into one generalist function. It means designing the operating model so insight flows in both directions — performance data shaping the next creative platform, and creative distinctiveness protected as a genuine performance lever, not a cost centre to be trimmed when budgets tighten.",
    ],
    capability: "brand-creative",
    author: "Cordinit Media Editorial",
    date: "2026-08-14",
    readingTime: "6 min read",
  },
  {
    slug: "marketing-automation-guide-midmarket",
    title: "A Practical Guide to Marketing Automation for Mid-Market Brands",
    type: "Guide",
    summary:
      "You don't need an enterprise martech stack to benefit from automation. A practical, sequenced guide to what to build first.",
    body: [
      "Most mid-market teams don't have a marketing automation problem — they have a sequencing problem. They buy the platform before defining the lifecycle stages it's supposed to automate, and end up with an expensive tool running three generic email blasts.",
      "Start with the lifecycle, not the software. Map every stage a contact actually moves through — from first touch to customer to advocate — in plain language, before opening a single automation builder.",
      "Automate the highest-friction manual task first. For most teams that's lead follow-up speed, not a beautifully designed nurture sequence nobody has validated demand for.",
      "Treat the CRM as the foundation, not an afterthought. Automation built on inconsistent, duplicated contact data will only automate the inconsistency faster.",
      "Measure automation the same way you'd measure a hire: by the manual work it removes and the conversion lift it creates — not by how sophisticated the workflow diagram looks.",
    ],
    capability: "automation-ai",
    author: "Cordinit Media Editorial",
    date: "2026-07-02",
    readingTime: "8 min read",
  },
  {
    slug: "media-buying-benchmarks-2026",
    title: "2026 Media Buying Benchmarks Report",
    type: "Report",
    summary:
      "A cross-category look at paid search, paid social and programmatic cost and efficiency trends heading into 2026 planning cycles.",
    body: [
      "Paid social CPMs continued their uneven climb through the back half of last year, with the sharpest increases concentrated in retail and financial services — both categories where competition for the same audience segments intensified.",
      "Programmatic video buying showed the strongest efficiency gains for brands willing to invest in first-party audience data over relying purely on platform-modelled audiences.",
      "Search remains the most stable channel on a cost basis, but the report shows a widening gap between brands with strong organic SEO foundations and those relying on paid search to cover for weak organic visibility — the latter group's blended acquisition cost is now meaningfully higher.",
      "The clearest pattern across every category: brands that planned media and creative together, rather than briefing creative after the media plan was finalised, consistently reported better cost efficiency at the same spend level.",
    ],
    capability: "media",
    author: "Cordinit Media Editorial",
    date: "2026-06-18",
    readingTime: "10 min read",
  },
  {
    slug: "fernweh-brand-film-behind-the-scenes",
    title: "Behind the Scenes: Building the Fernweh Hotels Brand Film",
    type: "Video",
    summary:
      "A short breakdown of how we approached production across three properties for one cohesive brand film — and the modular content library it fed.",
    body: [
      "The brief for Fernweh Hotels wasn't just a brand film — it was a content system. A single three-day shoot across three properties needed to deliver a two-minute hero film, a season's worth of social content, and property-specific campaign assets, without any single piece feeling like an afterthought.",
      "Planning started with the cutdown strategy, not the hero edit. Every shot list was built around what the smallest usable clip needed to communicate on its own, which shaped everything from camera movement to how dialogue-free the film needed to be.",
      "The result: one production budget stretched across a hero film, over forty social cutdowns, and a reusable image and motion library that's still feeding the brand's content calendar months after the shoot wrapped.",
    ],
    capability: "content-production",
    industry: "hospitality-real-estate",
    author: "Cordinit Media Editorial",
    date: "2025-11-09",
    readingTime: "4 min read",
  },
  {
    slug: "seo-is-not-dead",
    title: "SEO Is Not Dead, It's Just Not Alone Anymore",
    type: "Article",
    summary:
      "AI search summaries changed how people find things — not whether organic visibility still matters. What actually needs to change in an SEO strategy.",
    body: [
      "Every few years, a new format arrives and someone declares SEO dead. Featured snippets were going to kill it. Voice search was going to kill it. Now AI-generated search summaries are supposedly finishing the job.",
      "What's actually happening is narrower and more interesting: the top of the funnel is getting shorter, and the pages that used to win on keyword density alone are losing visibility to sources AI systems trust enough to cite.",
      "That raises the bar, it doesn't remove it. Structured, well-sourced, genuinely useful content — the kind that earns citations and links because it's actually authoritative — is becoming more valuable, not less, as the volume of thin AI-generated content online increases.",
      "The practical shift: less time spent gaming keyword density, more time spent building the kind of original data, expertise and clarity that both search engines and AI systems have reason to trust.",
    ],
    capability: "digital-marketing",
    author: "Cordinit Media Editorial",
    date: "2026-05-21",
    readingTime: "5 min read",
  },
  {
    slug: "conversion-first-ecommerce-design",
    title: "Designing Conversion-First E-commerce Experiences",
    type: "Article",
    summary:
      "Beautiful product pages and converting product pages aren't always the same thing. A look at where the two overlap — and where they don't.",
    body: [
      "The best-performing product pages we've built rarely win design awards for restraint. They win because every element on the page is answering a specific, real objection — not because they look minimal on a portfolio site.",
      "Conversion-first design starts with the objections, not the layout. What's stopping a qualified visitor from buying right now? Price uncertainty, sizing risk, shipping doubt, trust in the brand — the page's job is to remove those, in order of how much they're actually costing you.",
      "That doesn't mean cluttering the page. It means being deliberate about what earns space above the fold, and treating every reviews section, trust badge and shipping note as a conversion tool being tested — not decoration being assumed to work.",
    ],
    capability: "digital-experiences",
    industry: "ecommerce-retail",
    author: "Cordinit Media Editorial",
    date: "2026-03-11",
    readingTime: "6 min read",
  },
];

export const testimonials = [
  {
    quote:
      "They didn't just execute the brief — they rewrote it into something sharper. The brand work gave every channel that followed a foundation to build on.",
    person: "VP Marketing",
    company: "Solace Wellness",
  },
  {
    quote:
      "The first agency we've worked with where creative and media were genuinely planned together, not handed off between two teams that never spoke.",
    person: "Head of Growth",
    company: "Northbound Bank",
  },
  {
    quote:
      "We went from three people wrangling content requests to a production system that runs itself. The output volume alone paid for the engagement.",
    person: "Founder",
    company: "Kindred Market",
  },
];

export const clientLogos = [
  "Solace Wellness",
  "Northbound Bank",
  "Fernweh Hotels",
  "Havenly Goods",
  "Loopstack",
  "Kindred Market",
];

export const navCapabilities = capabilities.map((c) => ({
  slug: c.slug,
  name: c.name,
  num: c.num,
  services: c.services.map((s) => ({ slug: s.slug, name: s.name })),
}));

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}

export function getService(capabilitySlug: string, serviceSlug: string) {
  const capability = getCapability(capabilitySlug);
  const service = capability?.services.find((s) => s.slug === serviceSlug);
  return capability && service ? { capability, service } : undefined;
}

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function relatedCaseStudies(opts: { capability?: string; industry?: string; exclude?: string }) {
  return caseStudies
    .filter((c) => c.slug !== opts.exclude)
    .filter((c) => (opts.capability ? c.capabilities.includes(opts.capability) : true) || (opts.industry ? c.industry === opts.industry : false))
    .slice(0, 3);
}

export function relatedInsights(opts: { capability?: string; industry?: string; exclude?: string }) {
  return insights
    .filter((i) => i.slug !== opts.exclude)
    .filter((i) => (opts.capability ? i.capability === opts.capability : true) || (opts.industry ? i.industry === opts.industry : false))
    .slice(0, 3);
}

export const areasOfInterest = capabilities.map((c) => c.name).concat("Something else");

export const operatingModel = [
  { step: "Think", description: "Strategy, positioning and research that define the right problem to solve." },
  { step: "Create", description: "Brand, campaign and content concepts built on that strategic foundation." },
  { step: "Build", description: "Websites, digital products and platforms engineered to last." },
  { step: "Launch", description: "Media and go-to-market execution across every relevant channel." },
  { step: "Grow", description: "Performance marketing and optimisation that compound over time." },
  { step: "Scale", description: "Automation, AI and systems that let growth outpace headcount." },
];
