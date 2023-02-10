# Tabla de Contenidos

1. [Herramientas](#herramientas)
    * [Contenedores](#contenedores)
    * [Base de datos no SQL](#base-de-datos-no-sql)
    * [Express](#express)
    * [Base de datos en memoria cache](#base-de-datos-en-memoria-cache)
2. [Arquitectura](#arquitectura)
    * [Redis](#redis)
    * [PubSub](#publicación--suscripción)
    * [Mongo](#mongo)
3. [Instalación](#instalación)
    * [Creando dockerfile](#creando-dockerfile)
    * [Subiendo imagen al dockerhub](#subiendo-imagen-al-dockerhub)
    * [Creando docker-compose](#creando-docker-compose)
    * [Arquitectura MVC](#arquitectura-mvc)
4. [Decentralización](#decentralización)
---
## Herramientas
### Contenedores
> Un contenedor es la unidad estándar de software que empaqueta el código y todas las dependencias de la aplicación para un correcto funcionamiento dentro de otro entorno informático sin depender de sus herramientas instaladas.
El contenedor más famoso es Docker, que puede crear diferentes aplicaciones como muestra en el gráfico. [Más información](https://www.docker.com/resources/what-container/)
> <div align="center"><img alt="ejemplo grafico example de aplicaciones desplegadas con docker" src="https://www.docker.com/wp-content/uploads/2021/11/container-what-is-container.png" width="80%" /></div>

### Base de datos no SQL
> Una base de datos nosql se refiere a la gran variedad de tecnologías desarrolladas que buscan reducir el desarrollo en cascada, el almacenamiento de grandes volúmenes de información, datos no estructurados y polimórficos, entre otros.
[Más información](https://www.mongodb.com/es/nosql-explained)
### Express
> Es un marco de trabajo utilizado para el desarrollo web, escrito en javascript y alojado dentro del entorno NodeJS, este permite configurar el entorno y realizar tareas comunes dentro del desarrollo y publición web.
[Más información](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs)
### Base de datos en memoria cache
> Las bases de datos en memoria estan especialmente diseñadas para depender principalmente de la memoria en vez del almacenamiento de datos dentro de disco o SSD. Siendo ideales para aplicaciones donde se requieren tiempos de respuesta de microsegundos o tienen grandes picos de tráfico en la información. [Más información](https://aws.amazon.com/es/nosql/in-memory/)
---
## Arquitectura
<div align="center"><img alt="grafico de la arquitectura del aplicativo" src="./arquitectura.svg" width="80%" /></div>

### Redis
<div align="center"><img alt="logo de la herramienta redis" src="https://1000logos.net/wp-content/uploads/2020/08/Redis-Logo.png" width="35%" /></div>

> Es un almacén de estructura de datos en memoria usado como base de datos, caché, inetermediariao de mensajes y motor de transmision. Incluyendo una función de publicación y subscripción. [Más información](https://redis.io/docs/about/)
### Publicación / suscripción
> Para manejar sistemas descentralizados es de gran ayuda contar con subscripciónes, desupcripciones y publicación. El desacoplamiento de publicadores y suscriptores permite una mayor escalabilidad con una topología de red más dinámica. [Más información](https://redis.io/docs/manual/pubsub/)
### Mongo
<div align="center"><img alt="logo de la herramienta mongodb" src="https://cdn.iconscout.com/icon/free/png-256/mongodb-5-1175140.png" width="35%" /></div>

> Una base de datos no SQL es MongoDB el cual tiene alta disponibilidad, escalabilidad horizontal nativa y cuenta con la imagen del contenedor en dockerHub. [Más información](https://www.mongodb.com/es/nosql-explained)
---
## Instalación
### Creando dockerfile
Dockerfile cuenta con una estructura primero el nombre de la imagen y version.
> ```FROM node:16```

Declaramos la ruta donde vamos a trabajar dentro del contenedor
> ```WORKDIR /usr/src/app```

Copiamos los archivos necesarios donde estan las librerias de terceros para instalar el aplicativo
> ```COPY package*.json ./```

> ```COPY yarn*.lock ./```

Ejecutamos el comando de instalación esto depende en que se desarrolle si es yarn o npm
> ```RUN yarn install```

> ```RUN npm install ```

Copiamos todas las carpeta que necesitamos para ejecutar de forma correcta si son todas usamos dos puntos
> ```COPY . .```

Colocamos el puerto donde se esta ejecutando el aplicativo
> ```EXPOSE 3000```

Por ultimo el comando que ejecutara la aplicación
> ```CMD [ "node", "./built/index.js" ]```

El [archivo](Dockerfile.yml) que contiene toda la configuración

Una vez listo el dockerfile ejecutamos el comando dentro de la ruta del archivo
> ```docker build -t username/imagen:num-version .```

### Subiendo imagen al dockerhub
Despues de tener el aplicativo deseado listo, probado y con las ultimas actualizaciones escribimos el siguiente comando el cual subira a docker hub la imagen para que pueda ser usada de forma publica
> ```docker push username/imagen:num-version```

### Creando docker-compose
Una vez con la imagen subida al Hub de docker podemos descargarla en cualquier ordenados usando pull o mediante docker compose para este ultimo tenemos:

El nombre que tendra el servicio que agrupa los contenedores
> ```eca_chain_server```

El nombre que daremos al contenedor
> ```container_name: eca-chain```

El nombre de la imagen subida en dockerHub con su respectiva versión
> ```image: dipaz/eca-chain-server:v1```

Variables de entorno usados en la imagen del contenedor
> environment:
    > - MONGO_URI_1: mongodb://root:example@IpPcAnfitrion:27017/admin

El puerto donde se quiere ejecutar la aplicación del ordenado y el puerto que se ejecuta dentro del contenedor
> ports:
    > - "3000:3000"

El [archivo](docker-compose.yml) que contiene toda la configuración

Una vez listo el docker-compose.yml ejecutamos el comando dentro de la ruta del archivo
> ```docker-compose up -D```
### Arquitectura MVC
> * **Modelo** contiene una representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
> * **Vista** interfaz de usuario, que compone la información que se envía al cliente y los mecanismos de interacción con éste.
> * **Controlador** actúa como intermediario entre el Modelo y la Vista, gestionando el flujo de información entre ellos y las transformaciones para adaptar los datos a las necesidades de cada uno. [Más información](https://si.ua.es/es/documentacion/asp-net-mvc-3/1-dia/modelo-vista-controlador-mvc.html)
---
## Descentralización
> Dentro del mundo digital para solventar la latencia y sobrecarga de hardware se utiliza el cómputo edge, fog y cloud. Con dispositivos perimetrales para nodos de enlace que se agregan y empaquetan los datos utilizando recursos de la nube, obteniendo de la forma óptima para los sistemas de información [(Song y otros, 2018)](https://ieeexplore.ieee.org/document/8428720), se propone un diseño novedoso para los sistemas de almacenamiento descentralizado preservando la privacidad basada en firmas y direcciones únicas [(Kopp y otros, 2017)](https://ieeexplore.ieee.org/abstract/document/7966965)
<div align="center"><img alt="logo de la herramienta mongodb" src="./Imagen1.png" width="85%" /></div>
<div align="center"><img alt="logo de la herramienta mongodb" src="./Imagen2.png" width="85%" /></div>
