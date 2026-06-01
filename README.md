# Cashi — App Mobile de Finanzas Personales

## Descripción

Cashi es una aplicación móvil desarrollada con React Native y Expo para gestionar finanzas personales.

La aplicación permite:

- Iniciar sesión
- Administrar categorías
- Registrar ingresos y egresos
- Calcular balances automáticamente
- Adjuntar comprobantes fotográficos
- Registrar ubicación GPS en las transacciones
- Almacenar información localmente utilizando AsyncStorage

El proyecto fue desarrollado utilizando una arquitectura basada en hooks personalizados, validación con Zod y navegación mediante Expo Router.

---

# Tecnologías utilizadas

| Tecnología        | Uso                            |
| ----------------- | ------------------------------ |
| React Native      | Desarrollo de aplicación móvil |
| Expo              | Entorno de desarrollo          |
| Expo Router       | Navegación basada en archivos  |
| TypeScript        | Tipado estático                |
| AsyncStorage      | Persistencia local             |
| Zod               | Validación de formularios      |
| Expo Image Picker | Cámara y galería               |
| Expo Location     | Geolocalización GPS            |

---

# Estructura del proyecto

```txt
app/
  index.tsx
  _layout.tsx

  (tabs)/
    _layout.tsx
    index.tsx
    balance.tsx
    categories.tsx

    transaction/
      [id].tsx

    category/
      [id].tsx

hooks/
  useLogin.ts
  useCategories.ts
  useCategoryForm.ts
  useTransactions.ts
  useTransactionForm.ts
  useImagePicker.ts
  useLocation.ts

schemas/
  category.schema.ts
  transaction.schema.ts

types/
  category.ts
  transaction.ts

assets/
components/
constants/
```

---

# Arquitectura

El proyecto separa responsabilidades utilizando hooks personalizados.

## useLogin

Encargado de:

- Manejar autenticación local
- Validar credenciales
- Navegar hacia las tabs principales

## useCategories

Encargado de:

- Cargar categorías
- Crear categorías
- Editar categorías
- Eliminar categorías
- Persistir datos utilizando AsyncStorage

## useCategoryForm

Encargado de:

- Manejar estado del formulario
- Validar datos utilizando Zod
- Enviar formularios

## useTransactions

Encargado de:

- CRUD de transacciones
- Persistencia local
- Cálculo de balance
- Cálculo de ingresos y egresos
- Almacenamiento de comprobantes
- Almacenamiento de coordenadas GPS

## useTransactionForm

Encargado de:

- Estado del formulario
- Validación con Zod
- Creación y edición de transacciones

## useImagePicker

Encargado de:

- Tomar fotografías utilizando la cámara
- Seleccionar imágenes desde la galería
- Gestionar permisos de acceso
- Administrar comprobantes fotográficos

## useLocation

Encargado de:

- Solicitar permisos de ubicación
- Obtener coordenadas GPS
- Gestionar almacenamiento temporal de ubicación

---

# Funcionalidades

## Login

La aplicación utiliza autenticación local simple.

### Credenciales

```txt
Usuario: gabo@test.com
Contraseña: 1234
```

---

## Gestión de categorías

Permite:

- Crear categorías
- Editar categorías
- Eliminar categorías
- Persistir información localmente

---

## Gestión de transacciones

Permite:

- Crear transacciones
- Editar transacciones
- Eliminar transacciones
- Registrar ingresos
- Registrar egresos
- Asociar categorías

---

## Comprobante fotográfico

Cada transacción puede almacenar un comprobante mediante:

- Cámara del dispositivo
- Galería de imágenes

La imagen queda asociada a la transacción y se almacena junto a los demás datos.

---

## Geolocalización GPS

Cada transacción puede registrar la ubicación actual del dispositivo.

La información almacenada corresponde a:

- Latitud
- Longitud

---

## Balance financiero

La aplicación calcula automáticamente:

- Total de ingresos
- Total de egresos
- Balance disponible

---

# Persistencia de datos

La aplicación utiliza AsyncStorage para almacenar información localmente.

## Keys utilizadas

```txt
categories
transactions
```

La información permanece disponible incluso después de cerrar la aplicación.

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/Gabo0609/cashi-app.git
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar proyecto

```bash
npx expo start
```

---

# Flujo de prueba recomendado

1. Iniciar sesión
2. Crear categoría
3. Crear ingreso
4. Crear egreso
5. Adjuntar comprobante fotográfico
6. Obtener ubicación GPS
7. Guardar transacción
8. Revisar balance
9. Editar transacción
10. Eliminar transacción
11. Cerrar aplicación
12. Abrir nuevamente
13. Verificar persistencia de datos

---

# Navegación

La navegación fue desarrollada utilizando Expo Router.

## Tabs principales

- Transacciones
- Balance
- Categorías

## Rutas dinámicas

```txt
transaction/[id].tsx
category/[id].tsx
```

---

# TypeScript

El proyecto utiliza TypeScript para:

- Tipado seguro
- Validación de datos
- Reducción de errores
- Mejor mantenibilidad

---

# Uso de Inteligencia Artificial

Se utilizó ChatGPT como apoyo para:

- Organización de arquitectura
- Resolución de errores TypeScript
- Adaptación del template inicial
- Generación de ejemplos de hooks
- Revisión de estructura del proyecto
- Apoyo durante el desarrollo

Todo el código fue revisado, probado y adaptado manualmente durante el desarrollo.

---

# Autor

Gabriel Alvarez
