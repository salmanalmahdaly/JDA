# وين مكتبي؟ — JDA Office Finder

A static website where an employee enters their employee ID and sees their floor, the floor plan, and the walking route to their department. Converted from the Claude Artifact with identical design and behavior.

## What's in the project

```
public/
  index.html            the page (design, layout and styles unchanged)
  assets/app.js         employee data, departments, routes, page logic
  assets/floors/*.jpg   the five floor plans (ground, mezzanine, first, second, third)
  assets/favicon.svg    browser tab icon
scripts/
  build.mjs             copies public/ to dist/ and checks every referenced file exists
  serve.mjs             small local server for testing
package.json            build / preview scripts (no dependencies)
vercel.json             Vercel build settings
```

There are no npm dependencies, no backend, no database, and no API keys.
The only outside resource is Google Fonts (Readex Pro, IBM Plex Sans Arabic). If it is blocked, the page falls back to Tahoma.

## Test it on your computer (optional)

Requires Node.js 18 or newer.

```bash
npm run build
npm run preview      # then open http://localhost:3000
```

## Publish on Vercel

You need a Vercel account (the free Hobby plan is enough): sign up at https://vercel.com.
Vercel reads `vercel.json` automatically (build command `npm run build`, output folder `dist`).

### Option A — GitHub (easiest, no command line)
1. Create a new repository on GitHub and upload the contents of this folder
   (on the repository page: **Add file → Upload files**, drag everything in, **Commit**).
2. In Vercel choose **Add New → Project**, then **Import** that repository.
3. Leave the settings as detected and click **Deploy**.
4. When it finishes you get a public address like `https://jda-office-finder.vercel.app`.
   Every later commit to the main branch republishes the site.

### Option B — Vercel CLI
Requires Node.js 18 or newer.
```bash
npm i -g vercel
cd jda-office-finder
vercel            # first time: log in, answer the questions, accept the detected settings
vercel --prod     # publishes to your production address
```
1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project → Import** that repository.
3. Leave the settings as detected (they come from `vercel.json`) and click **Deploy**.
   Every push to the main branch republishes the site.

### Making sure anyone can open it
Vercel production addresses (`*.vercel.app` or your own domain) are public by default.
If visitors are asked to log in to Vercel, open the project's **Settings → Deployment Protection**
and turn off **Vercel Authentication** for production. Test the address in a private/incognito window.

## Updating employees or departments

Edit `public/assets/app.js`:
- `EMPLOYEES` — one line per employee: `["ID","Name","Position","Department"]`.
  The department text must match a key in `DEPTS` exactly.
- `DEPTS` — each department's floor, highlighted area (`zone`), route points, pin and written steps.
  Coordinates are in the pixel space of that floor's image.

Then redeploy (or commit the change on GitHub if you used option A).

## Deep links

`https://your-address/#7` opens the page with employee 7 already shown.

## Privacy note

The site is public, and the employee list (names, positions, departments) is inside `assets/app.js`,
so anyone with the address can read it. If that is not acceptable, remove names/positions from
`EMPLOYEES`, or host the site on the internal network instead of the public internet.
