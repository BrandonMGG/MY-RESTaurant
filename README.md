# Bienvenidos a la documentación de la aplicacion web My-RESTaurant-4!

Esta página contiene la documentación general del proyecto.

## Visión general de la arquitectura.

La arquitectura propuesta es una arquitectura de microservicios para una aplicación de menú interactivo y gestión de reservas para un restaurante. La aplicación consta de múltiples microservicios independientes que se comunican mediante APIs ligeras, siguiendo el principio de separación de responsabilidades. El frontend se comunica con los microservicios a través de un API Gateway, que centraliza y gestiona las solicitudes, proporcionando un punto de acceso único. La arquitectura está diseñada para ser altamente modular, flexible y escalable, permitiendo la incorporación de nuevos microservicios y la expansión de funcionalidades de manera eficiente.

### Estructura de la arquitectura:
Todos los microservicios son independientes y están diseñados para realizar una función específica. Se comunican por el API Gateway según sea necesario, siguiendo el principio de separación de responsabilidades.

1.	Capa de Presentación:

  	   •  Interfaz de Usuario: Interactúa con los usuarios proporcionando interfaces para la gestión de reservas, visualización de menús, recomendaciones y operaciones de autenticación.

2.	Capa de Lógica de Negocio:
   
      •	Lógica de Negocio de Reservas: Incluye la lógica para la gestión completa de reservas, desde la creación hasta la cancelación.
     	
      •	Autenticación de Usuarios: Implementa la lógica para autenticar usuarios y gestionar sesiones.
      
      •	Recomendaciones de Comida: Contiene los algoritmos y la lógica para generar recomendaciones de platos.
      
      •	Gestión de Menús: Incluye la lógica necesaria para mostrar menús.

3.	Capa de Datos:

      •	Almacenamiento de Datos de Usuarios: Gestiona la información de los usuarios, como credenciales y perfiles, en una base de datos de mongo.
     	
      •	Almacenamiento de Menús: Almacena los detalles de los menús del restaurante.
      
      •	Almacenamiento de Reservas: Guarda toda la información relacionada con las reservas


### Naturaleza orientada a microservicios:
La arquitectura de microservicios separa las funcionalidades de la aplicación en servicios independientes y reutilizables. Cada microservicio cumple una función específica y se comunica directamente con el frontend según sea necesario. Esto facilita la modularidad, la flexibilidad y la interoperabilidad de la aplicación, permitiendo la incorporación de nuevos microservicios y la evolución de la aplicación de manera gradual y eficiente.

Cada microservicio se diseñó para ser independiente y reutilizable, lo que facilita su mantenimiento y actualización. Los microservicios se comunican con el frontend a través del api gateway, lo que permite un único punto de acceso a cada microservicio disponible. La separación de funciones realizada permite escalar vertical u horizontalmente según la demanda específica de cada microservicio, optimizando los recursos y el rendimiento del sistema de manera eficiente.


### Rediseño del proyecto:

1. Identificación de Servicios Clave:

Analizamos el proyecto actual para identificar las principales funcionalidades y componentes.
Determinamos qué partes del backend se pueden convertir en servicios independientes, como la gestión de reservas y la autenticación de usuarios.

2. Separación de Funcionalidades:
   
Dividimos las funcionalidades del backend en servicios distintos, cada uno con su propia responsabilidad.
Por ejemplo, creamos un servicio específico para la autenticación de usuarios y otro para la gestión de reservas.

3. Definición de Interfaces:
   
Establecemos interfaces claras y estándares de comunicación entre el frontend y los nuevos servicios.
Definimos cómo el frontend puede enviar solicitudes y recibir respuestas de los servicios.

4. Implementación de Servicios:
   
Desarrollamos los nuevos servicios basados en las especificaciones definidas.
Por ejemplo, creamos un servicio de autenticación que maneja el registro de usuarios, la autenticación segura, el restablecimiento de contraseñas y la gestión de roles.

5. Actualización del Frontend:
   
Adaptamos el frontend para interactuar con los nuevos servicios en lugar de comunicarse directamente con el backend monolítico.
Modificamos las llamadas de API y la lógica de presentación para trabajar con las nuevas interfaces de servicios.

6. Pruebas de Integración:
   
Realizamos pruebas exhaustivas para garantizar que los servicios funcionen correctamente y se comuniquen de manera efectiva con el frontend.
Verificamos la interoperabilidad, la seguridad y la escalabilidad de la nueva arquitectura.

