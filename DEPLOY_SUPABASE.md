# Deploy on Replit + Supabase (no credit card)

If ElephantSQL is having issues, Supabase is a reliable no-CC alternative that provides a hosted Postgres database and an easy UI to get a connection string. This guide shows how to connect your existing Express + React app (no code changes) using Replit.

Quick summary
- Create a Supabase project (free tier).
- Copy the Postgres connection string from the Supabase project settings.
- Import your repo into Replit and add `DATABASE_URL` as a secret with that connection string.
- Build the React client and run `node server/index.js` in Replit.
- Create the `links` table once using the SQL snippet below.

Step-by-step

1) Create a Supabase project

- Go to https://app.supabase.com and sign up (free tier available; no credit card required for the free plan in most regions).
- Click "New project" → enter a Project name and choose a strong password for the database. Region defaults are fine.
- Finish creating the project. Supabase will provision a Postgres database for you.

2) Get the Postgres connection string

- In the Supabase dashboard select your project → Settings → Database → Connection string.
- Copy the `Connection string (URI)` which looks like:

```
postgres://<user>:<password>@<host>:5432/<database>
```

Note: Supabase requires SSL; this repo already supports `DATABASE_URL` with SSL in `queries.js` when `process.env.DATABASE_URL` is present.

3) Import repo to Replit

- On Replit, choose "Create" → "Import from GitHub" and paste your repository URL.

4) Add secret `DATABASE_URL` in Replit

- In the Replit project page, open the Secrets / Environment variables panel.
- Add `DATABASE_URL` with the Supabase connection string you copied.

5) Build the client and start the server in Replit

Either run these commands once in the Replit Shell:

```bash
cd client
npm install
npm run build
cd ..
npm install
node server/index.js
```

Or set the Replit Run command to:

```bash
bash -lc "cd client && npm install && npm run build && cd .. && npm install && node server/index.js"
```

6) Create the `links` table (one-time)

Open the SQL editor in Supabase (or use psql) and run:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL
);
```

7) Test the app

- Open the Replit public URL; the React app should load and fetch `/links` from the same origin (server). If there are issues, check server logs in Replit and the browser console.

Troubleshooting & notes
- If you get SSL errors from `pg`, `queries.js` already sets `ssl: { rejectUnauthorized: false }` when `DATABASE_URL` is present — this is compatible with Supabase.
- Keep your `DATABASE_URL` secret. Do not commit it.
- If Supabase shows connection limits or the free tier is insufficient for your needs later, consider upgrading or using a different DB provider.

Would you like me to commit this file and push it to your repo now? If so I will run `git add`, `git commit` and `git push` here.
