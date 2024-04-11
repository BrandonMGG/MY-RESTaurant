# Bienvenidos a la documentación de la aplicacion web My-RESTaurant!

Esta página alberga el diseño e implementación del proyecto.

## Visión general de la arquitectura.

La arquitectura del sistema se basa en una infraestructura en la nube proporcionada por Google Cloud Platform (GCP), donde cada componente se despliega como una función independiente de Google Cloud Functions. Este enfoque permite una escalabilidad eficiente y una gestión simplificada de recursos.

### Estructura de la arquitectura (Cloud Functions:):

1.	Analyze-sentiment: Esta función recibe y procesa el feedback de los clientes utilizando Google Natural Language API para analizar sentimientos por parte del usuario y dar una respuesta acorde a este.
2.	Sugerencia-hora: Encargada de recomendar fechas y horas de visita, utilizando datos de reservaciones almacenados en un archivo JSON. Esta función optimiza la disponibilidad y distribución de las reservas.
3.	Food-recommendation: Ofrece recomendaciones de combinaciones de comidas a partir de un menú predefinido. Proporciona un plato principal, una bebida y un postre basados en preferencias del cliente.
4.	Backend: Actúa como el núcleo de la arquitectura, interactuando con las funciones anteriores para gestionar peticiones del frontend y coordinar las respuestas.
5.	Frontend: Esta función, desplegada como parte de la arquitectura serverless, sirve como interfaz de usuario para los clientes. Proporciona una experiencia fluida e interactiva, interactuando con el backend para realizar solicitudes y mostrar resultados.

### Naturaleza orientada a servicios:
La arquitectura sigue un enfoque orientado a servicios, donde cada función cumple un propósito específico y se comunica de manera independiente con otras funciones a través de solicitudes HTTP o eventos. Esta modularidad y separación de responsabilidades garantizan una mayor flexibilidad, mantenibilidad y escalabilidad del sistema.

Cada función se diseñó para ser independiente y reutilizable, lo que facilita su mantenimiento y actualización. 
Los servicios se comunican a través de interfaces bien definidas, lo que permite la sustitución o actualización de componentes sin afectar al resto del sistema.
La separación de funciones permite escalar vertical u horizontalmente según la demanda específica de cada servicio, optimizando los recursos y el rendimiento del sistema de manera eficiente.


## Diagrama de Arquitectura.


## Descripción de las Cloud Functions.

1.	Analyze-sentiment:

_Función:_ Esta Cloud Function recibe el feedback de los clientes, realiza un análisis de sentimientos y envía una respuesta acorde utilizando Google Natural Language API.

_Entrada:_ El feedback del cliente en formato de texto.

_Salida esperada:_ Las coordenadas del feedback analizado y un texto predefinido según el sentimiento detectado en el feed back y un emoji acorde a ese sentimiento.

_Relación con otras funciones:_ La salida de esta función es utilizada por el Backend para informar al usuario sobre lo que se entiende del feedback proporcionado por el usuario.

2.	Recomendacion-hora:

_Función:_ Esta Cloud Function recomienda fechas y horas de visita basadas en datos de reservaciones almacenados en un archivo JSON.

_Entrada:_ Datos de reservaciones del restaurante en formato JSON como una fecha para visitar el restaurante y/o una petición de recomendación para visitarlo.

_Salida esperada:_ Una recomendación de fecha y hora óptimas para la visita del cliente.

_Relación con otras funciones:_ La salida de esta función se envía al Backend para ser mostrada al cliente a través del Frontend Cloud Function. Además, puede ser utilizada por el Backend Service para gestionar las reservaciones y optimizar la capacidad del restaurante.

3.	Food-recommendation:
   
_Función:_ Esta Cloud Function ofrece recomendaciones de combinaciones de comidas a partir de un menú predefinido.

_Entrada:_ Preferencias del cliente ya sea el plato principal, una bebida o un postre.

_Salida esperada:_ Una recomendación que incluye un plato principal, una bebida y un postre.

_Relación con otras funciones:_ La salida de esta función es utilizada por el Backend para personalizar la experiencia del cliente y ofrecer sugerencias al/a los platillos que se quieran consumir. También es mostrada directamente al cliente a través del Frontend Cloud Function.

4.	Backend:

_Función:_ Esta Cloud Function actúa como el núcleo de la arquitectura, gestionando las solicitudes del frontend y coordinando las respuestas de las otras funciones.

_Entrada:_ Solicitudes del frontend, como solicitudes de recomendaciones, feedback del cliente, etc.

_Salida esperada:_ Respuestas a las solicitudes del frontend, que pueden incluir recomendaciones de menú, fechas de visita recomendadas, respuestas a feedback.

_Relación con otras funciones:_ Esta función orquesta la interacción entre las otras Cloud Functions, tomando las entradas del frontend y coordinando las solicitudes y respuestas entre las diferentes funciones. Permite una comunicación fluida y coherente con el resto del sistema.

5. Frontend Cloud Function:

_Función:_ Sirve como la capa de presentación de la aplicación, proporcionando una interfaz de usuario interactiva que los clientes pueden utilizar para interactuar con el sistema. Esta interfaz incluye formularios para enviar feedback, opciones para solicitar recomendaciones de menú, seleccionar fechas y horas para reservaciones, y visualizar recomendaciones realizadas por el sistema.

_Entrada:_ Acciones del usuario dentro de la interfaz de usuario, como hacer clic en botones, enviar formularios, y solicitudes de información.

_Salida esperada:_ textos con las recomendaciones realizadas por el sistema para peticiones como lo son formularios de feedback, recomendaciones de menú personalizadas, y opciones de reserva.

_Relación con otras funciones:_ La Frontend Cloud Function interactúa directamente con el Backend para enviar y recibir datos. Cuando un usuario realiza una acción, como enviar feedback o solicitar una recomendación de reserva, esta información se pasa al Backend, que a su vez interactúa con las funciones específicas necesarias para procesar la solicitud. Una vez que el Backend recibe la respuesta de estas funciones, la envía de vuelta a la Frontend Cloud Function, que luego presenta los resultados al usuario.

