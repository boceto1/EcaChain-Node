# Docker 🐋🐳
1. [Linux](#linux-terminal)
2. [Windows](#windows)
3. [MacOS](#mac)
4. [Ejecutar Nodo](#ejecutar-nodo-mediante-docker-compose)
## Linux Terminal [Video tutorial](https://drive.google.com/file/d/1wcZpIMZ9x9afRJxXjEvTyTEI2ggamEkY/view?usp=share_link)
>Eliminamos cualquier instalación previa de dcoker
>
>```sudo apt-get remove docker docker-engine docker.io containerd runc```

>Actualizamos las librerias de linux
>
>```sudo apt-get update```

>Instalamos paquetes necesarios como certificaciones SSL, curl para consumo de urls, gnupg para el cifrado de datos y lsb-release para imprimir informacion de linux
>
>```sudo apt-get install ca-certificates curl gnupg lsb-release```

>Añadimos la licencia GPG para usar docker
>
>```sudo mkdir -m 0755 -p /etc/apt/keyrings```
>
>```curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg```

>Confiugramos el repositorio para la instalación
>
>```echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null```

>Posible error en GPG
>
>```sudo apt-get update```
>
>```sudo chmod a+r /etc/apt/keyrings/docker.gpg```
>
>```sudo apt-get update```

> Instalación de Engine y Compose
>
>```sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin```
>
>```docker --version```

## Windows [Video tutorial](https://drive.google.com/file/d/16QbCKXbwrxVky_ky0Hj0CHPbTOPOKhsA/view?usp=share_link)
>Instalamos WSL. Abrimos la powershell
>
>```wsl --install```

>Si tenemos la version 1 actualizamos 
>
>```wsl --update```

>Error de versione anteriores de Windows 10
> 
>```Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform```

>Usar wsl 2 por defecto
>
>```wsl --set-default-version 2```

>Descargamos y ejecutamos la aplicación Docker 
>[Desktop Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

## Mac [Video tutorial](#mac-video-tutorial)
>Descargamos el ejecutable
>[Desktop Mac chip Intel](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-amd64) |
>[Desktop Mac chip Apple](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-arm64)

>Doble clic sobre ```Docker.dmg```. abrimos el instaldor y al icono de Docker lo arrastramos a la Carpeta de Aplicaciones
>
>Doble clic sobre ```Docker.app``` ubicado en la carpeta de Aplicaciones 
>
>Seleccionamos el plan Desktop y Aceptamos 

## Ejecutar nodo mediante docker compose
>Descargamos el archivo 
>[docker-compose](/deploy/docker-compose.yml)
>
>Abrimos la terminal en la ruta del archivo descargado y ejecutamos el siguiente comando
>
>Para windows
>```docker-compose up -d```
>
>Para Linux y MacOS
>```sudo docker compose up -d```