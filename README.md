# SAM Research Project website

The public homepage for [samresearchproject.org](https://samresearchproject.org).

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm test
npm run build
npm audit
```

The production build uses vinext to create the `dist/` server and client
artifacts expected by the hosting runtime, then embeds the site project
metadata required to save that bundle as a deployable version.

## Publication boundary

The site may describe SAM, Starbreaker, and the Substrate Ledger Computer at a
disclosure-reviewed conceptual level. Protected architecture, implementation,
hardware, source code, sealed comparisons, and unreviewed research material
remain outside the public website.
