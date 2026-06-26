# Proyecto CuentasDJ Mobile

## Contexto del proyecto

CuentasDJ Mobile es la adaptación para dispositivos móviles del proyecto CuentasDJ desarrollado inicialmente para entorno web. Este proyecto surge como una práctica enfocada en el aprendizaje y aplicación de tecnologías móviles modernas utilizando React Native y Expo para el desarrollo de interfaces y lógica de la aplicación.

La aplicación tiene como objetivo trasladar las funcionalidades principales del sistema de gestión de usuarios y cuentas hacia una plataforma móvil, manteniendo la estructura y lógica implementada previamente en la versión web.

Para optimizar el desarrollo y mantener consistencia entre plataformas, el backend y las bases de datos existentes fueron reutilizados desde la versión web.

---

## Estado actual del proyecto

Actualmente el proyecto se encuentra en fase activa de desarrollo.

En este momento la aplicación aún no cuenta con una versión estable para pruebas o uso final. El desarrollo se encuentra enfocado principalmente en:

- Adaptación de interfaces para dispositivos móviles
- Configuración de navegación entre pantallas
- Integración con el backend existente
- Implementación de lógica específica para React Native
- Migración y ajuste de componentes desde la versión web
- Validaciones y manejo de errores
- Optimización de rendimiento y estructura del proyecto

Debido a que el proyecto continúa en construcción, algunas funcionalidades pueden cambiar o ser modificadas durante el proceso de desarrollo.

---

## Tecnologías utilizadas

### Frontend móvil

- React Native
- Expo
- JavaScript
- Expo Router
- React Navigation
- AsyncStorage
- JWT Decode
- Fetch API
- React Hooks

### Backend reutilizado

La aplicación móvil utiliza la misma infraestructura desarrollada para la versión web:

- Node.js
- Express
- MySQL
- JWT
- bcrypt
- Nodemailer
- dotenv
- mysql2
- cors

---

## Arquitectura utilizada

La aplicación móvil reutiliza componentes importantes de la versión web con el objetivo de mantener consistencia entre plataformas y reducir duplicación de lógica.

Elementos reutilizados:

- Backend desarrollado con Node.js y Express
- Sistema de autenticación mediante JWT
- Bases de datos MySQL
- Estructura general de rutas y servicios
- Lógica de validaciones y seguridad

La adaptación principal se realiza sobre la capa visual y la interacción con el usuario para dispositivos móviles.

---

## Estructura general del proyecto

```bash
cuentasdjMobile/

├── app/
├── components/
├── assets/
├── styles/
├── services/
├── hooks/
├── utils/
├── package.json
└── README.md
```

La estructura puede variar durante el desarrollo dependiendo de nuevas funcionalidades o modificaciones futuras.

---

## Disponibilidad actual

Actualmente el proyecto no dispone de una versión pública ni estable para instalación o pruebas.

La aplicación continúa en desarrollo y se encuentra en una etapa de construcción y adaptación de funcionalidades.

---

## Próximas implementaciones

Algunas funcionalidades planeadas para próximas versiones incluyen:

- Inicio de sesión móvil
- Gestión de usuarios
- Integración completa con APIs existentes
- Persistencia local de datos
- Mejoras en la interfaz y experiencia de usuario
- Optimización de rendimiento
- Validaciones avanzadas
- Manejo estructurado de errores

---

## Observaciones finales

Este proyecto representa una evolución del sistema CuentasDJ hacia un entorno móvil reutilizando gran parte de la arquitectura desarrollada anteriormente.

Actualmente continúa en desarrollo activo y seguirá recibiendo mejoras, nuevas funcionalidades y optimizaciones con el paso del tiempo.

Al tratarse de un proyecto desarrollado por un único colaborador, algunas implementaciones, pruebas y correcciones pueden requerir tiempos adicionales.
