# Repo Guardrails

- On PRs, always run: `pnpm mcp:pull:tokens && pnpm build:tokens`.

- Never hardcode colors/spacing in @org/ui; use tokens.

- For breaking token changes, propose a Changeset and run `pnpm mcp:diff` to include the report in the PR.

- Token changes only in `packages/tokens/src/tokens.json`.

- After token changes, always run `pnpm build:tokens` and update Storybook snapshots.

- Component code lives in `packages/ui/src`.

- Patterns live in `packages/patterns/src` and only compose existing UI.


