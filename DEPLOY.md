# safyr.ai — Complete Deployment Guide

> Deploy the full safyr stack to Vercel in under 30 minutes.

---

## What you're deploying

| Layer | Technology |
|---|---|
| **Frontend + API** | Next.js 14 (App Router) on Vercel |
| **Database** | PostgreSQL via Supabase (free tier available) |
| **Auth** | NextAuth.js with Google + GitHub OAuth |
| **Styling** | Tailwind CSS + custom design system |
| **ORM** | Prisma with PgBouncer pooling |

---

## Step 1 — Clone and install locally

```bash
# Clone the repo (or create a new GitHub repo and push the files)
git clone https://github.com/YOUR_USERNAME/safyr.git
cd safyr

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

---

## Step 2 — Set up the database (Supabase)

Supabase gives you a free Postgres database with no credit card required.

1. Go to **[supabase.com](https://supabase.com)** → Create new project
2. Choose a region close to your users (e.g. `eu-central-1` for Europe)
3. Set a strong database password — save it somewhere safe
4. Once the project is ready, go to **Settings → Database**
5. Copy two connection strings:

```
# "Transaction" mode (port 6543) → DATABASE_URL in your .env
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true

# "Session" mode (port 5432) → DIRECT_URL in your .env
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

6. Paste both into `.env.local`
7. Run the migration:

```bash
npx prisma generate
npx prisma db push
```

You should see all tables created successfully in Supabase → Table Editor.

---

## Step 3 — Generate NextAuth secret

```bash
openssl rand -base64 32
```

Copy the output and set it as `NEXTAUTH_SECRET` in `.env.local`.

---

## Step 4 — Set up Google OAuth

