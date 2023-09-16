# Usa una imagen base con Node.js
FROM ubuntu:latest

# Directorio de trabajo dentro del contenedor
WORKDIR /front

# Copia el archivo package.json al directorio de trabajo
COPY front/package.json ./

# Instala npm
RUN apt-get update && apt-get install -y npm curl

# Actualiza node
RUN npm install -g n
RUN n stable
RUN n prune

# Instala las dependencias
RUN npm install

# Copia todo el contenido del directorio actual al directorio de trabajo en el contenedor
COPY front .

# Expone el puerto 4200 para la aplicación de Angular
EXPOSE 4200

# Comando para ejecutar la aplicación de Angular
ENTRYPOINT ["npm", "start"]
