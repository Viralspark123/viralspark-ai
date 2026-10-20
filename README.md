# ViralSpark AI — MVP 1.0

A responsive, mobile-first creator studio for video ideas, hooks, titles, captions/hashtags, saved projects, and a simple meme maker. Dark UI with blue/purple accents; no login required.

## What works in this MVP

- Home dashboard and mobile bottom navigation.
- Idea, hook, title, and caption generators with niche, format, and tone inputs.
- Demo-mode template generation that works without an API key. The UI explicitly labels it as demo content.
- Optional AI text generation through a server-side endpoint; API keys are never embedded in frontend JavaScript.
- Save all generated results, search saved projects, copy, reuse/edit, delete, export JSON, and clear projects.
- Meme maker: upload a user-owned/permitted image, edit top/bottom text and color, and export a PNG. Images are processed in the browser.
- Input length/type limits, generation loading state, error feedback, and server-side rate limiting when using the backend.

## Run locally — demo mode

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

Open `http://localhost:3000`. Without an API key, `/api/generate` reports that AI is not configured and the client deliberately falls back to labeled demo templates. Saved projects use browser `localStorage`; they do not sync between devices or browsers.

## Enable real AI (optional)

1. Create an API key with your chosen AI provider.
2. Set `OPENAI_API_KEY` as a **server-side environment variable** in your local shell or hosting dashboard. Never put it in `app.js`, HTML, or a public `.env` file.
3. Optionally set `OPENAI_MODEL` and `OPENAI_API_URL` if your provider supports the OpenAI Chat Completions API format.
4. Restart the server and test each generator. Provider API usage may incur costs; configure billing limits at the provider and adjust the rate limit for your deployment.

The backend validates input, limits request frequency, caps payload size, uses a timeout, and returns generic provider errors. Before public launch, add monitoring, stronger abuse prevention (and authentication if needed), provider-specific safety policies, privacy/retention disclosures, and production CSP configuration. The current demo has no account system and intentionally avoids collecting personal information.

## Deploy a web MVP

Deploy the repository to a Node.js host that supports long-running Node servers (for example, Render, Railway, or a similar service). Use build/deploy command `npm install` and start command `npm start`, set environment variables in the host dashboard, and enable HTTPS. Do not deploy the API key to static frontend hosting. If you deploy as static-only, the demo tools work but the live AI endpoint will not.

## Test checklist

- [ ] Open Home and each tool from the dashboard/navigation.
- [ ] Generate ideas, hooks, titles, and captions with a non-empty topic.
- [ ] Check loading feedback and results; copy a result and save all results.
- [ ] Open Saved Projects; search, copy, reuse, delete, and export JSON.
- [ ] Reload the page and confirm saved projects persist in the same browser.
- [ ] Upload a permitted PNG/JPG/WebP, change meme text/color, download PNG.
- [ ] Test narrow Android widths and verify the bottom navigation remains usable.
- [ ] With a backend, test missing API key, invalid input, provider failure, and rate limiting.

## Google Play path

This deliverable is a web MVP, not a signed Android APK/AAB. Validate the web app first, then wrap it using a maintained Capacitor Android project or build a native client that calls the same HTTPS backend. For Play publication, prepare a signed Android App Bundle, app icon/screenshots, accurate Data safety disclosures, a privacy policy URL, content rating, target API compliance, and a Play Console developer account. Review current Google Play requirements before submission. Do not claim the web project itself is already published or Play-ready.