7. Despliegue y Monitoreo:

Implementamos la nueva arquitectura en un entorno de producción y monitoreamos su rendimiento y estabilidad.
Realizamos ajustes y optimizaciones según sea necesario para mejorar la experiencia del usuario y la eficiencia del sistema.



## Diagrama de Arquitectura.

![javascript-logo](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/sugerencia%20horaria/diagra1.png)



## Descripción de los microservicios.

1.	addHours: Este microservicio se enfoca en la única función de agregar horas al horario de atención actual para un día en específico. Esta recibe un request que contiene la fecha en que se quiere extender el horario y la hora que se desea agregar de más.
2.	addRes: Este microservicio se enfoca en la única función de agregar una reserva por parte de un cliente al especificar los datos requeridos, los cuales incluyen fecha, hora y el local en que se hace la reservación entre otras.
3.	analyze: Este microservicio se enfoca en la única función de analizar el sentimiento presente en el texto de retroalimentación de la aplicación que envía cada usuario, y devuelve un texto con la respuesta de acuerdo con el sentimiento detectado.
4.	apiGateway: Este microservicio se enfoca en la única función de redireccionar las peticiones provenientes del frontend a cada uno de los microservicios según corresponda, utilizando el método (PUT, GET, POST, etc.) correspondiente.
5.	delRes: Este microservicio se enfoca en la única función de eliminar una reservación. Esta utiliza solamente el id de la reservación correspondiente y en la base de datos se busca y elimina el objeto.
6.	getAllRes: Este microservicio es utilizado por el usuario administrador para obtener una lista de todas las reservaciones realizadas por los demás usuarios con toda su información correspondiente.
7.	getHours: Este microservicio se enfoca en la única función de obtener las horas definidas como el horario de atención del restaurante.
8.	getLocal: Este microservicio se enfoca en la única función de obtener desde la base de datos la lista de los 3 locales disponibles para poder realizar una reservación.
9.	getMesas: Este microservicio se enfoca en la única función de obtener desde la base de datos la lista de mesas disponibles con las que se cuenta, de forma que el cliente pueda elegir una mesa y reservar su espacio.
10.	getPlato: Este microservicio se enfoca en la única función de buscar en la base de datos y devolver la lista de productos que ofrece el restaurante.
11.	getRecommendation: Este microservicio se enfoca en la única función de dar una recomendación dada una combinación de una o dos entradas, se procesa y se devuelve la recomendación con plato principal, bebida y postre.
12.	getResCliente: Este microservicio se enfoca en la única función de obtener desde la base de datos todas las reservaciones realizadas por un único cliente. Esta es utilizada por el usuario cliente para poder visualizar y administrar sus propias reservaciones.
13.	sugHora: Este microservicio se enfoca en la única función de sugerir una hora o en su defecto un día de la semana para visitar cualquier restaurante de acuerdo con la entrada del usuario. En caso de que el usuario indique una fecha, este retorna una lista de horas disponibles para la visita al restaurante. Por otro lado, si el usuario define que quiere visitar algún restaurante durante la semana o el fin de semana, se le recomienda un día de la semana de acuerdo con su opetición.
14.	updateRes: Este microservicio se enfoca en la única función de actualizar las reservaciones realizadas. En caso de que el usuario se un administrador, este puede editar cualquier reservación vigente; en caso de que se trate de un cliente, este solo puede actualizar las reservaciones a su nombre.
15.	Frontend Cloud Function: Sirve como la capa de presentación de la aplicación, proporcionando una interfaz de usuario interactiva que los clientes pueden utilizar para interactuar con el sistema. Esta interfaz incluye formularios para enviar feedback, opciones para solicitar recomendaciones de menú, seleccionar fechas y horas para reservaciones, y visualizar recomendaciones realizadas por el sistema. Interactúa con todos los microservicios para enviar y recibir datos. Cuando un usuario realiza una acción, como enviar feedback o solicitar una recomendación de reserva, esta información se pasa al microservicio correspondiente, que a su vez interactúa con las funciones específicas necesarias para procesar la solicitud. Una vez que el servicio recibe la respuesta de estas funciones, la envía de vuelta al Frontend, que luego presenta los resultados al usuario.

