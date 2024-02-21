FROM node:20

# Instalar las dependencias del backend
RUN mkdir -p /home/app/server

# Establecer el directorio de trabajo
WORKDIR /home/app/server

# Copiar el archivo package.json y pnpm-lock.yaml para instalar dependencias
#COPY package.json pnpm-lock.yaml ./
# COPY package.json package-lock.json ./


# # Instalar pnpm y las dependencias
# #RUN npm install -g pnpm && pnpm install
# RUN npm install 

# # Copiar el resto de los archivos de la aplicación
# COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación con nodemon y babel-node
CMD ["npm", "run", "dev"]
