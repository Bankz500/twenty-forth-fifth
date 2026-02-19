# Deploying to Vercel

This project is configured to deploy to Vercel while using Firebase for database and authentication.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Firebase project configured (already done - `twenty-forth-fifth`)
3. Git repository (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New Project"**

3. **Import your Git repository** (GitHub, GitLab, or Bitbucket)
   - Or drag and drop your project folder

4. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Click "Deploy"**

## Using Two Vercel Projects (recommended for `twenty-forth-fifth` + `twenty-forth-fifth-fccu`)

If you want **two separate Vercel projects** that both deploy from Git, create a second Vercel project from the **same GitHub repo**.

- **Project names**: Vercel uses a URL-safe slug for the project. If you type `twenty forth fifth fccu`, it will effectively become `twenty-forth-fifth-fccu`.
- **Independent deployments (recommended)**: set each Vercel project to a different **Production Branch**:
  - `twenty-forth-fifth` → production branch `main`
  - `twenty-forth-fifth-fccu` → production branch `fccu`

That way:
- Pushing to `main` deploys only the `twenty-forth-fifth` Vercel project
- Pushing to `fccu` deploys only the `twenty-forth-fifth-fccu` Vercel project

### Dashboard steps for the second project

1. Vercel Dashboard → **Add New** → **Project**
2. Import the same Git repo again
3. Set **Project Name** to `twenty-forth-fifth-fccu`
4. In Project Settings → Git → set **Production Branch** to `fccu` (optional but recommended)
5. Deploy

### Note about the `.vercel/` folder (CLI only)

This workspace currently has `.vercel/project.json` linked to the Vercel project `twenty-forth-fifth`.
That file is **local-only** (should not be committed) and only affects **Vercel CLI** deploys.
If you want to deploy from this same folder using CLI to the new project later, run:

```bash
vercel link --project twenty-forth-fifth-fccu
```

## Important Notes

### Firebase Configuration
- Firebase config is loaded from **Vercel/Vite environment variables** (so API keys are not committed to Git)
- Firebase will work from Vercel since it's client-side

### Environment Variables (Optional)
You should set these in Vercel Dashboard → Project Settings → Environment Variables (set them for **Production / Preview / Development** as needed):

1. Add these variables:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...   # optional
   ```

2. Redeploy (Vercel will rebuild and inject the values into the client bundle).

### Custom Domain
After deployment, you can add a custom domain in Vercel Dashboard → Project Settings → Domains

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build` (creates `dist/` folder)
- **Output Directory**: `dist`
- **Framework**: Vite

## Routing

Vercel is configured to:
- Serve all HTML files directly
- Rewrite routes like `/testimonials` to `/testimonials.html`
- Fallback to `index.html` for SPA routing

## After Deployment

1. Your site will be live at: `https://your-project-name.vercel.app`
2. Firebase database and authentication will continue to work
3. All static assets will be served from Vercel's CDN

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **404 errors**: Ensure `vercel.json` routing is correct
- **Firebase errors**: Verify Firebase credentials in `firebase-config.js`

## Build Configuration

The project is configured with:
- **Build Command**: `npm run build` (creates `dist/` folder)
- **Output Directory**: `dist`
- **Framework**: Vite

## Routing

Vercel is configured to:
- Serve all HTML files directly
- Rewrite routes like `/testimonials` to `/testimonials.html`
- Fallback to `index.html` for SPA routing

## After Deployment

1. Your site will be live at: `https://your-project-name.vercel.app`
2. Firebase database and authentication will continue to work
3. All static assets will be served from Vercel's CDN

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **404 errors**: Ensure `vercel.json` routing is correct
- **Firebase errors**: Verify Firebase credentials in `firebase-config.js`
