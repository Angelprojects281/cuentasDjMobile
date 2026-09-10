# CuentasDJ Mobile

Aplicación móvil de **CuentasDJ** para la gestión de usuarios, registros de producción y auditoría de actividades en una empresa de alimentos.

This repository contains the mobile client for **CuentasDJ**, a system for managing users, production records, and system activity auditing in a food company.

La aplicación está desarrollada con **React Native**, **Expo** y **Expo Router**. Consume la API REST del proyecto web para compartir autenticación, usuarios, producción y auditoría entre plataformas.

The application is built with **React Native**, **Expo**, and **Expo Router**. It consumes the web project's REST API so authentication, users, production, and auditing can be shared across platforms.

---

## Índice / Table of Contents

- [Descripción / Overview](#descripción--overview)
- [Arquitectura / Architecture](#arquitectura--architecture)
- [Características / Features](#características--features)
- [Requisitos / Requirements](#requisitos--requirements)
- [Instalación / Installation](#instalación--installation)
- [Configuración / Configuration](#configuración--configuration)
- [Ejecución / Running the application](#ejecución--running-the-application)
- [Roles / User roles](#roles--user-roles)
- [API](#api)
- [Estructura / Structure](#estructura--structure)
- [Seguridad / Security](#seguridad--security)
- [Limitaciones / Limitations](#limitaciones--limitations)

---

# Español

## Descripción

CuentasDJ Mobile es el cliente móvil de CuentasDJ. Permite iniciar sesión, consultar y administrar usuarios según el rol, registrar producción, gestionar baches y consultar actividades de auditoría.

El backend y la base de datos pertenecen al proyecto web de CuentasDJ. Este repositorio contiene únicamente la aplicación móvil y su configuración nativa para Android.

## Arquitectura

```text
Dispositivo Android o emulador
	|
	v
React Native + Expo SDK 56
	|
	| Fetch API
	v
API REST de CuentasDJ
	|
	v
Backend Node.js + Express
	|
	v
Base de datos MySQL: cuentasdj
```

La navegación se gestiona con **Expo Router** a partir de la carpeta `app/`. La sesión se conserva mediante `expo-secure-store`, y el token JWT determina el panel que puede utilizar cada usuario.

## Características

- Inicio de sesión con tokens JWT.
- Redirección según los roles `admin`, `regular` y `auditor`.
- Almacenamiento seguro del token de sesión.
- Creación, consulta y eliminación de usuarios.
- Cambio de contraseña mediante código enviado por correo.
- Creación de registros de producción por turno y fecha.
- Registro de baches asociados a cada producción.
- Consulta y eliminación de registros de producción.
- Consulta de actividades de auditoría por tipo y rango de fechas.
- Validación de campos y mensajes de error en la interfaz móvil.

## Requisitos

- Node.js y npm.
- Android Studio y Android SDK para ejecutar la aplicación en Android.
- Un emulador Android o un dispositivo físico con depuración USB habilitada.
- El backend de CuentasDJ ejecutándose y accesible desde el dispositivo.
- MySQL configurado en el backend, si también se ejecuta localmente.

Para trabajar con el proyecto se recomienda utilizar las versiones compatibles definidas por Expo SDK 56. Consulta la [documentación de Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) para conocer los requisitos específicos del entorno.

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd cuentasdjMobile
npm install
```

## Configuración

### Dirección de la API

La aplicación utiliza actualmente `http://10.0.2.2:4000` en sus solicitudes HTTP. Esta dirección corresponde al equipo anfitrión cuando se utiliza el emulador Android de Android Studio.

Si utilizas un dispositivo físico, reemplaza `10.0.2.2` por la dirección IP local de tu equipo, por ejemplo:

```text
http://192.168.1.100:4000
```

El dispositivo y el equipo deben estar conectados a la misma red, y el backend debe aceptar conexiones externas en el puerto configurado.

Antes de iniciar la aplicación, verifica que la API responda desde el entorno de ejecución. La ruta raíz del backend debería estar disponible en:

```text
http://<HOST_DEL_BACKEND>:4000/
```

> La URL de la API está definida directamente en las pantallas actuales. Si necesitas cambiarla por entorno, conviene centralizarla en una variable de configuración antes de preparar una compilación de producción.

### Configuración de Expo

La configuración principal se encuentra en [`app.json`](app.json):

- Nombre y versión de la aplicación.
- Orientación vertical.
- Identificador Android `com.angelprojects.cuentasdjMobile`.
- Icono y esquema de navegación `cuentasDJ`.
- Plugins de Expo Router, Secure Store y selectores nativos.

## Ejecución

Inicia el servidor de desarrollo:

```bash
npm start
```

Desde la interfaz de Expo puedes abrir la aplicación en un emulador Android, un dispositivo físico o un navegador para las pantallas compatibles con web.

Para ejecutar directamente en Android:

```bash
npm run android
```

Para ejecutar la versión web de desarrollo:

```bash
npm run web
```

Para revisar el código con ESLint:

```bash
npm run lint
```

El script `npm run android` requiere que Android Studio, el SDK y un emulador o dispositivo válido estén configurados correctamente.

## Roles

| Rol       | Responsabilidades                                                                           |
| --------- | ------------------------------------------------------------------------------------------- |
| `admin`   | Gestionar usuarios, crear usuarios, consultar registros y eliminar registros de producción. |
| `regular` | Crear registros de producción y registrar sus baches asociados.                             |
| `auditor` | Consultar la actividad registrada en el sistema por tipo y rango de fechas.                 |

Todos los roles pueden cerrar sesión y utilizar el flujo de cambio de contraseña.

## API

La aplicación consume las siguientes rutas del backend mediante el prefijo `/api`:

| Método   | Ruta                                  | Uso                                               |
| -------- | ------------------------------------- | ------------------------------------------------- |
| `POST`   | `/api/login`                          | Iniciar sesión.                                   |
| `POST`   | `/api/cambiarcontrasena`              | Solicitar un código de cambio de contraseña.      |
| `POST`   | `/api/verificarCodigo`                | Verificar el código de cambio.                    |
| `POST`   | `/api/crearUsuario`                   | Crear un usuario.                                 |
| `GET`    | `/api/listarUsuarios`                 | Listar usuarios.                                  |
| `DELETE` | `/api/usuario/:idUsuarios`            | Eliminar un usuario autenticado.                  |
| `POST`   | `/api/crearRegistro`                  | Crear un registro de producción.                  |
| `GET`    | `/api/consultarRegistro`              | Consultar producción por turno y fecha.           |
| `DELETE` | `/api/eliminarRegistro/:idProduccion` | Eliminar una producción y sus baches.             |
| `GET`    | `/api/consultarAuditoria`             | Consultar actividades por tipo y rango de fechas. |

La ruta raíz `GET /` sirve como comprobación básica del backend.

## Estructura

```text
cuentasdjMobile/
|-- app/
|   |-- index.tsx                     # Pantalla inicial
|   |-- general/                      # Inicio y cambio de contraseña
|   |-- adminUser/                    # Pantallas del administrador
|   |-- regularUser/                  # Pantallas del usuario regular
|   `-- audiUser/                     # Pantallas del auditor
|-- assets/                           # Logotipo y recursos gráficos
|-- styles/styles.tsx                 # Estilos compartidos
|-- android/                          # Proyecto nativo Android generado
|-- app.json                          # Configuración de Expo
|-- index.js                          # Entrada de Expo Router
|-- package.json                      # Dependencias y scripts
|-- tsconfig.json                     # Configuración de TypeScript
`-- README.md
```

## Seguridad

- El token JWT se almacena con `expo-secure-store`.
- No incluyas tokens, credenciales ni contraseñas en el código fuente.
- No distribuyas una compilación de producción con una URL de backend de desarrollo sin revisar su configuración.
- Utiliza HTTPS cuando la aplicación se conecte a un backend fuera de una red local.
- Mantén las validaciones de autorización en el backend; las validaciones de la aplicación móvil no sustituyen la seguridad del servidor.
- Cambia las credenciales iniciales y las claves secretas del backend antes de desplegar el sistema.

## Limitaciones conocidas

- La URL del backend está escrita directamente en las pantallas y debe cambiarse para cada entorno de red.
- La aplicación depende de que la API web y la base de datos estén disponibles.
- El repositorio móvil no incluye el backend ni el esquema SQL.
- No hay un conjunto de pruebas automatizadas configurado en `package.json`.
- La compilación y distribución para iOS todavía requieren una configuración específica de ese entorno.

---

# English

## Overview

CuentasDJ Mobile is the mobile client for CuentasDJ. It supports authentication, role-based user management, production records, batch registration, and system activity auditing.

The backend and database belong to the CuentasDJ web project. This repository contains the mobile application and its Android native configuration.

## Installation and running

Install dependencies with `npm install`, make the REST API available to the device, and start Expo with `npm start`. Use `npm run android` for a local Android build, `npm run web` for the web development target, and `npm run lint` for linting.

The default Android emulator API host is `http://10.0.2.2:4000`. Physical devices must use the local IP address of the computer running the backend and must be connected to the same network.

See the Spanish sections above for the complete architecture, API routes, project structure, security notes, and known limitations.
