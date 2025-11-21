# Concrete

This repository contains a tiny static chat UI about hydraulic concrete. The interactive app has been moved to `index.html` at the repository root.

Security note
- The original README contained an embedded OpenAI API key inside the HTML. That key has been removed from the repository. Never add secrets to client-side code. For production, use a server-side proxy that reads `OPENAI_API_KEY` from environment variables.

Run locally

Serve the repo with a static server and open `http://localhost:8000/index.html`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Publish (GitHub Pages)

1. Ensure `index.html` is in the repository root.
2. Commit and push the changes:

```bash
git add index.html README.md
# Concrete

This repository contains a tiny static chat UI about hydraulic concrete. The interactive app has been moved to `index.html` at the repository root.

Security note
- The original README contained an embedded OpenAI API key inside the HTML. That key has been removed from the repository. Never add secrets to client-side code. For production, use a server-side proxy that reads `OPENAI_API_KEY` from environment variables.

Run locally

Serve the repo with a static server and open `http://localhost:8000/index.html`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Publish (GitHub Pages)

1. Ensure `index.html` is in the repository root.
2. Commit and push the changes:

```bash
git add index.html README.md
git commit -m "Add index.html and remove embedded API key"
git push origin main
```

3. In the GitHub repository settings → Pages, set the source to branch `main` and folder `/ (root)`.

Optional: quick demo with ngrok

```bash
python3 -m http.server 8000
ngrok http 8000
```

If you want, I can commit & push these changes for you or scaffold a minimal server proxy (`server/`) and update the front-end to call it (recommended).

Server proxy (what I added)

- `server/index.js` — minimal Express proxy that exposes `POST /api/chat` and forwards requests to OpenAI using `OPENAI_API_KEY` from the environment.
- `server/package.json` — dependencies and start scripts.

Run the proxy locally

1. Create a `.env` in `/server` with:

```text
OPENAI_API_KEY=sk-<your-key>
```

2. From the `/server` folder install and start:

```bash
cd server
npm install
npm start
```

3. Serve the front-end (root) and open `http://localhost:3000/index.html` (or if you run front-end on a different port, ensure CORS or a same-origin configuration).

Deploy to Vercel (recommended simple flow)

1. In the Vercel dashboard, import this repository.
2. Set an environment variable `OPENAI_API_KEY` in the Vercel project settings (do not commit it).
3. Vercel will detect a static project and serverless functions. To use the Express server as a serverless function you can:
  - Option A (quick): Deploy the `server` as a separate project on Render/Heroku and point the frontend to that URL.
  - Option B (single deploy): Convert `server/index.js` to a serverless function (Vercel Functions) or use a lightweight serverless handler — I can help convert it if you want.