_Entrada:_ Acciones del usuario dentro de la interfaz de usuario, como hacer clic en botones, enviar formularios, y solicitudes de información.

_Salida esperada:_ textos con las recomendaciones realizadas por el sistema para peticiones como lo son formularios de feedback, recomendaciones de menú personalizadas, y opciones de reserva.


16.	auth-service: Auth Service se encarga de la gestión de usuarios, incluyendo el registro, inicio de sesión, y recuperación de contraseñas. Endpoints:
POST /api/auth/register: Registra un nuevo usuario.
POST /api/auth/login: Inicia sesión de un usuario.
POST /api/auth/forgot-password: Envía un correo electrónico para restablecer la contraseña.
PUT /api/auth/reset-password/:token: Restablece la contraseña utilizando un token.
Controladores:
register: Crea un nuevo usuario con una contraseña encriptada.
login: Autentica al usuario y retorna un JWT.
forgotPassword: Genera un token de restablecimiento de contraseña y envía un correo electrónico.
resetPassword: Restablece la contraseña utilizando el token.
Proceso de Recuperación de Contraseña:
El usuario envía una solicitud a POST /api/auth/forgot-password con su correo electrónico.
Se genera un token y se almacena en la base de datos con una fecha de expiración.
Se envía un correo electrónico al usuario con un enlace para restablecer la contraseña.
El usuario hace clic en el enlace y envía una solicitud a POST /api/auth/reset-password/:token con la nueva contraseña.
El token se verifica y, si es válido, la contraseña se actualiza en la base de datos.

## Proceso de Diseño de la Aplicación "MY microRESTaurant"  en microservicio
el proceso de diseño y desarrollo del sistema basado en microservicios para el sitio web del restaurante, conocido como "MY microRESTaurant". El objetivo principal es transformar la arquitectura existente del proyecto a una puramente orientada a microservicios, garantizando funcionalidad, seguridad, y un despliegue eficiente en un entorno local utilizando Minikube.
Objetivos 
Mejorar la funcionalidad y usabilidad de la aplicación.
Aplicar principios de arquitectura orientada a microservicios.
Implementar una arquitectura puramente orientada a microservicios.
Descripción del Sistema
El sistema permitirá a los usuarios realizar reservaciones en diferentes localidades del restaurante, pedir recomendaciones del menú, y a los administradores gestionar dichas reservaciones. Se implementarán varios modelos de seguridad para asegurar la integridad, confidencialidad, y disponibilidad de la información.

### Funcionalidades del sitio web
Pedir Recomendaciones del Menú
Los usuarios podrán solicitar recomendaciones del menú.
Hacer Reservaciones
Los usuarios podrán hacer y editar reservaciones en cualquiera de las tres localidades del restaurante.
Administrar Reservaciones
Los administradores podrán gestionar las reservaciones, incluyendo la creación, actualización y cancelación de las mismas.

### Arquitectura del Sistema
El sistema se basará en una arquitectura de microservicios, donde cada servicio tendrá una responsabilidad específica. Los componentes principales serán:
Servicio de Gestión de Reservaciones
Crear, actualizar y eliminar reservaciones.
Servicio de Administración de Localidades
Gestionar las diferentes localidades del restaurante.
Servicio de Manejo de Menús
Proveer recomendaciones de menús.
Servicio de Notificaciones
Enviar notificaciones a los usuarios sobre sus reservaciones.


#### Modelos de Seguridad:
Para garantizar la seguridad del sistema, se implementarán los siguientes modelos:
Cifrado y Seguridad de Datos
Funciones Hash (e.g., SHA-256): Para asegurar que los datos no han sido alterados.
Documentación de los modelos de 
## Plan de Trabajo
### Fase de Análisis y Diseño
- Recolección de requisitos.
- Diseño de la arquitectura del sistema.
- seguridad.
### Fase de Implementación
- Desarrollo de los microservicios.
- Implementación de los modelos de seguridad.
### Fase de Pruebas
- Pruebas de seguridad.
### Fase de Despliegue
- Configuración y despliegue en Minikube.
- Verificación de la funcionalidad y seguridad en el entorno desplegado.


## Seguridad

1. Seguridad

