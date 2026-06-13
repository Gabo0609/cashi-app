# Cashi — App Mobile de Finanzas Personales

## Descripción

Cashi es una aplicación móvil desarrollada con React Native y Expo para la gestión de finanzas personales.

La aplicación consume una API REST desarrollada en el ramo Desarrollo de Aplicaciones Web II, permitiendo autenticación mediante JWT, gestión de categorías, transacciones, balance financiero, comprobantes fotográficos y ubicación GPS.

---

# API utilizada

Backend desplegado en producción:

https://cashi-api-03az.onrender.com

---

# Tecnologías utilizadas

| Tecnología        | Uso                             |
| ----------------- | ------------------------------- |
| React Native      | Desarrollo móvil                |
| Expo              | Entorno de desarrollo           |
| Expo Router       | Navegación                      |
| TypeScript        | Tipado estático                 |
| Zod               | Validación                      |
| Expo Image Picker | Cámara y galería                |
| Expo Location     | GPS                             |
| Secure Store      | Almacenamiento seguro del token |
| Fetch API         | Consumo de backend REST         |
| JWT               | Autenticación                   |

---

# Cambios respecto a la Evaluación 3

- Se eliminó AsyncStorage como fuente principal de datos.
- Se integró la aplicación con una API REST real.
- Se implementó autenticación JWT.
- Las categorías se obtienen desde el servidor.
- Las transacciones se almacenan en PostgreSQL mediante el backend.
- El balance se obtiene desde el endpoint del servidor.
- Las coordenadas GPS se envían al backend.
- Los comprobantes fotográficos se asocian a las transacciones enviadas al servidor.

---

# Arquitectura

## hooks/

Contiene la lógica de negocio de la aplicación:

- useLogin
- useCategories
- useCategoryForm
- useTransactions
- useTransactionForm
- useImagePicker
- useLocation

## contexts/

Contiene AuthContext para gestionar autenticación y token JWT.

## lib/

Contiene api.ts, responsable de centralizar todas las peticiones HTTP hacia la API.

## app/

Contiene las pantallas y navegación utilizando Expo Router.

---

# Funcionalidades

## Autenticación

- Registro de usuarios
- Inicio de sesión
- Persistencia de token JWT
- Protección de endpoints

## Categorías

- Listar categorías
- Crear categorías
- Editar categorías
- Eliminar categorías

## Transacciones

- Crear transacciones
- Editar transacciones
- Eliminar transacciones
- Asociar categorías
- Registrar ingresos y egresos

## Comprobantes

- Captura mediante cámara
- Selección desde galería
- Asociación a transacciones

## Geolocalización

- Obtención de coordenadas GPS
- Asociación a transacciones

## Balance

- Total ingresos
- Total egresos
- Balance disponible

---

# Instalación

```bash
git clone https://github.com/Gabo0609/cashi-app.git

npm install

npx expo start
```

---

# Uso de Inteligencia Artificial

Durante el desarrollo se utilizó ChatGPT como apoyo para:

- Integración con backend REST
- Resolución de errores TypeScript
- Refactorización de hooks
- Corrección de errores de autenticación
- Revisión de arquitectura
- Preparación de documentación

Todo el código fue revisado, probado y adaptado manualmente antes de ser incorporado al proyecto.
