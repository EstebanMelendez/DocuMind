# DocuMind Enterprise

DocuMind Enterprise es una plataforma de gestión documental inteligente. Este repositorio contiene el código fuente completo, incluyendo el frontend, el backend y toda la documentación del ciclo de vida del desarrollo.

## 📂 Estructura del Proyecto

El proyecto está dividido en tres componentes principales:

- **`/backend`**: Contiene la API REST desarrollada en Python (FastAPI). Se encarga de la lógica de negocio, autenticación de usuarios, procesamiento de datos y la conexión con la base de datos PostgreSQL (con soporte para `pgvector`).
- **`/frontend`**: Contiene la interfaz de usuario desarrollada en React y Vite, estilizada con TailwindCSS. Es el portal a través del cual los usuarios interactúan con el sistema.
- **`/documentos`**: Almacena toda la documentación oficial del proyecto, organizada por fases (Análisis, Diseño, Desarrollo, Pruebas, Implementación, Manuales y Trazabilidad).

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### Requisitos Previos
- [Docker](https://www.docker.com/) y Docker Compose
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Python](https://www.python.org/) (v3.10 o superior)

### 1. Levantar la Base de Datos
El proyecto utiliza PostgreSQL. Puedes levantar la base de datos rápidamente usando Docker. Desde la raíz del proyecto, ejecuta:
```bash
docker-compose up -d
```
Esto creará un contenedor llamado `documind_db` exponiendo el puerto `5432`.

### 2. Configurar y Levantar el Backend
Abre una terminal y navega a la carpeta del backend:
```bash
cd backend
```

Crea y activa un entorno virtual (recomendado):
```bash
python -m venv venv
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
# source venv/bin/activate
```

Instala las dependencias:
```bash
pip install -r requirements.txt
```

Asegúrate de configurar las variables de entorno en el archivo `.env` del backend. Debe incluir al menos la cadena de conexión a la base de datos (`DATABASE_URL`).

**Crear el usuario Administrador:**
Para acceder al sistema por primera vez, necesitas crear el usuario inicial. Ejecuta el script de creación:
```bash
python create_admin.py
```
*Este script conectará con la base de datos y generará (o actualizará) el usuario con las siguientes credenciales:*
- **Email:** `admin@documind.com`
- **Contraseña:** `admin123`

Finalmente, inicia el servidor de desarrollo:
```bash
uvicorn main:app --reload
```
*(El backend debería estar corriendo en `http://localhost:8000`)*

### 3. Configurar y Levantar el Frontend
Abre otra terminal y navega a la carpeta del frontend:
```bash
cd frontend
```

Instala las dependencias del proyecto:
```bash
npm install
```

Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```
*(El frontend debería estar disponible en `http://localhost:5173`)*

---

## 📝 Documentación
Puedes encontrar la documentación completa de cada fase del proyecto dentro de la carpeta `documentos/`. Si deseas agregar nuevos archivos, colócalos en su respectiva subcarpeta y súbelos a Git.

## 🤝 Contribución
Al realizar cambios importantes, recuerda actualizar el esquema de base de datos o agregar scripts de migración, así como documentar los nuevos componentes en este README si es necesario.