En cuanto a las consideraciones de seguridad, hemos implementado un microservicio de autenticación utilizando JWT (JSON Web Tokens). Este microservicio garantiza que solo los usuarios autenticados puedan acceder a las funcionalidades protegidas de la aplicación. Los datos utilizados son transferidos por medio de métodos HTTP para todos los microservicios, y las bases de datos utilizadas se encuentran en mongo y archivos json para cada uno de los microservicios que lo requieren (recomendación de comida y reserva etc), lo que asegura su fiabilidad y consistencia.


## Gestión de errores.

Para esta arquitectura, los errores se basan en "bad requests" y pueden ser generadas por una mala inserción de los datos requeridos en cada uno de los campos por parte del usuario. Estos errores no hacen que el sistema se caiga o deje de funcionar, ya que cuando se detecta alguna inconsistencia en los requests se devuelve un mensaje que le indica al usuario lo que ha pasado con su petición o con las diferentes acciones realizadas.


## Estrategias de despliegue

En este caso, se utilizó la estrategia de desarrollo local, lo cual permitió que se desarrollara y probara cada una de las funciones del proyecto utilizando un repositorio de GitHub para el control de versiones del código y el desarrollo incremental.




## Pruebas y Validación: 

### Frontend

Se prueba que las respuestas de los servicios sean consistentes con respecto a las peticiones realizadas por el usuario.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/front.jpg)


### Análisis de sentimiento

Se prueba que dada una retroalimentación en texto, se devuelva el resultado del analisis correspondiente con su respectiva respuesta por poarte de la función.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/chatbot.jpg)

### Recomendación de comida

Se prueba que dada una petición de recomendación, se devuelva una respuesta coherente con respecto al menú utilizado.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/food.jpg)


## Bibliografia

Angular. (s/f). Angular.Io. Recuperado el 11 de abril de 2024, de https://angular.io/guide/testing-code-coverage

Angular material. (s/f). Angular Material. Recuperado el 11 de abril de 2024, de https://material.angular.io/components/datepicker/overview

Biston, S. (2023, noviembre 8). Resolve CORS errors once and for all: Three methods. Medium. https://medium.com/@stephen.biston/resolve-cors-errors-once-and-for-all-three-methods-d821c258d025

CORS error on deployed React app, but not on local development or production built app. (2021a, febrero 14). The freeCodeCamp Forum. https://forum.freecodecamp.org/t/cors-error-on-deployed-react-app-but-not-on-local-development-or-production-built-app/446251/7

CORS error on deployed React app, but not on local development or production built app. (2021b, febrero 14). The freeCodeCamp Forum. https://forum.freecodecamp.org/t/cors-error-on-deployed-react-app-but-not-on-local-development-or-production-built-app/446251/2

Das, P. (2022, diciembre 12). Angular logging HTTP requests & HTTP errors - piyali Das. Medium. https://medium.com/@piyalidas.it/angular-logging-http-requests-http-errors-fc8b9123204c

Elias, D. (2023, julio 7). Building your first Angular app and deploying to Google Cloud App Engine. Medium. https://eliasdouglas.medium.com/building-your-first-angular-app-and-deploying-to-google-cloud-app-engine-657671b5c584

Errigo, G. (2023, enero 27). Angular 15: what happened to environment.ts. DEV Community. https://dev.to/this-is-angular/angular-15-what-happened-to-environmentts-koh

Korneeva, M. (2022, mayo 5). How to proxy HTTP requests in Angular. Ngconf. https://medium.com/ngconf/how-to-proxy-http-requests-in-angular-f873183880a4

Mastering API requests the right way in angular. (2023, septiembre 8). DEV Community. https://dev.to/chintanonweb/mastering-api-requests-the-right-way-in-angular-247o

TekTutorialsHub. (2019, noviembre 17). Angular Environment Variables. TekTutorialsHub. https://www.tektutorialshub.com/angular/angular-environment-variables/

Vázquez, J. R. (2019, mayo 12). Configurar proxy en Angular CLI - comunidad JavaScript - medium. Comunidad JavaScript. https://medium.com/javascript-comunidad/configurar-proxy-en-angular-cli-25f07237d13e

Victor, N. L. (2022, septiembre 6). Angular basics: Using environmental variables to organize build configurations. Telerik Blogs. https://www.telerik.com/blogs/angular-basics-using-environmental-variables-organize-build-configurations

Vijay, S. (2022, noviembre 29). Building an Angular Application in various environments using angular-CLI and server. YavarTechWorks. https://medium.com/yavar/building-an-angular-application-in-various-environments-using-angular-cli-and-server-18f94067154b
