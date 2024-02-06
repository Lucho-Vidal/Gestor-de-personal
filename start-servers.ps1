# Inicia el servidor frontend
Write-Host "Iniciando el servidor frontend..."
#Set-Location C:\Users\lucia\workspace\trenesArgentinos\Gestor-de-personal
Set-Location E:\GNPA\Gestor-de-personal
Start-Process npm -ArgumentList "run", "serve" -NoNewWindow

# Espera un momento para que el servidor frontend se inicie completamente
Start-Sleep -Seconds 5

# Inicia el servidor backend
Write-Host "Iniciando el servidor backend..."
#Set-Location C:\Users\lucia\workspace\trenesArgentinos\Gestor-de-personal\server
Set-Location E:\GNPA\Gestor-de-personal\server
Start-Process npm -ArgumentList "run", "dev" -NoNewWindow