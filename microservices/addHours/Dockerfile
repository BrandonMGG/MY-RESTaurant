# Usar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /addHours

# Copiar los archivos necesarios
COPY . .

# Instalar las dependencias
RUN pip install Flask

# Exponer el puerto en el que correrá el servicio
EXPOSE 5001

# Definir el comando por defecto
CMD ["python", "addHours.py"]
