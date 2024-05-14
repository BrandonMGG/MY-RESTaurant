# Bienvenidos a la documentación de la aplicacion web My-RESTaurant-2!

Esta página contiene la documentación general del proyecto.

## Visión general de la arquitectura.

La arquitectura propuesta es una arquitectura orientada a servicios (SOA) para una aplicación de menú interactivo y gestión de reservas para un restaurante. La aplicación consta de varios servicios interconectados que se comunican mediante la separación de responsabilidades. La arquitectura está diseñada para ser modular, flexible y escalable, permitiendo la incorporación de nuevos servicios y la expansión de funcionalidades de manera eficiente.

### Estructura de la arquitectura (Cloud Functions:):
La estructura de la arquitectura se basa en los siguientes componentes principales:

1.	Servicios existentes: La aplicación ya cuenta con servicios para la gestión de menús, recomendaciones de comida y reservas.
2.	Nuevos servicios: Se agregarán dos nuevos servicios: un servicio de autenticación y un sistema de reservas.
3.	Separación de responsabilidades:  Todos los servicios se comunican mediante la separación de responsabilidades, lo que significa que cada servicio es responsable de una función específica y se comunica con otros servicios de manera directa según sea necesario.
4.	Capa de presentación:  Interactúa con los usuarios a través de interfaces de usuario para la gestión de reservas, visualización de menús y recomendaciones, y operaciones de autenticación.
5.	Capa de lógica de negocio: Contiene la lógica de negocio de la aplicación, incluyendo la gestión de reservas, autenticación de usuarios, recomendaciones de comida, etc.
6.	Capa de datos: Almacena y gestiona la información necesaria para el funcionamiento de la aplicación, como datos de usuarios, menús, reservas, etc.

### Naturaleza orientada a servicios:
La arquitectura se orienta a servicios al separar las funcionalidades de la aplicación en servicios independientes y reutilizables. Cada servicio cumple una función específica y se comunica directamente con otros servicios según sea necesario. Esto facilita la modularidad, la flexibilidad y la interoperabilidad de la aplicación, permitiendo la incorporación de nuevos servicios y la evolución de la aplicación de manera gradual y eficiente.

Cada función se diseñó para ser independiente y reutilizable, lo que facilita su mantenimiento y actualización. 
Los servicios se comunican a través de interfaces bien definidas, lo que permite la sustitución o actualización de componentes sin afectar al resto del sistema.
La separación de funciones permite escalar vertical u horizontalmente según la demanda específica de cada servicio, optimizando los recursos y el rendimiento del sistema de manera eficiente.


## Diagrama de Arquitectura.

![javascript-logo](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/sugerencia%20horaria/diagrama.png)



## Descripción de las Cloud Functions.

1.	Analyze-sentiment:

_Función:_ Esta Cloud Function recibe el feedback de los clientes, realiza un análisis de sentimientos y envía una respuesta acorde utilizando Google Natural Language API.

_Entrada:_ El feedback del cliente en formato de texto.

_Salida esperada:_ Las coordenadas del feedback analizado y un texto predefinido según el sentimiento detectado en el feed back y un emoji acorde a ese sentimiento.

_Relación con otras funciones:_ La salida de esta función es utilizada por el Backend para informar al usuario sobre lo que se entiende del feedback proporcionado por el usuario.

2.	Food-recommendation:
   
_Función:_ Esta Cloud Function ofrece recomendaciones de combinaciones de comidas a partir de un menú predefinido.

_Entrada:_ Preferencias del cliente ya sea el plato principal, una bebida o un postre.

_Salida esperada:_ Una recomendación que incluye un plato principal, una bebida y un postre.

_Relación con otras funciones:_ La salida de esta función es utilizada por el Backend para personalizar la experiencia del cliente y ofrecer sugerencias al/a los platillos que se quieran consumir. También es mostrada directamente al cliente a través del Frontend Cloud Function.

3.	Servicio de Autenticacion:

