# TaskMaster - React Task Management App

A modern task management application built with React, TypeScript, Vite, and Material-UI.

## 🚀 Features

- ✅ Task management (create, read, update, delete)
- 🎨 Material-UI components with custom theming
- 🌓 Dark/Light theme toggle
- 📱 Responsive design
- ⚡ Fast development with Vite
- 🧪 Unit testing with Vitest
- 🐳 Docker support for development and production

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with coverage
npm test:coverage
```

### Docker Development

See [README.Docker.md](./README.Docker.md) for detailed Docker instructions.

**Quick Start:**

```powershell
# Using the helper script (Windows PowerShell)
.\docker-helper.ps1

# Or manually with Docker Compose
docker-compose up react-app-dev
```

Access the app at: http://localhost:5173 (development) or http://localhost:8080 (production)

## 📁 Project Structure

```
react-app/
├── public/              # Static assets
├── src/
│   ├── api/            # API integration
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── features/       # Feature modules
│   │   └── task/       # Task feature
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx configuration for production
├── vite.config.ts      # Vite configuration
└── vitest.config.ts    # Vitest configuration
```

## 🧰 Tech Stack

- **Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.2
- **UI Library:** Material-UI 7.3
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint
- **Formatting:** Prettier

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint code |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## 🐳 Docker Commands

```bash
# Development environment with hot-reload
docker-compose up react-app-dev

# Production environment with Nginx
docker-compose up react-app-prod

# Build images
docker-compose build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f react-app-dev
```

For more Docker details, see [README.Docker.md](./README.Docker.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test:coverage
```

## 🎨 Theming

The app supports dark and light themes using Material-UI's theming system. The theme can be toggled using the theme toggle button in the app bar.

## 🔧 Configuration

### Vite Configuration

The Vite configuration (`vite.config.ts`) includes:
- React plugin
- Base path for deployment
- Docker-compatible dev server settings

### Environment Variables

Create a `.env` file for environment-specific variables:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=TaskMaster
```

All variables must be prefixed with `VITE_` to be exposed to the app.

## 📦 Building for Production

```bash
# Build the application
npm run build

# The output will be in the `dist` directory
# Serve with any static file server
npm run preview
```

## 🚀 Deployment

### Docker Production Deployment

1. Build the production image:
```bash
docker build --target production -t react-app:prod .
```

2. Run the container:
```bash
docker run -p 80:80 react-app:prod
```

### Static Hosting

The built files in `dist/` can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and not licensed for public use.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Material-UI

## 🆘 Troubleshooting

### Port 5173 already in use

```bash
# Kill the process using port 5173
npm run kill

# Or manually
kill -9 $(lsof -ti:5173)
```

### Docker issues

See [README.Docker.md](./README.Docker.md) for Docker-specific troubleshooting.

### Module not found errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Material-UI Documentation](https://mui.com/)
- [Vitest Documentation](https://vitest.dev/)
