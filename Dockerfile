# Usa una imagen base con Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /front

# Copia el archivo package.json al directorio de trabajo
COPY front/package.json ./

# Instala las dependencias
RUN npm install

# Copia todo el contenido del directorio actual al directorio de trabajo en el contenedor
COPY front .

# Expone el puerto 4200 para la aplicación de Angular
EXPOSE 4200

# Comando para ejecutar la aplicación de Angular
CMD ["npm", "start"]
