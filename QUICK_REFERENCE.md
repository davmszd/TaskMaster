# Quick Reference

## Start Development

```powershell
# Easy way (opens 2 windows)
.\start-dev.ps1

# Manual way
# Terminal 1:
cd apps/backend && pnpm dev

# Terminal 2:
cd apps/frontend && pnpm dev
```

## URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- Health: http://localhost:3000/api/health

## Common Commands

```powershell
# Install all dependencies
pnpm install

# Build shared types
pnpm --filter shared build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build

# Kill ports
npx kill-port 3000 5173
```

## Project Structure

- `apps/frontend/` - React app
- `apps/backend/` - Nitro.js API
- `packages/shared/` - Shared types

## API Endpoints

- `GET /api/tasks` - List all
- `GET /api/tasks/:id` - Get one
- `POST /api/tasks` - Create
- `PUT /api/tasks/:id` - Update
- `DELETE /api/tasks/:id` - Delete

## Troubleshooting

**Port in use?**
```powershell
npx kill-port 3000
npx kill-port 5173
```

**Module not found?**
```powershell
pnpm install
pnpm --filter shared build
```

**IDE errors?**
Restart TypeScript server or IDE

## File Locations

- API routes: `apps/backend/server/api/`
- React components: `apps/frontend/src/`
- Types: `packages/shared/src/`
- Configs: Root and app directories
