# Deployment Guide: Render & Vercel

This application is ready for deployment on both **Render** and **Vercel**.

---

## 1. Deploying to Render

Render offers free and paid cloud hosting for web services and Docker containers.

### Option A: Standard Node Web Service (Recommended)
1. Push your repository to **GitHub** or **GitLab**.
2. Sign in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Web Service**.
4. Connect your Git repository.
5. Configure the service settings:
   - **Name**: `simats-capstone-report-generator`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Node Version**: Select `20` or higher
6. Click **Deploy Web Service**.

> **Note**: A `render.yaml` blueprint is included in the project root. You can also deploy instantly using Render's **Blueprints** feature.

### Option B: Docker Container on Render
1. In Render, select **Docker** as the runtime environment.
2. Render will automatically detect the provided `Dockerfile`.
3. Set Port to `3000`.
4. Deploy.

---

## 2. Deploying to Vercel

Vercel provides edge-optimized static and serverless hosting.

1. Install the Vercel CLI (`npm i -g vercel`) or use the [Vercel Dashboard](https://vercel.com/new).
2. Import your Git repository into Vercel.
3. Vercel will automatically read the `vercel.json` configuration file in the project root:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
4. Click **Deploy**.

---

## Local Verification

To test the production build locally before deploying:

```bash
# 1. Build the production package
npm run build

# 2. Run the production server
npm run start
```

Open `http://localhost:3000` (or `http://localhost:4173`) in your browser to verify.
