# Verify Monorepo Setup

Write-Host "Verifying Monorepo Setup..." -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check pnpm
Write-Host "Checking pnpm..." -NoNewline
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " FAIL - Not installed" -ForegroundColor Red
    $allGood = $false
}

# Check workspace structure
Write-Host "Checking workspace structure..." -NoNewline
if ((Test-Path "pnpm-workspace.yaml") -and (Test-Path "apps/frontend") -and (Test-Path "apps/backend") -and (Test-Path "packages/shared")) {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " FAIL - Missing directories" -ForegroundColor Red
    $allGood = $false
}

# Check shared package
Write-Host "Checking shared package..." -NoNewline
if (Test-Path "packages/shared/dist/index.js") {
    Write-Host " OK - Built" -ForegroundColor Green
} else {
    Write-Host " WARN - Not built yet" -ForegroundColor Yellow
}

# Check frontend package.json
Write-Host "Checking frontend configuration..." -NoNewline
if (Test-Path "apps/frontend/package.json") {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $allGood = $false
}

# Check backend package.json
Write-Host "Checking backend configuration..." -NoNewline
if (Test-Path "apps/backend/package.json") {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " FAIL" -ForegroundColor Red
    $allGood = $false
}

# Check backend API files
Write-Host "Checking backend API endpoints..." -NoNewline
$apiFiles = @(
    "apps/backend/server/api/tasks/index.get.ts",
    "apps/backend/server/api/tasks/[id].get.ts",
    "apps/backend/server/api/health.get.ts"
)
$allApiFilesExist = $true
foreach ($file in $apiFiles) {
    if (!(Test-Path $file)) {
        $allApiFilesExist = $false
        break
    }
}
if ($allApiFilesExist) {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " FAIL - Missing API files" -ForegroundColor Red
    $allGood = $false
}

# Check node_modules
Write-Host "Checking dependencies..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " OK" -ForegroundColor Green
} else {
    Write-Host " WARN - Not installed" -ForegroundColor Yellow
}

Write-Host ""
if ($allGood) {
    Write-Host "Everything looks good!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run: .\start-dev.ps1" -ForegroundColor White
    Write-Host "  2. Open: http://localhost:5173" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "Some issues found. Please fix them before running." -ForegroundColor Red
    Write-Host ""
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