1. Go to **[console.cloud.google.com](https://console.cloud.google.com)**
2. Create a new project (or use an existing one)
3. Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**
4. Application type: **Web application**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://safyr.ai/api/auth/callback/google` (production — use your actual domain)
6. Copy **Client ID** and **Client Secret** → paste into `.env.local`

---

## Step 5 — Set up GitHub OAuth

1. Go to **[github.com/settings/applications/new](https://github.com/settings/applications/new)**
2. Application name: `safyr`
3. Homepage URL: `https://safyr.ai`
4. Authorization callback URL: `https://safyr.ai/api/auth/callback/github`
   - Also add `http://localhost:3000/api/auth/callback/github` for development
5. Copy **Client ID** and generate a **Client Secret** → paste into `.env.local`

---

## Step 6 — Test locally

```bash
npm run dev
```

Visit `http://localhost:3000` — you should see the safyr landing page.

Check all pages work:
- `/` — Landing page
- `/dashboard` — Main dashboard  
- `/marketplace` — Playbook marketplace
- `/playbook/revenue-intelligence-pipeline` — Example playbook detail
- `/studio` — Visual workflow builder
- `/auth/signin` — Sign in page

---

## Step 7 — Deploy to Vercel

### Option A: Vercel CLI (fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# For production
vercel --prod
```

### Option B: Vercel Dashboard (recommended for teams)

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — first deploy will fail because env vars aren't set yet, that's fine

---

## Step 8 — Add environment variables to Vercel

In your Vercel project → **Settings → Environment Variables**, add every variable from `.env.example`:

| Variable | Value | Environment |
|---|---|---|
| `DATABASE_URL` | Supabase pooled URL | All |
| `DIRECT_URL` | Supabase direct URL | All |
| `NEXTAUTH_SECRET` | Your generated secret | All |
| `NEXTAUTH_URL` | `https://safyr.ai` | Production |
| `NEXTAUTH_URL` | `https://your-preview-url.vercel.app` | Preview |
| `GOOGLE_CLIENT_ID` | From Google Console | All |
| `GOOGLE_CLIENT_SECRET` | From Google Console | All |
| `GITHUB_ID` | From GitHub OAuth App | All |
| `GITHUB_SECRET` | From GitHub OAuth App | All |
| `ANTHROPIC_API_KEY` | From console.anthropic.com | All |

After adding all variables → **Redeploy**.

---

## Step 9 — Connect your custom domain

1. Vercel project → **Settings → Domains**
2. Add `safyr.ai` and `www.safyr.ai`
3. Follow the DNS instructions (add the CNAME/A records to your registrar)
4. Vercel auto-provisions SSL — usually takes 1–5 minutes

Update your Google + GitHub OAuth redirect URIs to use `safyr.ai`.

---

## Step 10 — Run database migrations on production

After deploying, run the migration against production:

```bash
# In your Vercel project, go to Settings → Functions → Console
# Or run locally with production DATABASE_URL:

DATABASE_URL="your-production-url" npx prisma db push
```

---

## Post-deployment checklist

- [ ] Landing page loads at `safyr.ai`
- [ ] Google OAuth sign-in works
- [ ] GitHub OAuth sign-in works  
- [ ] Dashboard accessible after sign-in
- [ ] Marketplace shows all playbooks
- [ ] Playbook detail pages load
- [ ] Studio canvas opens
- [ ] API endpoints respond: `GET /api/playbooks`
- [ ] Supabase shows tables populated

---

## Recommended Vercel add-ons (optional)

| Add-on | Purpose | Cost |
|---|---|---|
| **Vercel Analytics** | Page views, Core Web Vitals | Free–$14/mo |
| **Vercel Speed Insights** | Real user performance | Free |
| **Vercel Cron Jobs** | Scheduled workflow triggers | $20/mo (Pro) |
| **Upstash Redis** | Rate limiting, job queue | Free–$10/mo |

---

## Scaling considerations

When you're ready to handle production load:

**Database:** Upgrade Supabase to the Pro plan ($25/mo) for dedicated compute and daily backups.

**Workflow execution:** Add a proper job queue. Options:
- [Trigger.dev](https://trigger.dev) — background jobs, perfectly suited for agent workflows
- [Inngest](https://inngest.com) — event-driven functions with retries
- [QStash by Upstash](https://upstash.com/qstash) — lightweight message queue

**Agent runtime:** For long-running agents (>60s), you'll hit Vercel's function timeout on Hobby plan. Use:
- Vercel Pro (300s timeout)  
- Or offload to a dedicated worker (Railway, Fly.io, Modal)

---

## Folder structure reference

```
safyr/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design tokens + Tailwind
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar layout
│   │   ├── page.tsx                # Main dashboard
│   │   ├── analytics/page.tsx      # Analytics view
│   │   └── settings/page.tsx       # Settings + integrations
│   ├── marketplace/
│   │   └── page.tsx                # Playbook marketplace
│   ├── studio/
│   │   └── page.tsx                # Visual workflow builder
│   ├── playbook/
│   │   └── [slug]/page.tsx         # Playbook detail
│   ├── auth/
│   │   └── signin/page.tsx         # Sign-in page
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth handler
│       ├── playbooks/route.ts      # GET playbooks
│       ├── playbooks/[slug]/       # GET single playbook
│       └── workflows/route.ts      # GET/POST workflows
├── components/
│   └── layout/
│       └── AppSidebar.tsx          # Navigation sidebar
├── lib/
│   ├── data.ts                     # Mock data (replace with DB)
│   ├── prisma.ts                   # Prisma client singleton
│   └── utils.ts                    # Shared helpers
├── types/
│   └── index.ts                    # TypeScript types
├── prisma/
│   └── schema.prisma               # Database schema
├── .env.example                    # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Next features to build

Once the core is live, here's the natural build order:

1. **Connect real auth** — replace mock user with NextAuth session
2. **Persist workflows to DB** — wire Studio save button to `POST /api/workflows`
3. **Real agent execution** — integrate Anthropic API for actual agent runs
4. **Webhook triggers** — Supabase Realtime + cron jobs for scheduled workflows
5. **Community marketplace** — allow users to publish their own playbooks
6. **Billing** — Stripe integration for Growth/Enterprise plan upgrades
7. **Team collaboration** — org invites, role permissions, shared workflows
8. **Observability** — stream agent logs to the run detail view in real time

---

*Built with ❤️ for safyr.ai*
