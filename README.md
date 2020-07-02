# ECACHAIN
## Introducción
ECACHAIN es un ecosistema para el registro de actividades extracurriculares estudiantiles basado en tecnología Blockchain. Este ecosistema comprende de dos partes una Red Blockchain y un Cliente Web para su acceso a la red.

El presente repositorio corresponde a un nodo dentro de la red Blockchain.

## Requerimientos

- NodeJS
- Base de Datos Mongo DB
- Redis Server

## Installación

Una vez descargado el programa ejecuta el siguiente comando `npm install`

## Ejecutar el nodo

1. Ubicar en el archivo index.js la dirección de la base de datos Mongo DB, el puerto con el que se va a levantar el servidor y la dirección del nodo de referencia para la sincronización inicial del nodo blockchain. En las siguientes variables

```
const DEFAULT_PORT= 'default port';
const ROOT_NODE_ADDRESS = 'address'
const MONGO_URI = 'address';
```
2. Asegurarse de que el servidor redis esta en ejecución, en caso de no estarlo ejecuta el comando `redis-server`
3. Ejecute el comando `npm start`

__Nota:__ Si se ejecuta más de un nodo a la vez en la misma computadora utilizar `npm run dev-peer`, así la aplicación se levantará en un puerto diferente al definido por default.
 


## Referencia

Este trabajo esta tiene como base en el proyecto presentado en el curso de Udemy https://www.udemy.com/course/build-blockchain-full-stack/

Además la arquitectura está inspirada en el trabajo realizado para la plataforma EduCTX