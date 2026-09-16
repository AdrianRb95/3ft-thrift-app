# 🏷️ Cloey Thrift App: Project Brief & Execution Roadmap

## 📌 Overview
An AI-powered social thrift marketplace mobile app inspired by **Cloey** (`cloey.app`).
Sellers snap photos of clothes on their bed or hanger; AI automatically cleans and isolates the garment as a studio flat-lay with ambient lighting and soft contact shadows. The app publishes these into an editorial, Instagram-style feed where buyers can browse, like, comment, and send direct messages (DMs) with offers.

---

## 🎨 Design System & Visual Identity
See `DESIGN_SYSTEM.md` for the complete design system specifications.
* **Aesthetic:** Editorial luxury minimalism meets sustainable streetwear.
* **Canvas Background:** Warm cream/paper `#FBF9F5`
* **Card Surface:** Studio pure white `#FFFFFF` / warm subtle gradient
* **Brand Accent:** Champagne Gold `#A78B71`, Bordeaux Wine `#732D30`
* **Typography:**
  * Headlines & Prices: *Playfair Display* (Editorial Serif)
  * UI, Labels & Chat: *Inter* / *Plus Jakarta Sans*
* **Mockups Available:**
  * `docs/mockups/01_thrift_feed.jpg` — Social Thrift Feed UI
  * `docs/mockups/02_ai_cleanup_flow.jpg` — 1-Tap AI Studio Cleanup & Listing Flow
  * `docs/mockups/03_item_detail_dm.jpg` — Item Detail & Direct Offer Drawer

---

## 🏗️ Architecture & Tech Stack
1. **Frontend:** React Native with **Expo SDK 54** (TypeScript, NativeWind v4 / Tailwind CSS).
2. **AI Image Processing:**
   * Step 1: Background removal via edge/serverless RMBG-2.0 / BiRefNet or `@imgly/background-removal`.
   * Step 2: Gemini 2.0 / 1.5 Flash Vision API for automatic garment detection (brand, category, size, condition, color, and description draft).
3. **Backend & DB:** **Supabase** (PostgreSQL, Supabase Auth, Realtime Channels for DMs/Comments, Storage bucket for raw & cleaned garment photos).
4. **Key Features to Build:**
   * `<ThriftFeed />`: Editorial 2-column masonry or 1-column magazine cards with pinch-to-zoom studio cutouts.
   * `<AIStudioCapture />`: Camera flow with live Before/After comparison slider and auto-detected listing attributes.
   * `<ItemDetailModal />`: High-res studio piece view with public comment thread and seller metrics.
   * `<OfferDrawer />`: Slide-up drawer with quick-offer discount chips (`$100`, `$110`, `Custom Offer`) and direct buyer-to-seller DM chat.
