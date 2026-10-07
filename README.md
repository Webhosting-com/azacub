# AZACUB website

Creative network / London. Built with Next.js 16 and Sanity.

This is **Stages 1 and 2: the public site, working forms and member approval**. It includes the news home page, article
pages, the Member spotlight, and the Join the community and Join the team
pages. Content is edited in Sanity Studio at `/studio`.

Not in this stage yet:

- `/members` is a holding page. Stage 3 adds the secure members' area
  (feature requests, Collaborate and the studio map).

## What you need

- Node.js 22.12 or newer (check with `node -v`)
- A free Sanity account

## Run it on your computer

1. Open a terminal in this folder and install:

   ```
   npm install
   ```

2. Create your Sanity project. Go to https://www.sanity.io/manage, create a
   new project called AZACUB, and note its **Project ID**. Make sure it has a
   dataset called `production`, set to public.

3. In the same Sanity project settings, find the API section and add a
   **CORS origin** for `http://localhost:3000` with "Allow credentials"
   switched on. Without this the Studio cannot log in.

4. Copy `.env.example` to a new file called `.env.local` and paste in your
   Project ID:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=yourprojectid
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. Start the site:

   ```
   npm run dev
   ```

6. Open http://localhost:3000 for the site and http://localhost:3000/studio
   for the admin.

## Add your first content

In the Studio:

- **Feature** is an article. Add a headline, press Generate for the web
  address, add a photo, write the article and press Publish. Switch on "Make
  this the lead feature" for the one you want large at the top of the home
  page.
- **Member spotlight** is the spotlight on the home page. The most recently
  edited one is shown.

The live site picks up changes within about a minute.

## Stage 2: forms, approval and the welcome email

Both forms now save into Sanity, where they appear in the Studio as
**Community application** and **Team application**.

**To approve a member:** open their application, set Status to Approved and
press Publish. The welcome email goes out automatically, once, with the
groupchat link and the members' password.

Setup, in order:

1. **Write token.** In your Sanity project settings, under API, create a
   token with Editor permission. Put it in `.env.local` as
   `SANITY_WRITE_TOKEN`. With only this step done, the forms already save.

2. **Welcome email settings.** Add to `.env.local`:
   `RESEND_API_KEY` (from Resend), `EMAIL_FROM`, `INSTAGRAM_INVITE_URL`,
   `MEMBERS_PASSWORD`, `NEXT_PUBLIC_SITE_URL` and a made-up
   `SANITY_WEBHOOK_SECRET`.
   Resend only delivers to other people once you have verified a web address
   with it. Until then it will only send to your own account's email, which
   is enough for testing.

3. **Webhook.** This is how Sanity tells the site that you approved someone.
   It needs the site to be online, so do it after the site is on Vercel. In
   Sanity project settings, under API, add a webhook:
   - URL: `https://YOUR-SITE/api/approved`
   - Trigger on: Update
   - Filter: `_type == "application" && status == "approved" && !defined(welcomeSentAt)`
   - Secret: the same phrase as `SANITY_WEBHOOK_SECRET`

Restart `npm run dev` after changing `.env.local`.

## Where things are

- `app/(site)/` the pages visitors see
- `app/studio/` the admin
- `components/` the header, footer, clock, wordmark and forms
- `sanity/schemaTypes/` the content types (what fields a Feature has, and so on)
- `app/globals.css` all of the styling

## Going live

Putting the site on Vercel with your own web address is covered in Stage 4.
