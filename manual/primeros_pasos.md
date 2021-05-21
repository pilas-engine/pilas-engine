---
title: Primeros pasos
---

En esta sección me gustaría describir los pasos iniciales para comenzar a hacer juegos.

Pilas ha sido diseñada especialmente para que todas las personas puedan aprender a programar realizando videojuegos, de forma sencilla y totalmente en español.

Esta es la pantalla inicial que aparecerá cuando abras pilas por primera vez:

![portada](imagenes/primeros-pasos/portada.png)

Desde aquí se pueden acceder a todas las secciones de pilas, te recomendamos inspeccionarlas al menos una vez para familiarizarte con el entorno.

Ahora bien, la parte más interesante de la herramienta se puede acceder pulsando el botón que dice "**Abrir el editor**"

Desde esta sección, vas a ver una escena principal y varios paneles:

![editor-1](imagenes/primeros-pasos/editor-1.png)

Al principio puede parecer un poco abrumador… pero vamos a ir paso a paso. Hay dos partes importantes en esta pantalla:

- A la izquierda está el panel de actores y propiedades. Donde vamos a ver listados todos los actores que aparecen en la pantalla. Los actores en este caso son: una plataforma, una pelota, una caja, un techo y suelo.

- Luego a la derecha de la pantalla tenemos el area del editor:

  ![editor-partes](imagenes/primeros-pasos/editor-partes.png)

Hay otras cosas importantes en la interface, pero vamos a prestarle mayor atención a estas dos partes.

Sigamos:

## ¡Pongamos el juego en funcionamiento!

El botón que aparece arriba del area de juego es muy importante, porque nos permite poner en funcionamiento el juego y hacer una prueba real.

Así que hagamos el intento, pulsa el botón ejecutar una vez:

![boton-ejecutar](imagenes/primeros-pasos/boton-ejecutar.png)

Deberías ver cómo dos de los actores comienzan a rebotar en la plataforma:

![primer-ejecucion](imagenes/primeros-pasos/primer-ejecucion.gif)

Cuando pulsas el botón "ejecutar" además de ponerse en funcionamiento el juego sucede algo más: el editor por completo ingresará en un modo llamado "ejecución", así que no vamos a poder editar el código o cambiar la escena. Todo lo que suceda en ese momento es parte de la experiencia de usuario de nuestros juegos. Una vez que exportemos el juego, nuestros usuarios solo van a ver el juego, no el editor.

Esto es importante porque nos lleva a pensar en el diseño del juego y hacernos preguntas interesantes: ¿Qué queremos que el usuario haga dentro de nuestro juego?, ¿qué elementos le vamos a mostrar?, ¿cuándo gana y cuando pierde?.

Pero claro, por el momento solo podemos hacernos las preguntas, porque lo que tenemos en el editor es muy poquito, el usuario no puede hacer nada muy interesante aún… solo ver cómo rebotan esos dos objetos en la plataforma :|

## Diseñando nuestro primer juego

Para nuestro primer juego vamos a pensar en algo más interesante, queremos que el fondo del juego sea un cielo lleno de estrellas, que el usuario pueda mover una nave con el teclado y que luego de unos segundos comiencen a aparecer algunos enemigos.

Pulsá el botón que dice "detener" en el editor (o pulsá la tecla `Esc`), tendrías que volver a ver el resto de los elementos del editor nuevamente habilitados.

![editor-1](imagenes/primeros-pasos/editor-1.png)Borremos cada uno de los actores que aparecen en la pantalla, selecciona al actor pelota y luego pulsa el botón del cesto de basura tal y como muestra esta imagen:

![borrar](imagenes/primeros-pasos/borrar.png)

Repetí esos pasos hasta que la escena quede limpia, sin ningún actor:

![image-20200601230444058](imagenes/primeros-pasos/sin-actores.png)

Ahora bien, con la escena completamente limpia, agreguemos un actor para representar a nuestro protagonista:

Pulsa el botón "Crear actor" y luego selecciona la nave:

![crear-actor-1](imagenes/primeros-pasos/crear-actor-1.png)

![crear-actor-2](imagenes/primeros-pasos/crear-actor-2.png)

Una vez que selecciones el actor vas a verlo formar parte de la escena así:

![creacion-de-la-nave](imagenes/primeros-pasos/creacion-de-la-nave.png)

Ahora pulsemos de nuevo el botón "ejecutar" y pulsa las flechitas del teclado para mover la nave por el escenario (¡y con la barra espaciadora vas a poder disparar!):

![nave](imagenes/primeros-pasos/nave-en-movimiento.gif)

## Ambientando la escena en el espacio

Al principio te mencioné que queríamos hacer que la nave pareciera estar en el espacio, sin embargo aún tenemos ese fondo azul que no se parece mucho al espacio...

Así que hagamos un cambio, selecciona la escena del panel izquierdo, vas a ver que la parte inferior del panel va a cambiar:

![panel-de-escena](imagenes/primeros-pasos/panel-de-escena.png)

Esa sección que marcamos con el número "2" en la imagen contiene todas las propiedades de la escena. Si moves la barra de desplazamiento hacia abajo vas a ver una propiedad llamada fondo:

