# Cashi — App Mobile de Finanzas Personales

## Descripción

Cashi es una aplicación móvil desarrollada con React Native y Expo para gestionar finanzas personales.

La aplicación permite:

- iniciar sesión
- administrar categorías
- registrar ingresos y egresos
- calcular balances automáticamente
- almacenar información localmente usando AsyncStorage

El proyecto fue desarrollado utilizando una arquitectura basada en hooks personalizados, validación con Zod y navegación con Expo Router.

---

# Tecnologías utilizadas

| Tecnología   | Uso                                 |
| ------------ | ----------------------------------- |
| React Native | Desarrollo de aplicación móvil      |
| Expo         | Entorno de desarrollo y compilación |
| Expo Router  | Navegación basada en archivos       |
| TypeScript   | Tipado estático                     |
| AsyncStorage | Persistencia de datos local         |
| Zod          | Validación de formularios           |

---

# Estructura del proyecto

````txt
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

schemas/
  category.schema.ts
  transaction.schema.ts

types/
  category.ts
  transaction.ts

assets/
components/
constants/


---

# Parte 3 — Arquitectura

```md
---

# Arquitectura

El proyecto separa responsabilidades utilizando hooks personalizados.

## Hooks principales

### useLogin

Encargado de:

- manejar autenticación local
- validar credenciales
- navegar hacia las tabs

---

### useCategories

Encargado de:

- cargar categorías
- crear categorías
- editar categorías
- eliminar categorías
- persistir datos usando AsyncStorage

---

### useCategoryForm

Encargado de:

- manejar estado del formulario
- validar datos con Zod
- enviar formularios

---

### useTransactions

Encargado de:

- CRUD de transacciones
- persistencia local
- cálculo de balance
- cálculo de ingresos y egresos

---

### useTransactionForm

Encargado de:

- estado del formulario
- validación con Zod
- edición y creación de transacciones

---

# Funcionalidades

## Login

La aplicación utiliza un login local simple.

### Credenciales

```txt
Usuario: gabo@test.com
Contraseña: 1234


---

# Parte 5 — Persistencia y validaciones

```md
---

# Persistencia de datos

La aplicación utiliza AsyncStorage para almacenar información localmente.

## Keys utilizadas

```txt
categories
transactions


---

# Parte 6 — Instalación y ejecución

```md
---

# Instalación

## Clonar repositorio

```bash
git clone <url-del-repositorio>


---

# Parte 7 — Flujo de prueba y cierre

```md
---

# Flujo de prueba recomendado

1. Iniciar sesión
2. Crear categoría
3. Crear ingreso
4. Crear egreso
5. Revisar balance
6. Editar categoría
7. Editar transacción
8. Eliminar transacción
9. Cerrar aplicación
10. Abrir nuevamente
11. Verificar persistencia de datos

---

# TypeScript

El proyecto utiliza TypeScript para:

- tipado seguro
- validación de datos
- reducción de errores
- mejor mantenibilidad

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


Uso de Inteligencia Artificial

Se utilizó ChatGPT como apoyo para:

organización de arquitectura
resolución de errores TypeScript
adaptación del template inicial
generación de ejemplos de hooks
revisión de estructura del proyecto
apoyo durante el desarrollo

Todo el código fue revisado, probado y adaptado manualmente durante el desarrollo.

Autor

Gabriel Alvarez
````
