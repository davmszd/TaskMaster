# Start Backend and Frontend Development Servers

Write-Host "Starting Monorepo Development Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if pnpm is installed
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: pnpm is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Build shared package first
Write-Host "Building shared package..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
pnpm --filter shared build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to build shared package" -ForegroundColor Red
    exit 1
}

Write-Host "Shared package built successfully" -ForegroundColor Green
Write-Host ""

# Start backend in new window
Write-Host "Starting Backend (Nitro.js) on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\backend'; Write-Host 'Backend Server' -ForegroundColor Cyan; pnpm dev"

# Wait a moment
Start-Sleep -Seconds 2

# Start frontend in new window
Write-Host "Starting Frontend (React) on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\apps\frontend'; Write-Host 'Frontend Server' -ForegroundColor Cyan; pnpm dev"

Write-Host ""
Write-Host "Servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Access Points:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:3000/api" -ForegroundColor White
Write-Host "   Health:   http://localhost:3000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
