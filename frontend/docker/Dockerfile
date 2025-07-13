FROM node:18 as build

WORKDIR /app

# Copiar solo package.json primero (sin package-lock.json)
COPY package.json ./

# Usar npm install en lugar de npm ci
# Y especificar Rollup a la versión 2.79.1 que sabemos que funciona
RUN npm install && \
    npm install --save-dev rollup@2.79.1

# Copiar el resto del código fuente después de instalar dependencias
COPY . .

# Configurar variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]