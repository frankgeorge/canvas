# Deploy safyr — Complete Steps

Follow these in order. Each step takes 2–3 minutes.

---

## Step 1: Push to GitHub

Open a **new terminal** in Cursor (Terminal → New Terminal) or your system terminal, then run:

```bash
cd "/home/frank/Downloads/Safyr Env/safyr"
chmod +x push-to-github.sh
./push-to-github.sh
```

Or run these commands directly:

```bash
cd "/home/frank/Downloads/Safyr Env/safyr"
git branch -M main
git push -u origin main
```

**When prompted:**
- **Username:** `frankgeorge`
- **Password:** Your [Personal Access Token](https://github.com/settings/tokens) (not your GitHub password)

**Create a token:** [github.com/settings/tokens](https://github.com/settings/tokens) → Generate new token (classic) → Check `repo` → Generate → Copy the token.

---

## Step 2: Connect Vercel to GitHub

1. Go to **[vercel.com](https://vercel.com)** and sign in (use GitHub to link accounts).
2. Click **Add New** → **Project**.
3. Find **frankgeorge/canvas** and click **Import**.
4. Before deploying, click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ieflpdzhleklyyxtztui.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `sb_publishable_NtboI1GRtrkXbZ1WlGUvpg_5TfLVGco` |
| `NEXTAUTH_SECRET` | `3pxyto8EzfECf4f95dOFEQL1f4YYPCuNjbfvNxn18tY=` |
| `NEXTAUTH_URL` | `https://YOUR-VERCEL-URL.vercel.app` |

*(After first deploy, replace `YOUR-VERCEL-URL` with your actual URL and redeploy.)*

5. Click **Deploy**. Wait 1–2 minutes.
6. Copy your deployment URL (e.g. `https://canvas-xxx.vercel.app`).

---

## Step 3: Update NEXTAUTH_URL and Redeploy

1. In Vercel: **Settings** → **Environment Variables**.
2. Edit `NEXTAUTH_URL` and set it to your deployment URL.
3. Go to **Deployments** → ⋮ on the latest → **Redeploy**.

---

## Share your link

Use the Vercel URL (e.g. `https://canvas-abc123.vercel.app`) to share your project.
