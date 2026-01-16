# Monorepo with Nitro.js Backend and React Frontend

This is a monorepo project containing:
- **Frontend**: React + TypeScript + Vite application
- **Backend**: Nitro.js API server
- **Shared**: Shared TypeScript types and utilities

## Structure

```
.
├── apps/
│   ├── frontend/          # React application
│   └── backend/           # Nitro.js API server
├── packages/
│   └── shared/            # Shared types and utilities
└── pnpm-workspace.yaml    # Workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (installed globally)

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Development

**Easy Start (Recommended for Windows)**
```powershell
# This will start both servers in separate windows
.\start-dev.ps1
```

**Manual Start**
```bash
# Run both frontend and backend in parallel (requires 2 terminals)
# Terminal 1 - Backend
cd apps/backend
pnpm dev

# Terminal 2 - Frontend
cd apps/frontend
pnpm dev

# Or run them separately from root:
pnpm dev:frontend  # Frontend on http://localhost:5173
pnpm dev:backend   # Backend on http://localhost:3000
```

### Build

```bash
# Build all packages
pnpm build

# Or build separately:
pnpm build:frontend
pnpm build:backend
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Material-UI
- Vitest for testing

### Backend
- Nitro.js
- TypeScript

### Shared
- TypeScript types for API contracts
