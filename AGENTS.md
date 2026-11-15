<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Next.js 16 App Router frontend for HireLoop. The API is a **separate Express app** in `../hireloop-server` (sibling directory, not part of this repo). Job/application CRUD lives there; the only API route here is the better-auth handler.

## Commands

- `npm run dev` — Next dev server on `http://localhost:3000`.
- `npm run build` / `npm start` — production build and serve.
- `npm run lint` — ESLint flat config (`eslint` with no path); add `--fix` as needed. It currently fails on `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`) — a pre-existing shadcn hook issue, not caused by your change.
- `npx tsc --noEmit` — typecheck. There is no `typecheck` or `test` script and no test runner installed.
- Start the API separately: `node index.js` in `../hireloop-server` (port 5000, no dev script; it reads its own `.env`).

## Environment

`.env` is gitignored and there is no example file. Required keys:

- `MONGODB_URI` — auth database (db name `hireloop`; collections `user`, `jobs`, `applications`).
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` — must match the client origin, `http://localhost:3000`, or auth callbacks break.
- `NEXT_PUBLIC_API_URL` — Express API base, `http://localhost:5000`.

## Architecture

- Pages live in `src/app`: home, `/browse-jobs`, `/jobs/[id]`, `/jobs/[id]/apply`, `/sign-in`, `/sign-up`, `/dashboard/{seeker,recruiter,admin}` plus recruiter job management.
- Server Components fetch the Express API directly through `src/lib/actions/*`; these are plain `fetch` helpers despite the "actions" name (no `"use server"` directive).
- Client Components use `src/lib/api/jobs.ts`. Both files export a `getJobs`, so pick based on component type.
- Auth is better-auth with the MongoDB adapter: server config `src/lib/auth.ts`, React client `src/lib/auth-client.ts`, route handler `src/app/api/auth/[...all]/route.ts`. `role` is a user additional field selected at sign-up (`seeker` by default).
- Dashboard navigation is role-driven, but dashboard routes have **no server-side guards**; adding a page or action does not automatically make it protected.

## Conventions and gotchas

- Next 16: `params` and `searchParams` are Promises. Use the generated global `PageProps<"/route">` / `LayoutProps<"/">` types and `await` them.
- Import from `src` with the `@/` alias.
- UI is shadcn style `base-nova`, built on Base UI (`@base-ui/react`), not Radix. Primitives have no `asChild`; compose links with `render={<Link href="..." />}`.
- `cn` comes from the `cn` npm package, re-exported by `@/lib/utils`. Do not add `clsx`/`tailwind-merge` imports.
- React Compiler is enabled in `next.config.ts`; don't add manual `useMemo`/`useCallback` workarounds.
- Tailwind v4 is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`. Styling is largely hardcoded dark values (`#09090b`, `#151518`, `#635bff`, `white/10` borders) rather than theme tokens; match surrounding markup.
- Job data is inconsistent between `JobDataTypes` (`title`, `company`, `requirements`, `frequency`) and legacy/seed records described by `BrowseJobTypes` (`jobTitle`, `companyName`, `qualifications`, `isRemote`). Keep the existing fallbacks when reading jobs from the API.
- Social sign-in buttons are stubs; email/password is the working auth path.
- Never edit generated files (`next-env.d.ts`, `.next/types/**`) or the `nextjs-agent-rules` block above.

