# pern-api-favlinks

## Deploying to Heroku

These steps deploy the full app (Express API + React client) to Heroku. The project already includes a `heroku-postbuild` script which builds the React client during deployment.

1. Install the Heroku CLI and login:

```bash
heroku login
```

2. Commit your changes (including the `Procfile` added to this repo):

```bash
git add .
git commit -m "Prepare app for Heroku deployment"
```

3. Create a new Heroku app (or use an existing one):

```bash
heroku create my-favlinks-app
```

4. Provision a Postgres database (Heroku will set `DATABASE_URL` automatically):

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. Push to Heroku:

```bash
git push heroku main
```

6. Open the app in your browser:

```bash
heroku open
```

7. View logs if something goes wrong:

```bash
heroku logs --tail
```

Environment notes:
- The server uses `process.env.DATABASE_URL` when present (see `queries.js`). Heroku sets that automatically when you provision Heroku Postgres.
- If you need to set any other env vars manually (for example `NODE_ENV` or secrets), use:

```bash
heroku config:set KEY=value
```

If you'd like, I can also add a `heroku-postbuild` change, a `Dockerfile`, or a GitHub Action to automate deployments — tell me which and I'll implement it.