![propiedad-fondo](imagenes/primeros-pasos/propiedad-fondo.png)

Hace click sobre esa propiedad, donde está el ícono y vas a ver que pilas te propone varias imágenes para sustituir el fondo:

![cambiar-fondo-1](imagenes/primeros-pasos/cambiar-fondo-1.png)

Selecciona la del espacio:

![fondo-espacio](imagenes/primeros-pasos/fondo-espacio.png)

Vas a notar que el fondo de la pantalla va a cambiar por completo:

![fondo-espacial-en-la-escena](imagenes/primeros-pasos/fondo-espacial-en-la-escena.png)

## Creando más actores

Ahora vamos a darle un poco mas de vida al juego: Nuestra nave está en el espacio pero no parece haber un motivo por el cual está ahí, pensemos una historia:

"A causa de un experimento que se salió de control en la tierra, algunos objetos llegaron al espacio: bananas, manzanas y otras frutas comenzaron a ensuciar el espacio flotando por ahí. Nuestra misión es comandar una nave que tiene como objetivo "limpiar" el desorden de la basura espacial lo antes posible !!!"

Bueno, no es una gran idea... pero es algo, algo que podemos construir, jugar y divertidos. ¡así que vamos a intentarlo!

Pulsá el botón "Crear actor" nuevamente:

![crear-actor](imagenes/primeros-pasos/crear-actor.png)

Pero a diferencia de antes, que elegimos la nave, ahora elegí el actor que no tiene una imagen asignada:

![actor-sin-imagen](imagenes/primeros-pasos/actor-sin-imagen.png)

Luego, puedes mover este actor usando el mouse, así no tapa a la nave:

![mover-actor](imagenes/primeros-pasos/mover-actor.png)

Ahora cambiemos la apariencia del actor. Este paso es muy similar al que hicimos antes, tendrías que seleccionar al actor, ir al panel de propiedades pero ahora pulsar la propiedad "imagen":

![cambiando-imagen](imagenes/primeros-pasos/cambiando-imagen.png)

y luego, selecciona alguna de las opciones. Por ejemplo una manzana:

![manzana](imagenes/primeros-pasos/manzana.png)

y te debería quedar así:

![manzana-en-el-espacio](imagenes/primeros-pasos/manzana-en-el-espacio.png)

## Agregando colisiones

Vamos a hacer que la manzana se pueda destruir con los disparos de la nave.

Para eso tenemos que volver a seleccionar el actor con apariencia de manzana y asignarle una figura física así:

![propiedades-de-manzana](imagenes/primeros-pasos/propiedades-de-manzana.png)

Estos parámetros admiten muchas combinaciones, pero te recomiendo que la figura sea "círculo", el radio de "32" y desactives la opción "Dinámica".

Vas a notar que en la pantalla aparecerá un círculo azul al rededor del actor nuevo. Esto significa que el actor tiene un area de contacto para poder interactuar con el resto de los actores:

![image-20200601235938682](imagenes/primeros-pasos/area-de-colision.png)

## Reaccionando a las colisiones

Para hacer que el actor manzana reaccione tenemos que escribir un poquito de código.

Selecciona nuevamente al actor y pulsa la pestaña que aparece en la parte derecha de la pantalla que tiene el texto "Código":

![solapa-codigo](imagenes/primeros-pasos/solapa-codigo.png)

Cuando pulses esa pestaña, vas a ver que se abre un panel nuevo; un panel en donde tenemos código y un botón que dice "Recetas":

![codigo-primera-vista](imagenes/primeros-pasos/codigo-primera-vista.png)

El código es una de las cosas más importantes que incluye pilas, ya que el código nos permite darle órdenes a la computadora para que haga cosas, como eliminar actores, reaccionar al movimiento del mouse, emitir sonidos y todo lo que se te ocurra.

Sin embargo para empezar vamos a tomar un atajo, vamos a pedirle a pilas que nos ayude a escribir el código para que la manzana se pueda eliminar fácilmente.

Pulsa el botón que dice "Recetas":

![receta-1](imagenes/primeros-pasos/receta-1.png)

y luego selecciona la opción que dice "Cuando colisiona explotar":

![receta-2](imagenes/primeros-pasos/receta-2.png)

Cuando hagas eso, vas a notar que pilas escribió por nosotros una porción de código que hace algunas cosas por nosotros:

![codigo-de-la-receta](imagenes/primeros-pasos/codigo-de-la-receta.png)

Mas adelante en el manual vamos a escribir algo de código sin usar recetas, desde cero y comprendiendo cada función y expresión, por ahora lo dejaremos ahí.

Ahora pulsa "Ejecutar" y corrobora cómo los disparos pueden limpiar el espacio de frutas:

![explosion](imagenes/primeros-pasos/explosion.gif)

## Es solo el principio

Pilas es una herramienta super completa, y este mini-tutorial es solo el comienzo de una gran aventura. Seguí leyendo este manual para conocer muchas más cosas que incluye pilas o explora nuestro sitio web, vas a encontrar tutoriales, videos, juegos y muchas cosas más.

¡Te damos la bienvenida a el mundo de la programación!
