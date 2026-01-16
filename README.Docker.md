# Docker Setup for React App

This React application has been dockerized with support for both development and production environments.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Development Mode

Run the app in development mode with hot-reloading:

```bash
# Using Docker Compose
docker-compose up react-app-dev

# Or using Docker directly
docker build --target development -t react-app-dev .
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules react-app-dev
```

Access the app at: http://localhost:5173

### Production Mode

Build and run the optimized production version:

```bash
# Using Docker Compose
docker-compose up react-app-prod

# Or using Docker directly
docker build --target production -t react-app-prod .
docker run -p 8080:80 react-app-prod
```

Access the app at: http://localhost:8080

## Docker Commands

### Build Images

```bash
# Development image
docker build --target development -t react-app:dev .

# Production image
docker build --target production -t react-app:prod .
```

### Run Containers

```bash
# Development (with volume mounting for hot-reload)
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules react-app:dev

# Production
docker run -p 8080:80 react-app:prod
```

### Using Docker Compose

```bash
# Start development environment
docker-compose up react-app-dev

# Start production environment
docker-compose up react-app-prod

# Run in detached mode
docker-compose up -d react-app-prod

# Stop containers
docker-compose down

# Rebuild and start
docker-compose up --build react-app-dev
```

## Docker Architecture

### Multi-Stage Build

The Dockerfile uses a multi-stage build process:

1. **Development Stage**: Node.js with hot-reloading via Vite dev server
2. **Build Stage**: Compiles TypeScript and builds optimized production assets
3. **Production Stage**: Nginx serves the static files

### Why Nginx for Production?

- Lightweight and efficient for serving static files
- Built-in gzip compression
- Proper caching headers
- Security headers
- Handles React Router client-side routing

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

All environment variables for Vite must be prefixed with `VITE_`.

## Volume Mounts (Development)

In development mode, the source code is mounted as a volume:
- Changes to your code are immediately reflected
- `node_modules` is kept in a separate volume for performance

## Ports

- **Development**: 5173 (Vite dev server)
- **Production**: 80 (Nginx) - mapped to 8080 on host

## Troubleshooting

### Port already in use

If port 5173 or 8080 is already in use:

```bash
# Change ports in docker-compose.yml or use different host ports
docker run -p 3000:5173 react-app:dev
```

### Permission issues (Linux/Mac)

If you encounter permission issues with volume mounts:

```bash
# Run with your user ID
docker run --user $(id -u):$(id -g) ...
```

### Clear Docker cache

If you need to rebuild from scratch:

```bash
docker-compose build --no-cache
```

## Production Deployment

For production deployment, you can:

1. Push the image to a container registry:
```bash
docker tag react-app:prod your-registry/react-app:latest
docker push your-registry/react-app:latest
```

2. Deploy to container orchestration platforms:
   - Kubernetes
   - Docker Swarm
   - AWS ECS
   - Azure Container Instances
   - Google Cloud Run

## Security Best Practices

- ✅ Uses official Node.js Alpine image (small footprint)
- ✅ Multi-stage build (no dev dependencies in production)
- ✅ Non-root user in production (Nginx)
- ✅ Security headers configured
- ✅ .dockerignore excludes sensitive files
- ✅ No secrets in the image

## Performance Optimizations

- Gzip compression enabled
- Static asset caching (1 year)
- HTML no-cache (for SPA updates)
- Minimal image size with Alpine Linux

## Next Steps

1. Customize `nginx.conf` for your specific needs
2. Add environment-specific configurations
3. Set up CI/CD pipeline for automated builds
4. Configure reverse proxy if needed
5. Add health checks for container orchestration
