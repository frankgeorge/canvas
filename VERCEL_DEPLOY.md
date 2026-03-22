# Deploy safyr to Vercel — Quick Guide

## Step 1 — Log in to Vercel

Run in your terminal:

```bash
npx vercel login
```

Sign in via browser (email or GitHub).

---

## Step 2 — Deploy

From the project root:

```bash
cd /home/frank/Downloads/Safyr\ Env/safyr
npx vercel --yes
```

This creates a preview URL (e.g. `safyr-xxx.vercel.app`). For production:

```bash
npx vercel --prod
```

---

## Step 3 — Add Environment Variables

1. Go to [vercel.com](https://vercel.com) → Your Project → **Settings** → **Environment Variables**
2. Add these (choose **Production**, **Preview**, and **Development** for each):

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ieflpdzhleklyyxtztui.supabase.co` | From your .env.local |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `sb_publishable_NtboI1GRtrkXbZ1WlGUvpg_5TfLVGco` | From your .env.local |
| `DATABASE_URL` | Your Supabase pooled URL (port 6543) | From Supabase Settings → Database |
| `DIRECT_URL` | Your Supabase direct URL (port 5432) | From Supabase Settings → Database |
| `NEXTAUTH_SECRET` | `3pxyto8EzfECf4f95dOFEQL1f4YYPCuNjbfvNxn18tY=` | From your .env.local |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | **Your actual Vercel URL** |

3. Redeploy: **Deployments** → ⋮ on latest → **Redeploy**

---

## Step 4 — Update OAuth Callbacks (if using sign-in)

After you have your Vercel URL, add it to your OAuth apps:

- **Google**: [console.cloud.google.com](https://console.cloud.google.com) → Credentials → add  
  `https://your-project.vercel.app/api/auth/callback/google`
- **GitHub**: [github.com/settings/applications](https://github.com/settings/applications) → add  
  `https://your-project.vercel.app/api/auth/callback/github`

---

## Alternative — Deploy via GitHub

1. Create a repo on [github.com](https://github.com/new)
2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/safyr.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new) → Import your GitHub repo → Deploy
4. Add env variables (Settings → Environment Variables) → Redeploy

---

## Share your project

After deployment, share the Vercel URL (e.g. `https://safyr-abc123.vercel.app`).
