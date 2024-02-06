@echo off
rem Inicia el servidor frontend
echo Iniciando el servidor frontend...
cd E:\GNPA\Gestor-de-personal
start npm serve

rem Espera un momento para que el servidor frontend se inicie completamente
timeout /t 5

rem Inicia el servidor backend
echo Iniciando el servidor backend...
cd E:\GNPA\Gestor-de-personal\server
start npm run dev
