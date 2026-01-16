# Monorepo Setup Complete! 🎉

Your React + Nitro.js monorepo has been successfully set up!

## 📁 Project Structure

```
react-app/
├── apps/
│   ├── frontend/          # React + TypeScript + Vite
│   └── backend/           # Nitro.js API Server
├── packages/
│   └── shared/            # Shared TypeScript types
├── pnpm-workspace.yaml    # Monorepo configuration
└── package.json           # Root package with scripts
```

## 🚀 Quick Start

### Install Dependencies
```powershell
pnpm install
```

### Build Shared Package
```powershell
pnpm --filter shared build
```

### Run Development Servers

**Option 1: Run both servers in parallel**
```powershell
# Open two terminal windows:

# Terminal 1 - Backend (port 3000)
cd apps/backend
pnpm dev

# Terminal 2 - Frontend (port 5173)
cd apps/frontend
pnpm dev
```

**Option 2: Use root scripts**
```powershell
# Run both (requires two terminals or use &)
pnpm dev

# Or run individually:
pnpm dev:backend
pnpm dev:frontend
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## 📡 API Endpoints

The Nitro.js backend provides these REST endpoints:

### Tasks API
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Example Response
```json
[
  {
    "id": "1",
    "title": "Set up project structure",
    "description": "Create folders and configure TypeScript",
    "status": "done",
    "priority": "high",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🔧 Available Scripts

### Root Level
- `pnpm dev` - Run all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all apps
- `pnpm test` - Run frontend tests
- `pnpm format` - Format code with Prettier

### Frontend (apps/frontend)
- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build for production
- `pnpm test` - Run Vitest tests
- `pnpm lint` - Run ESLint

### Backend (apps/backend)
- `pnpm dev` - Start Nitro dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Shared (packages/shared)
- `pnpm build` - Compile TypeScript types
- `pnpm dev` - Watch mode for types

## 🔗 How It Works

1. **Shared Package**: Contains TypeScript types used by both frontend and backend
2. **Backend (Nitro.js)**: 
   - File-based routing in `apps/backend/server/api/`
   - Each file like `tasks/index.get.ts` becomes a GET endpoint
   - Uses shared types for type safety
3. **Frontend (React)**: 
   - Fetches data from backend via REST API
   - Uses shared types for consistency
   - Environment variable `VITE_API_URL` configures API endpoint

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing the API

Using PowerShell:
```powershell
# Get all tasks
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks" -UseBasicParsing

# Get task by ID
Invoke-WebRequest -Uri "http://localhost:3000/api/tasks/1" -UseBasicParsing

# Health check
Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing
```

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite
- 🎨 Material-UI
- 🧪 Vitest

### Backend
- 🚀 Nitro.js 2.13+
- 📘 TypeScript
- 🔄 File-based routing
- 🌐 Built-in CORS support

### Shared
- 📦 TypeScript types
- 🔄 Workspace package

## 📚 Next Steps

1. **Start the servers**: Run backend and frontend in separate terminals
2. **Open the app**: Navigate to http://localhost:5173
3. **Test the API**: The app should fetch tasks from the backend
4. **Customize**: Add more API endpoints or React components

## 🐛 Troubleshooting

### TypeScript Errors in IDE
If you see import errors for `@monorepo/shared`:
1. Make sure you've built the shared package: `pnpm --filter shared build`
2. Restart your IDE/TypeScript server
3. Check that the path alias is configured in `tsconfig.app.json` and `vite.config.ts`

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5173
npx kill-port 5173
```

### Cannot Find Module Errors
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
pnpm install
```

## 📖 Documentation

- [Nitro.js Documentation](https://nitro.unjs.io/)
- [Vite Documentation](https://vitejs.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

**Happy Coding! 🚀**
