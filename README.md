# EctoTecWeb (Angular)

Este proyecto realizado con Angular versión 10 para realizar un cliente web sencillo que consume un servicio web Rest full.

## Imagenes del proyecto 
![12](https://user-images.githubusercontent.com/28713740/111892643-e2671800-89c2-11eb-965f-d3756f2d3884.PNG)

![15](https://user-images.githubusercontent.com/28713740/111892655-fb6fc900-89c2-11eb-927e-d7b44d180a68.png)


## Clonar el proyecto
Iniciamos clonando el proyecto, para ello podemos usar cualquiera de las opciones brindadas:
```shell
Https: https://github.com/CarlosVazquezFarrera/EctoTec.git
Git CLi: gh repo clone CarlosVazquezFarrera/EctoTec
```
O descargamos el proyecto como .zip o usamos la aplicación github desktop
## Ejecutar el proyecto

### npm install
A través de una terminal nos movemos a la ruta en la que hemos colocado el proyecto descargado. Una vez estemos ahí ejecutamos el comando  `npm install` 
![6](https://user-images.githubusercontent.com/28713740/111882056-07cf3400-8979-11eb-86fd-b0edcca0556a.PNG)
Esto hará que se descarguen las dependencias necesaria para ejecutar el proyecto.  Esperamos unos minutos a que la descarga concluya. 
![7](https://user-images.githubusercontent.com/28713740/111882132-73190600-8979-11eb-9b18-249c9eaf5018.PNG)
Cuando haya terminado obtendremos un resultado similar
![8](https://user-images.githubusercontent.com/28713740/111882170-b5424780-8979-11eb-8265-4902fc6cb5eb.PNG)

### npm serve -o
Con ayuda del comando ` cd`  nos movemos a la carpeta **app** del proyecto 
![10](https://user-images.githubusercontent.com/28713740/111882319-9db78e80-897a-11eb-8ec0-593a338ff5c5.PNG)
Ya estando dentro de la carpeta app, ejecutamos el comando   ` npm serve -o` y esperamos a que termine de compilar. Cuando ello ocurra veremos un mensaje de éxito en la terminal y posteriormente se abrirá el navegador con la aplicación corriendo .

![11](https://user-images.githubusercontent.com/28713740/111892156-71256600-89be-11eb-87a4-4c2274bdd8fc.PNG)
![12](https://user-images.githubusercontent.com/28713740/111892169-974b0600-89be-11eb-800b-eff101fe19a6.PNG)

### Resumen 
Para ejecutar el proyecto sólo tenemos que escribir y ejecutar los siguientes comandos.
```shell
npm install
npm serve -o
```
## Resolver problemas con el api
Si llegamos a tener errores con el API debido a que el Url que ya se encuentra establecido por defecto no es la misma del servidor en producción, sólo tenemos que cambiarla por la Url actual. Para ello sólo copiamos la Url nueva de la Api, y nos dirigimos a la carpeta  `environments`  del proyecto actual 

![13](https://user-images.githubusercontent.com/28713740/111892310-e9405b80-89bf-11eb-8aac-0a4ee0f2988b.PNG)
 
Abrimos el archivo environments.prod.ts y environments.ts y cambiamos el valor de la variable `UrlApi` por el nuevo Url del Api

![14](https://user-images.githubusercontent.com/28713740/111892397-c5c9e080-89c0-11eb-83ee-b5994fad537b.PNG)
