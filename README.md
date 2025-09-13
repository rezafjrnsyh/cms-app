## Run the Development Server

```bash
npm run dev
```
App should now be running at http://localhost:3000

## Assumptions / Notes

- Authentication is mock-only: credentials are hardcoded in loginAction, no real backend.
- State Persistence: menus and menu groups stored in localStorage (browser-only).
- Middleware: not required for this implementation (guard handled in page level), but can be added for global auth check if needed.
