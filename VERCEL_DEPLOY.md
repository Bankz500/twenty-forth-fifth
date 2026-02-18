# Deploying to Vercel

This project is configured to deploy to Vercel while using Firebase for database and authentication.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Firebase project configured (already done - `twenty-third-forth`)
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

## Important Notes

### Firebase Configuration
- Your Firebase credentials are already configured in `firebase-config.js`
- Firebase will work from Vercel since it's client-side
- No additional environment variables needed for Firebase (credentials are in the code)

### Environment Variables (Optional)
If you want to use environment variables for Firebase (more secure), you can:

1. Add them in Vercel Dashboard → Project Settings → Environment Variables:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```

2. Update `firebase-config.js` to use them:
   ```javascript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     // ... rest of config
   };
   ```

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
