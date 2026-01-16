# Docker Quick Start Scripts

Write-Host "🐳 Docker Setup for React App" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Select an option:" -ForegroundColor Yellow
    Write-Host "1. Run Development Environment (port 5173)"
    Write-Host "2. Run Production Environment (port 8080)"
    Write-Host "3. Build Development Image"
    Write-Host "4. Build Production Image"
    Write-Host "5. Stop All Containers"
    Write-Host "6. Clean Up (remove containers and images)"
    Write-Host "7. View Logs"
    Write-Host "8. Exit"
    Write-Host ""
}

function Start-DevEnvironment {
    Write-Host "🚀 Starting development environment..." -ForegroundColor Green
    docker-compose up react-app-dev
}

function Start-ProdEnvironment {
    Write-Host "🚀 Starting production environment..." -ForegroundColor Green
    docker-compose up react-app-prod
}

function Build-DevImage {
    Write-Host "🔨 Building development image..." -ForegroundColor Green
    docker build --target development -t react-app:dev .
    Write-Host "✅ Development image built successfully!" -ForegroundColor Green
}

function Build-ProdImage {
    Write-Host "🔨 Building production image..." -ForegroundColor Green
    docker build --target production -t react-app:prod .
    Write-Host "✅ Production image built successfully!" -ForegroundColor Green
}

function Stop-Containers {
    Write-Host "🛑 Stopping all containers..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "✅ All containers stopped!" -ForegroundColor Green
}

function Clean-Docker {
    Write-Host "🧹 Cleaning up Docker resources..." -ForegroundColor Yellow
    docker-compose down --rmi all --volumes
    Write-Host "✅ Cleanup complete!" -ForegroundColor Green
}

function Show-Logs {
    Write-Host "📋 Select container to view logs:" -ForegroundColor Yellow
    Write-Host "1. Development"
    Write-Host "2. Production"
    $logChoice = Read-Host "Enter choice"
    
    if ($logChoice -eq "1") {
        docker-compose logs -f react-app-dev
    } elseif ($logChoice -eq "2") {
        docker-compose logs -f react-app-prod
    }
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Enter your choice (1-8)"
    
    switch ($choice) {
        "1" { Start-DevEnvironment }
        "2" { Start-ProdEnvironment }
        "3" { Build-DevImage }
        "4" { Build-ProdImage }
        "5" { Stop-Containers }
        "6" { Clean-Docker }
        "7" { Show-Logs }
        "8" { 
            Write-Host "👋 Goodbye!" -ForegroundColor Cyan
            exit 
        }
        default { 
            Write-Host "❌ Invalid choice. Please select 1-8." -ForegroundColor Red 
        }
    }
    
    Write-Host ""
    Write-Host "Press any key to continue..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Clear-Host
}
