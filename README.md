# Salve Fashion
A headless luxury e-commerce experience integrating Shopify operations with Sanity CMS for rich storytelling.

---

**Live demo:** [api-normaliser.vercel.app](https://salvefashion.com)

---

## What this is

Salve Fashion is a modern frontend storefront designed to serve as a decoupled digital experience for a luxury apparel brand. It solves the classic e-commerce platform problem: rigid content architecture. Traditional platforms excel at checkout and fulfillment but fail at delivering deep, media-rich editorial experiences natively. 

By running as a headless Next.js application, this system abstracts away the commerce backend (Shopify) and hands presentation power to a dedicated content management system (Sanity). This means editors can construct highly customized hero sections, embedded videos, and bespoke component layouts visually, while the frontend handles weaving that content into the actual Shopify product data and cart states seamlessly.

The codebase reflects a careful separation of concerns where merchandising, content editing, and frontend routing operate independently. It avoids monolithic architecture via a Turborepo workspace, distinctly isolating the Next.js storefront and the Sanity Studio environments into separate sub-apps while sharing the core repository lifecycle.

## What makes this different

- **Strictly Decoupled Models**: CMS data is purely augmentative. Sanity handles rich product stories while referencing a Shopify SKU; it never duplicates price or inventory handling. This avoids critical dual-source-of-truth inventory bugs.
- **Deduplicated Edge Auth**: Verification of customer sessions happens at the edge using Next.js middleware reaching out to the Shopify API context. This blocks unauthorized access to the `/account` route before the server renders the framework layer, preventing unauthenticated application flashes.
- **Internal API Request Tunneling**: Integrations to third parties (like the Instagram feed) are resolved entirely via internal `/api/*` proxies. It enforces static rendering optimization without exposing highly privileged social or admin tokens strictly required for the requests to the client.
- **Asynchronous ISR Rendering**: Homepage and collection routes utilize Next.js Incremental Static Regeneration with a 30-second target revalidation (`revalidate: 30`). This provides the raw speed of a flat HTML file globally distributed, while guaranteeing data doesn't drift far out of sync from editors' actions.

## Features

- **Storefront Operations**: Product listing, collection drilling, cart management, and seamless Shopify checkout handoff. 
- **Editorial Composition**: Deep, visually driven landing pages dynamically rendered via Sanity Block Content integration.
- **Live Social Feed Integration**: Dynamic rendering of Instagram accounts and post data fetching on static builds.
- **Account Management**: Registration, login, and secure customer session state referencing the store API.
- **Media Optimization**: Integrated high-quality image and video handling formatted for fashion retail.
- **Accessible Interactions**: Complex interactive components (drawers, dialogs, sliders) constructed with semantic layout markup.

## Tech stack

| Layer | What | Why |
| --- | --- | --- |
| Framework | Next.js (Pages Router) | Optimized for Incremental Static Regeneration for catalog content, resulting in rapid Time to First Byte (TTFB) while maintaining dynamic routes capabilities. |
| CMS Backend | Sanity | Provides real-time unstructured content manipulation schemas with direct references to live custom objects (Shopify items) over traditional rigid RDBMS tables. |
| Commerce API | Shopify Storefront | Delegates all legal, security, checkout flow, and inventory mechanics to a reliable PaaS layer via GraphQL instead of a custom database. |
| Styling | Tailwind CSS | Allows deep visual customization with highly specific utility classes to recreate high-end fashion aesthetics without conflicting CSS-cascade issues. |
| UI Primitives | Radix UI | Removes the overhead of wrestling with difficult DOM logic for accessible interactives (modals, accordions, tooltips). |
| Data Fetching | GROQ / GraphQL | Combines Sanity's purpose-built query language (GROQ) with Shopify's robust GraphQL implementation for exact-payload responses. |
| Monorepo | Turborepo | Caches builds, standardizes linting, and simplifies task orchestration across both the frontend and CMS apps locally and in CI. |

## Architecture

```text
├── apps
│   ├── next               // Next.js frontend application
│   │   ├── components     // Reusable global UI primitives and section blocks
│   │   ├── context        // React Context providers (managing global cart / auth state)
│   │   ├── lib            // Core utilities, data fetching functions, CMS clients
│   │   ├── middleware.ts  // Edge middleware validating tokens vs routes securely
│   │   ├── pages          // Core routing mechanics (index, shop, account logic)
│   │   ├── services       // Strict GraphQL queries and mutation schemas for API
│   │   └── styles         // Global root directives and Tailwind layer injection
│   └── sanity             // Self-hosted Sanity Studio
│       ├── plugins        // Commerce-specific integrations mapped to the visual studio
│       ├── sanity.config.ts // Studio core setup and system configurations
│       └── schemas        // Database models definition
│           └── documents  // Schema logic for collections, products, and core pages
├── package.json           // Monorepo root dependencies
└── turbo.json             // Turborepo pipeline configuration rules
```

**Data Flow Request**
```text
Client Browser -> Next.js Next API (/api/instagram) -> Instagram API Server
Client Browser -> Next.js (getServerSideProps/ISR) -> Sanity API (GROQ)
Client Browser -> Next.js Context/Hooks -> Shopify Storefront API (GraphQL)
```

**Auth Verification Flow**
```text
Request for /account -> middleware.ts -> Extract token from Cookie -> Shopify 'VERIFY_TOKEN' GraphQL ping -> Return isValid -> Redirect to /login OR allow Next()
```

## Running locally

1. Ensure you have Node.js version `>=16.0.0` running via `nvm`.
2. Clone the repository and install the workspace level packages:
```bash
npm install
```
3. Copy local environment variables into both applications:
```bash
cp apps/next/.env apps/next/.env.local
cp apps/sanity/.env apps/sanity/.env.local
```
4. Start both environments securely in parallel using Turborepo:
```bash
npm run dev
```
5. Check your localhost endpoints: `http://localhost:3000` for the Next.js Storefront and `http://localhost:3333` (typical Sanity port) for the Studio interface.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the development environment for both Next.js frontend and Sanity Studio in parallel via Turborepo. |
| `npm run build` | Fetches core static content assets, compiles the robust production bundles, and generates the Next.js optimized routing map. |
| `npm run lint` | Runs ESLint and specific syntax checks across both monorepo workspaces via defined Turbo tasks. |
| `npm run format` | Enforces uniform codebase styling utilizing Prettier specifically for TypeScript, Tsx, and Markdown files. |

## Database

The underlying data storage revolves around document schema mappings handled by the Sanity platform. 

| Model | Purpose |
| --- | --- |
| account | Controls the presentation structure or editorial text for the user account landing area. |
| collection | Defines editorial imagery and storytelling structures augmenting a specific product categorization. |
| page | The architecture of non-commerce utility content pages (About, Contact, Terms). |
| product | Supercharges individual Shopify SKU data by enabling embedded rich media assets, specific highlight points, and deep formatting logic overriding Shopify descriptions. |
| productVariant | Augments the specific SKU variant data visually, controlling specific asset drops, stock text, or unique variant styling. |
| shop | The overarching logic for handling the master collection/aggregation product grids dynamically. |

## Environment variables

**Next.js Frontend (`apps/next/.env`)**
| Variable | Required | Description |
| --- | --- | --- |
| NEXT_PUBLIC_NODE_ENV | Yes | Dictates environment limits (e.g. `development`). |
| NEXT_PUBLIC_BASE_URL | Yes | The URL target of your Next.js application interface. |
| NEXT_PUBLIC_SHOPIFY_DOMAIN | Yes | Custom connection point for the headless Shopify implementation. |
| NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN | Yes | Read-only Storefront API token to load product grids safely on the client. |
| NEXT_PUBLIC_GRAPHQL_URI | Yes | Direct connection URI to ping the Shopify Storefront GraphQL. |
| NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN_ADMIN | Yes | Highly privileged admin token for aggressive system actions. |
| NEXT_PUBLIC_GRAPHQL_URI_ADMIN | Yes | Admin API query target point for internal operations. |
| NEXT_PUBLIC_SANITY_STUDIO_ID | Yes | Core identifier pointing to the live or sandbox dataset project in Sanity. |
| NEXT_PUBLIC_SANITY_STUDIO_DATASET | Yes | Specifies specific DB bucket context target (`production` vs `staging`). |
| NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN | Yes | Target endpoint querying token specifically used internally on server loads for IG grids. |

**Sanity Studio (`apps/sanity/.env`)**
| Variable | Required | Description |
| --- | --- | --- |
| SANITY_STUDIO_TITLE | Yes | UI override displaying visually inside the management dashboard header. |
| SANITY_STUDIO_ID | Yes | Matches Next.js connection; tells specific Studio folder which cloud instance to manipulate. |
| SANITY_STUDIO_DATASET | Yes | Specifies current editing environment bucket in the cloud (prevents writing to prod during setup). |

## Technical decisions worth mentioning

**Shopify vs Sanity boundary mapping**
When architecting headless e-commerce, deciding who owns the "product source of truth" is critical. Here, Shopify operates strictly as a transactional ledger (price, inventory availability, shipping rules). Sanity operates fully as highly relational merchandising metadata (hero images, model specifications, descriptive blocks, category association visuals). This prevents editor updates from erroneously overwriting stock values across dual platforms, saving sync-complexity compute.

**Abstracting the Instagram integration**
A common pitfall is requesting the Instagram Graph API from the browser, which inherently requires pushing Graph API scopes natively. Instead, the implementation here fires at build/generation time inside Next's `getStaticProps()`. 
```typescript
const instagramPostsRes = await fetch(
  `${env.NEXT_PUBLIC_BASE_URL}/api/instagramPosts?accessToken=${env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
);
```
Requesting our Next.js API abstraction proxy removes long TTFB payloads on native browsers, masks the actual Meta tokens, and drastically lowers the platform token rate limits to function efficiently natively.

**Next.js Edge Middleware for access validation**
Security around headless storefronts struggles gracefully moving user-states against API verification.
```typescript
const verifyToken = async () => { ... } // Pings Shopify GraphQL `VERIFY_TOKEN` specifically
if (isAuthenticated.isValid) { 
  if (request.url.includes('/login')) return NextResponse.redirect(new URL('/account', request.url));
}
```
Firing this validation natively inside `middleware.ts` before components mount strictly prevents layout shifting, unauthorized flashes of restricted content structure to guest clients, and bypasses the memory-thrashing of verifying against a persistent Redux-style context store constantly.

## Accessibility

Targeting baseline WCAG AA requirements, deeply sophisticated user interface tasks—such as navigating accordion toggles and triggering product quick-view modal dialog traps—leverage Radix UI. Implementations utilize native `aria-expanded`, explicit context mapping to `role="dialog"`, strict internal tree focus trapping mechanisms on dialog open, and total escape key mapping natively to ensure screen-reader safety around rich visual modifications natively.

## Things I'd do differently at scale

1. **Shift to App Router and Client/Server Components**: The layout extensively relies on nested wrappers internally. Splitting native, static server rendering of categories from the specific interactive Javascript `AddToCart` buttons with Server Components heavily shrinks overall vendor-heavy bundles on initial paints.
2. **Setup Event-Driven Webhooks**: `revalidate: 30` creates reliable updates, but burns excessive, irrelevant cache-storing bandwidth over intervals. Transitioning Next.js On-Demand Revalidation mapped specifically to Sanity/Shopify Update Webhooks guarantees pages rebuild strictly when explicit inventory arrays drop to zero natively.
3. **Implement Full Playwright Checkouts**: Checkout endpoints against Shopify Graph require robust consistency. Adding complex Playwright scheduled GitHub Actions specifically to trigger browser checkout mechanics mapping cart objects into real Shopify payment tunnels verifies total integrity reliably against breaking API updates.
4. **Implement Global GraphQL Types CodeGen**: While Types exist, `any` and generic implementations live inside the data pipelines. Injecting `@graphql-codegen` would securely lock exact schema payloads to Typescript interfaces tightly aligned with external Shopify versions automatically.

## Licence

UNLICENSED