__Capacidad de registro de nuevos usuarios:__ Este servicio permite a los usuarios registrarse en la aplicación proporcionando la información necesaria, como nombre, correo electrónico, contraseña, etc. La información de los usuarios registrados se almacena de forma segura en la base de datos.
__Autenticación segura de usuarios registrados:__ Los usuarios registrados pueden iniciar sesión en la aplicación mediante sus credenciales de acceso (correo electrónico y contraseña). El servicio de autenticación verifica las credenciales proporcionadas para garantizar la identidad del usuario y otorgar acceso a las funciones autorizadas.
__Restablecimiento de contraseña para usuarios olvidadizos:__ En caso de que un usuario olvide su contraseña, este servicio proporciona un mecanismo seguro para restablecerla. Puede implicar enviar un enlace de restablecimiento de contraseña al correo electrónico del usuario o responder a preguntas de seguridad previamente establecidas.
__Gestión de roles de usuario para diferentes niveles de acceso:__ El servicio de autenticación administra los roles de usuario, lo que significa que puede asignar diferentes niveles de acceso y permisos a los usuarios según su rol en la aplicación. Por ejemplo, puede haber roles de cliente, administrador del restaurante, personal de cocina, etc., cada uno con sus propias capacidades y restricciones.

_Relación con otras funciones:_ Esta función orquesta la interacción entre las otras Cloud Functions, tomando las entradas del frontend y coordinando las solicitudes y respuestas entre las diferentes funciones. Permite una comunicación fluida y coherente con el resto del sistema.

5. Frontend Cloud Function:

_Función:_ Sirve como la capa de presentación de la aplicación, proporcionando una interfaz de usuario interactiva que los clientes pueden utilizar para interactuar con el sistema. Esta interfaz incluye formularios para enviar feedback, opciones para solicitar recomendaciones de menú, seleccionar fechas y horas para reservaciones, y visualizar recomendaciones realizadas por el sistema.

_Entrada:_ Acciones del usuario dentro de la interfaz de usuario, como hacer clic en botones, enviar formularios, y solicitudes de información.

_Salida esperada:_ textos con las recomendaciones realizadas por el sistema para peticiones como lo son formularios de feedback, recomendaciones de menú personalizadas, y opciones de reserva.

_Relación con otras funciones:_ La Frontend Cloud Function interactúa directamente con el Backend para enviar y recibir datos. Cuando un usuario realiza una acción, como enviar feedback o solicitar una recomendación de reserva, esta información se pasa al Backend, que a su vez interactúa con las funciones específicas necesarias para procesar la solicitud. Una vez que el Backend recibe la respuesta de estas funciones, la envía de vuelta a la Frontend Cloud Function, que luego presenta los resultados al usuario.

## Seguridad y escalabilidad.

1. Seguridad

En cuanto a las consideraciones de seguridad, los datos utilizados son transferidos por medio de metodos HTTP (en este caso específico GET) para todas las Cloud Funcions, y las bases de datos utilizadas se ubican en cada una de las Cloud Functions que lo requieren(recomendacion de comida y recomendacion de hora para posibles reservaciones), lo que asegura su fiabilidad y consistencia.

2. Escalabilidad

En cuanto a la escalabilidad de las funciones realizadas, las consideraciones aplican a nivel general dado que se trata de funciones independientes del sistema. Estas consideraciones incluyen:

Almacenamiento de Datos: Es posible utilizar servicios como Cloud Firestore o Cloud Bigtable, que escalan automáticamente para manejar grandes volúmenes de datos y picos de tráfico sin degradación del rendimiento.

Balanceo de Carga: La arquitectura actual del sistema hace posiblemplementar el balanceo de carga HTTP(S) de Google Cloud de manera que se pueda distribuir de manera eficiente las solicitudes entrantes entre las instancias de Cloud Functions, mejorando el rendimiento y la disponibilidad.

Diseño sin servidor: Esto nos permitió facilitar la escalabilidad individual de las funciones sin afectar otras partes del sistema, de forma que cada componente sea escalado de manera independiente según sea necesario, optimizando los recursos y reduciendo costos.

## Gestión de errores.

