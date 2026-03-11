# Fullstack Challenge - Gestión de Órdenes

Sistema completo CRUD (Create, Read, Update, Delete) para gestión de órdenes que fue usado como prueba tecnica.

## Arquitectura

```
fullstackchallenge/
├── types/                    # Tipos compartidos (Type Safety)
│   ├── shared.types.ts       # Definiciones compartidas entre frontend/backend
│   └── README.md
├── backend/                  # API REST con Express + TypeScript
│   ├── src/
│   │   ├── controllers/      # Controladores HTTP
│   │   ├── services/         # Lógica de negocio
│   │   ├── routes/           # Rutas de la API
│   │   ├── middleware/       # Middleware (error handling, etc.)
│   │   ├── utils/            # Utilidades (validators, response helper)
│   │   ├── config/           # Configuración (PostgreSQL)
│   │   └── types/            # Re-exportación de tipos compartidos
│   ├── database/             # SQL: schema y datos de ejemplo
│   └── __tests__/            # Tests unitarios e integración (Jest)
└── frontend/                 # Interfaz React
    ├── src/
    │   ├── components/       # Componentes React
    │   ├── hooks/            # Custom hooks
    │   ├── services/         # Servicios HTTP
    │   ├── schemas/          # Validación con Zod
    │   ├── types/            # Re-exportación de tipos compartidos
    │   └── providers/        # Context providers
    └── __tests__/            # Tests de componentes (Vitest)
```

## Características Principales

### **Type Safety con Tipos Compartidos**

- Tipos TypeScript compartidos entre frontend y backend
- Garantiza consistencia de datos en toda la aplicación
- Previene errores en tiempo de compilación
- Un solo lugar para definir estructuras de datos (`/types/shared.types.ts`)

### **Backend (Express + TypeScript + PostgreSQL)**

- Arquitectura limpia: Controllers → Services → Database
- Validación de datos con custom validators
- Manejo centralizado de errores
- Base de datos PostgreSQL (local con Docker)
- Testing con Jest (82.81% coverage)
- Paginación y filtrado de datos

### **Frontend (React + TypeScript + Tailwind)**

- Componentes reutilizables y modulares
- Custom hooks para lógica de negocio
- Validación client-side con Zod
- UI moderna con Tailwind CSS
- Testing con Vitest + React Testing Library
- Estados de carga y manejo de errores

## Stack Tecnológico

### Backend

| Tecnología | Versión | Propósito            |
| ---------- | ------- | -------------------- |
| TypeScript | 5.9     | Lenguaje tipado      |
| Express    | 4.21    | Framework web        |
| PostgreSQL | 16      | Base de datos        |
| pg         | 8.13    | Cliente PostgreSQL   |
| Jest       | 29.7    | Testing              |
| Supertest  | 7.0     | Tests de integración |
| UUID       | 11.0    | Generación de IDs    |

### Frontend

| Tecnología   | Versión | Propósito             |
| ------------ | ------- | --------------------- |
| React        | 19.1    | Biblioteca UI         |
| TypeScript   | 5.9     | Lenguaje tipado       |
| Vite         | 7.1     | Build tool            |
| Tailwind CSS | 4.1     | Estilos               |
| Zod          | 4.1     | Validación de schemas |
| Axios        | 1.12    | Cliente HTTP          |
| Vitest       | 3.0     | Testing               |

## Instalación y Ejecución

### Docker (recomendado, sin configuración)

La forma más rápida de ejecutar toda la aplicación. No necesitas crear cuentas ni configurar nada:

```bash
# 1. Clonar el repositorio
git clone https://github.com/juaniandrada23/fullstack-challenge.git
cd fullstackchallenge

# 2. Levantar toda la aplicación (PostgreSQL + Backend + Frontend)
docker-compose up

# La aplicación estará disponible en:
# - Frontend: http://localhost:5173
# - Backend:  http://localhost:3000
# - PostgreSQL: localhost:5432
```

La base de datos se crea automáticamente con el schema y datos de ejemplo.

**Documentación completa de Docker:** Ver [DOCKER.md](./DOCKER.md)

### Instalación manual

#### 1. PostgreSQL

Necesitas una instancia de PostgreSQL corriendo. Puedes usar Docker solo para la base de datos:

```bash
docker run -d --name orders-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=orders_db \
  -p 5432:5432 \
  postgres:16-alpine
```

Luego ejecuta el schema y seed:

```bash
psql postgresql://postgres:postgres@localhost:5432/orders_db -f backend/database/schema.sql
psql postgresql://postgres:postgres@localhost:5432/orders_db -f backend/database/seed.sql
```

#### 2. Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno (copiar desde la raiz del proyecto)
cp ../.env.example .env
# La configuración por defecto apunta a PostgreSQL local

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm test
```

#### 3. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm test
```

## API Endpoints

| Método | Endpoint      | Descripción                          |
| ------ | ------------- | ------------------------------------ |
| GET    | `/health`     | Health check del servidor            |
| GET    | `/orders`     | Obtener todas las órdenes (paginado) |
| GET    | `/orders/:id` | Obtener orden por ID                 |
| POST   | `/orders`     | Crear nueva orden                    |
| PUT    | `/orders/:id` | Actualizar orden existente           |
| DELETE | `/orders/:id` | Eliminar orden                       |

### Parámetros de Paginación (GET /orders)

- `page` (opcional): Número de página (default: 1)
- `page_size` (opcional): Tamaño de página (default: 10, max: 100)
- `status` (opcional): Filtrar por estado (pending, completed, cancelled)

### Ejemplo de Petición

```bash
# Crear una orden
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Juan Pérez",
    "item": "Laptop",
    "quantity": 2
  }'

# Obtener órdenes con filtros
curl "http://localhost:3000/orders?page=1&page_size=10&status=pending"
```

## Testing

### Backend (Jest)

```bash
cd backend

# Ejecutar todos los tests
npm test

# Modo watch
npm run test:watch

# Ver coverage
npm test -- --coverage
```

**Coverage actual:** 82.81%

- Validators: 94.11%
- Controllers: 86.66%
- Services: 72.91%

### Frontend (Vitest)

```bash
cd frontend

# Ejecutar tests
npm test

# UI interactiva
npm run test:ui

# Coverage
npm run test:coverage
```

## Docker

Este proyecto incluye configuración completa de Docker para desarrollo local fácil:

### Quick Start

```bash
# Desarrollo (sin configuración necesaria)
docker-compose up

# Producción
docker-compose -f docker-compose.prod.yml up
```

**Documentación completa:** [DOCKER.md](./DOCKER.md)

## Realizado por

**Juan Ignacio Andrada Cabo**
GitHub: [@juaniandrada23](https://github.com/juaniandrada23)

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
