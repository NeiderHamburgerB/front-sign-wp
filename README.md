# Arquitectura del Frontend

## Resumen
Este proyecto en React está diseñado para ser modular, eficiente y escalable. Me aseguré de organizar cada parte de manera clara para facilitar el desarrollo. El manejo del estado global lo hago con Redux Toolkit, complementado con persistencia usando Redux Persist. Todo el proyecto está desplegado de forma automatizada en AWS Amplify

## Estructura del Proyecto
Organizo la estructura del proyecto basándome en funcionalidades, lo que permite que cada módulo sea independiente, reutilizable y fácil de trabajar

### Carpetas Principales
- **`src/features`**: Cada funcionalidad tiene su propia carpeta con todo lo necesario para funcionar de manera independiente:
  - **`checkout`**: Incluye la lógica de compras, componentes reutilizables, reducers, pruebas unitarias y definiciones de tipos
  - **`products`**: Gestiona todo lo relacionado con los productos, como acciones de estado, componentes reutilizables (tarjetas, paginación), reducers y pruebas

- **`src/hooks`**: Contiene hooks personalizados que encapsulan lógica compartida para maximizar la reutilización de código.
- **`src/store`**: Aquí configuro el estado global con Redux Toolkit y Redux Persist para manejar datos que se mantienen entre sesiones.
- **`src/tests`**: Contiene las pruebas unitarias de los reducers

## Tecnologías implementadas
- **React**
- **Redux Toolkit**
- **Redux Persist**
- **TypeScript**
- **AWS Amplify**

## Estado y Pruebas
La app utiliza Redux para gestionar el estado global, y solo configuré pruebas unitarias específicas para los reducers

## Despliegue
El proyecto está alojado en AWS Amplify y puedes consultarlo en el siguiente enlace: https://main.d11nm9iz8e6c2q.amplifyapp.com



