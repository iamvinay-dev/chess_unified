# 🚀 Deployment Guide: Chess Unified

This guide provides a step-by-step walkthrough for deploying your Chess Unified website and Admin Panel to a live production environment.

## 🏆 Recommended Platform: Vercel
Since this project is built with **Next.js**, the easiest and most powerful platform to host it is **Vercel** (the creators of Next.js). It is free for hobby projects and offers the best performance.

### Step 1: Push Code to GitHub
1. Create a new repository on [GitHub](https://github.com).
2. Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Import your `unifies-chess` repository.

### Step 3: Configure Environment Variables (CRITICAL)
Before hitting "Deploy", scroll down to the **Environment Variables** section and add the following keys from your `.env.local`:

| Variable Name | Description |
| :--- | :--- |
| `NEXT_ADMIN_PASSWORD` | Your login password for the admin portal. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | The phone number for WhatsApp buttons (e.g. 919885006568). |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name (from Cloudinary Dashboard). |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Your Cloudinary Upload Preset name. |

### Step 4: Deploy
1. Click **Deploy**. Vercel will build your site and give you a live URL (e.g., `unifies-chess.vercel.app`).

---

## ⚠️ IMPORTANT: Data Persistence (JSON Storage)
This project currently uses **JSON files** (`lib/data/*.json`) to store your site content, tournaments, and students. 

**What this means for Vercel:**
* Vercel is a "Serverless" platform. This means any changes you make in the Admin Panel **will disappear** whenever the site re-deploys or restarts.
* **The Solution:** Whenever you make significant changes in the Admin Panel (like adding many tournaments or updating the About text), you should:
  1. Download the updated `.json` files from your local machine.
  2. Commit and push them to GitHub.
  3. This ensures the live site always has your latest data.

*(For a more permanent "auto-saving" solution in the future, it is highly recommended to connect a Database like **Supabase (PostgreSQL)** or **MongoDB**).*

---

## 🖼️ Cloudinary Management
To ensure images continue to work perfectly on the live site:
1. Log in to [Cloudinary](https://cloudinary.com).
2. Go to **Settings** > **Enable Unsigned Uploads**.
3. Create an **Upload Preset** (e.g., `chess_unified_public`) and set the Folder to `unifies_chess`.
4. Ensure this preset name matches your `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` environment variable.

---

## ✅ Deployment Checklist
- [ ] Added all Environment Variables to Vercel.
- [ ] Cloudinary Upload Preset is set to "Unsigned".
- [ ] Test the Admin Login on the live URL.
- [ ] Verify that images upload correctly to the live site.
