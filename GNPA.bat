@echo off
rem Inicia el servidor frontend
echo Iniciando el servidor frontend 5173...
cd E:\GNPA\GNPA2\Gestor-de-personal\
start pnpm run dev --host

rem Espera un momento para que el servidor frontend se inicie completamente
timeout /t 5

rem Inicia el servidor backend
echo Iniciando el servidor backend...
cd E:\GNPA\GNPA2\Gestor-de-personal\server
start pnpm run dev

#rem Espera un momento para que el servidor frontend se inicie completamente
#timeout /t 5

#rem Inicia el servidor frontend
#echo Iniciando el servidor frontend 8080...
#cd E:\GNPA\Gestor-de-personal
#start npm run serve 