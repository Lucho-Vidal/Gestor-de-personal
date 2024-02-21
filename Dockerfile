# Utilizar una imagen más específica para Vue.js
FROM node:20

# Instalar pnpm
RUN npm install -g pnpm

# Crear y establecer el directorio de trabajo
WORKDIR /home/app

# # Copiar solo los archivos necesarios para instalar dependencias (package.json y pnpm-lock.yaml)
# COPY package.json pnpm-lock.yaml ./

# # Instalar dependencias
# RUN pnpm install

# # Copiar el resto de los archivos de la aplicación
# COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["pnpm", "run", "serve"]