Para esta arquitectura, los errores se basan en "bad requests" y pueden ser generadas por una mala inserción de los datos requeridos en cada uno de los campos por parte del usuario. Estos errores no hacen que el sistema se caiga o deje de funcionar, ya que cuando se detecta alguna inconsistencia en los requests se devuelve un mensaje que le indica al usuario lo que ha pasado con su petición o con las diferentes acciones realizadas.


## Estrategias de despliegue

En este caso, se utilizó la estrategia de desarrollo local, lo cual permitió que se desarrollara y probara cada una de las funciones del proyecto utilizando un repositorio de GitHub para el control de versiones del código y el desarrollo incremental. Posteriormente, una vez que se encontraran funcionando las funciones desarrolladas, se procedió a hacer deploy de las mismas en la plataforma de Google Cloud.

## Consideraciones de costos

Cuando se desarrolla una arquitectura en Google Cloud Platform (GCP), la gestión de costos es esencial y debe evaluarse cuidadosamente para asegurar que el proyecto se mantenga dentro del presupuesto. Aquí hay un análisis detallado de los costos asociados con la arquitectura realizada, utilizando los servicios de Google Cloud Functions y Google Natural Language API.

1. Google Cloud Functions

Costos:

_Invocaciones:_ Google Cloud Functions cobra por el número de invocaciones. Cada invocación cuesta $0.0000004.
_Tiempo de Ejecución y Recursos:_ El costo también depende del tiempo de ejecución y la memoria asignada a cada función. Por ejemplo, $0.0000025 por GB-segundo y $0.00001 por GHz-segundo.

Análisis:

Si cada una de las funciones se invoca 1000 veces al día, esto conduce a unas 4,000 invocaciones diarias. Estimar los recursos de computación por función puede variar, pero suponiendo un uso moderado, podemos calcular un costo aproximado no tan elevado.

2. Google Natural Language API

_Costos:_ Se cobra por cada 1000 caracteres de texto procesado. El costo puede variar dependiendo del modelo utilizado, pero generalmente está alrededor de $1.00 por 1000 caracteres para el análisis de sentimientos.

Análisis:
Si el análisis de feedback se realiza en textos cortos (aproximadamente 500 caracteres en promedio) 500 veces al día, el costo será una consideración relevante.

_Estrategias de Optimización de Costos:_

1.	Monitorización y Alertas: Utilizar Google Cloud Monitoring para rastrear el uso y costos, configurando alertas para evitar gastos inesperados.
2.	Ajuste de Recursos: Optimizar la configuración de memoria y CPU de las Cloud Functions basándose en las métricas de uso reales para no sobreprovisionar recursos.

3.	Revisión de Precios y Quotas: Revisar regularmente las opciones de precios de GCP y aplicar a las quotas y descuentos por uso extendido o compromisos a largo plazo.

4.	Caché de Datos: Implementar soluciones de caché para reducir las consultas a bases de datos y APIs externas, minimizando los costos operacionales.

## Pruebas y Validación: 

### Frontend

Se prueba que las respuestas del backend sean consistentes con respecto a las peticiones realizadas por el usuario.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/front.jpg)

### Backend

Para esta seccion se hicieron pruebas unitarias en cuanto a las llamadas de las funciones de recomendacion ed comidas, recomendacion de hora para reservación, feedback y el funcionamiento del frontend.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/backend.jpg)

### Análisis de sentimiento

Se prueba que dada una retroalimentación en texto, se devuelva el resultado del analisis correspondiente con su respectiva respuesta por poarte de la función.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/chatbot.jpg)

### Recomendación de comida

Se prueba que dada una petición de recomendación, se devuelva una respuesta coherente con respecto al menú utilizado.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/food.jpg)

### Recomendación de horario

Se prueba que dada una petición por parte del usuario para obtener una recomendación de un día y una hora para reservar o visitar el restaurante se haga de manera coherente con respecto a lo que proporciona la base de datos.

![imagen](https://github.com/BrandonMGG/MY-RESTaurant/blob/main/horario.jpg)

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
