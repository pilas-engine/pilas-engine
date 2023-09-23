---
title: Glosario de funciones
---

<script>
document.addEventListener("DOMContentLoaded", function() {
  var input = document.querySelector("#buscador");
  var limpiar = document.querySelector("#limpiar");

  var timeout = null;

  /*
   * Esta función permite lanzar una función dentro de un marco
   * de tiempo donde podría cancelarse.
   *
   * Es muy útil para lanzar búsquedas mientras el usuario va
   * escribiendo y evitando que la aplicación se vuelva super lenta.
   */
  function debounce(func, wait) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.call(this);  
      timeout = null;
    }, 200);
  }

  /*
   * Esta función se encarga de mostrar u ocultar los bloques
   * HTML del documento dependiento de si coinciden con una búsqueda
   * o no.
   *
   * Por ejemplo, el documento podría ser de esta forma:
   *
   *    <div class="funcion">
   *      ```
   *      pilas.actores.nave()
   *      ```
   *
   *      Permite crear una nave.
   *    </div>
   *
   *    <div class="funcion">
   *      ```
   *      pilas.actores.pelota()
   *      ```
   *
   *      Permite crear un actor pelota.
   *    </div>
   *
   * Pero si se llama a esta función así `filtrar("pelota")`, solamente
   * el segundo bloque debería verse en el navegador, el primer bloque
   * que no tiene el texto "pelota" debería tener la clase "dn" (display none)
   *
   *    <div class="funcion dn">          <-- Se agregá la clase "dn"
   *      ```
   *      pilas.actores.nave()
   *      ```
   *
   *      Permite crear una nave.
   *    </div>
   *
   *    <div class="funcion">
   *      ```
   *      pilas.actores.pelota()
   *      ```
   *
   *      Permite crear un actor pelota.
   *    </div>
   *
   */
  function filtrar(valor) {
    var funciones = document.querySelectorAll(".funcion");
    var cantidad_ocultos = 0;
    var cantidad_visibles = 0;

    funciones.forEach(elemento => {

      if (elemento.firstElementChild.textContent.includes(valor)) {
        elemento.classList.remove("dn");
        cantidad_visibles += 1;
      } else {
        elemento.classList.add("dn");
        cantidad_ocultos += 1;
      }

    });


    var detalle = document.getElementById("detalle");
    var total = cantidad_visibles + cantidad_ocultos;

    if (cantidad_ocultos > 0) {
      detalle.innerHTML = `Mostrando ${cantidad_visibles} de ${total}`;
    } else {
      detalle.innerHTML = "";
    }
  }

  input.onkeydown = function(e) {
    debounce(() => {
      filtrar(this.value);
    }, 500);
  }

  limpiar.onclick = function() {
    input.value = "";
    filtrar("");
  }

});
</script>

<div class="tr">
  <input id="buscador" placeholder="Buscar ..." class="input" autocomplete="off">
</div>

<div class="tr">
  <span id="detalle" class="small"></span> <button id="limpiar" class="boton v-mid">Limpiar</button>
</div>

<div class="funcion">
```
mostrar(mensaje)
```

Imprime un mensaje en la pantalla del intérprete. También muestra el tipo
de dato del argumento.

Esta función también se puede llamar usando el nombre `print` en lugar
de `mostrar`.

Ejempos:

```
❯ mostrar(2 + 2)
❮ 4                     (number)

❯ mostrar("Hola " + "hugo")
❮ Hola hugo             (string)
```

</div>


<div class="funcion">
```
ingresar(mensaje = "")
```

Bloquea el programa a la espera de que el usuario ingrese un texto.

Esta función retornará un `string` con el mensaje que escribió
el usuario o `null` si canceló el ingreso del mensaje.

Ejempos:

```
❯ ingresar("¿Cuál es tu nombre?)
❮ "pepe"                     (string)

❯ ingresar("¿Cuantos años tienes?)
❮ "14"                     (string)
```

Tener en cuenta que la función retorna cadenas de texto (tipo `string`). Si
quieres tomar la respuesta del usuario y procesarla como un número deberás
anteponer `+` delante de la función o la variable para convertirla en un
número:

```
❯ +ingresar("¿Cuantos años tienes?)
❮ 14                     (number)

❯ let edad = ingresar("¿Cuantos años tienes?)
❯ mostrar(edad)
❮ "14"                   (string)

❯ mostrar(+edad)
❮ 14                     (number)
```

</div>



<div class="funcion">
```
pilas.obtener_actores_en(x, y)
```

Busca actores en la coordenada `x` e `y`. Si existen actores en esa posición retornará
una lista con todas las referencias a esos actores. Y si ningún actor está en esa posición
entonces retorna una lista vacía `[]`.

Por ejemplo:

```
› pilas.obtener_actores_en(0, -94)
‹ [
    <plataforma en (0.00, -90.00)>,
    <pacman en (10.00, -92.00)>,
  ]

› pilas.obtener_actores_en(200, 0)
‹ []
```

</div>

<div class="funcion">
```
pilas.obtener_actor_en(x, y)
```

Busca actores en la coordenada `x` e `y` y si existe al menos uno lo retorna. Si
existen mas de un actor solo retornará el primero que encuentre.

Si no hay ningún actor retornará `null`.

Por ejemplo:

```
› pilas.obtener_actor_en(0, -94)
‹ <plataforma en (0.00, -90.00)>

› pilas.obtener_actor_en(200, 0)
‹ null
```

</div>

<div class="funcion">
```
pilas.escena
pilas.escena_actual()
```

Retorna una referencia a la escena actual, desde donde se puede
acceder a los actores y otras propiedades de la escena.

Por ejemplo:

```
› pilas.escena.actores
‹ <plataforma en (0.00, -90.00)>,<caja en (96.00, -47.55)>
```

</div>

<div class="funcion">
```
pilas.control
```

Almacena la referencia al control de teclado. Desde donde se pueden
consultar la pulsación de teclas.

Es importante llamar a esta función dentro del bloque `actualizar` de
un actor o escena.

Por ejemplo:

```
› pilas.control.izquierda
‹ false

› pilas.control.tecla_n
‹ true
```

</div>

<div class="funcion">
```
pilas.camara
```

Contiene una referencia a la cámara de la escena, desde donde se pueden
aplicar movimientos de desplazamientos o efectos.

Por ejemplo:

```
› pilas.camara.x
‹ 0

› pilas.camara.y = 30
‹ 30

› pilas.camara.vibrar(2, 1)
‹ Sin definir (undefined)
```

Incluso también se puede cambiar el zoom con sentencias como:

```
› pilas.camara.escala = 2.5
› pilas.camara.escala = 1
```

</div>

<div class="funcion">
```
pilas.listar_imagenes()
```

Retorna una lista de todas las imágenes registradas en el proyecto, incluyendo
las que vienen en pilas y las que el usuario cargó en el editor.

Por ejemplo:

```
› pilas.listar_imagenes()
‹ [
    "bloques:plataformas-marrones/plataforma-marron-1",
    "bloques:plataformas-marrones/plataforma-marron-10",
    ...
  ]
```

</div>

<div class="funcion">
```
pilas.cambiar_escena(nombre)
```

Permite cambiar a una escena nueva indicando su nombre. Si se le pide
cambiar a una escena que no existe retornará un error.

Por ejemplo:

```
› pilas.cambiar_escena("opciones")
‹ Sin definir (undefined)

› pilas.cambiar_escena("cualquiera")
‹ Error: No se puede encontrar la escena "cualquiera".
```

</div>

<div class="funcion">
```
pilas.reiniciar_escena()
```

Permite reiniciar la escena que está en ejecución. Al reiniciar la
escena se vuelven a crear todos los actores en su posición inicial
y se vuelve a ejecutar el método `iniciar` de la escena.

Por ejemplo:

```
› pilas.reiniciar_escena()
‹ Sin definir (undefined)
```

</div>

<div class="funcion">
```
pilas.reproducir_sonido(nombre)
```

Reproduce un sonido desde la biblioteca del proyecto. El parámetro
nombre tiene que ser exactamente el nombre del sonido.

Por ejemplo:

```
› pilas.reproducir_sonido("saltar")
‹ Sin definir (undefined)
```

</div>

<div class="funcion">
```
pilas.obtener_actores()
```

Retorna una lista de todos los actores que hay actualmente
en la escena.

Por ejemplo:

```
› pilas.obtener_actores()
‹ [
    <plataforma en (0.00, -90.00)>,
    <caja en (96.00, -47.55)>
  ]
```

</div>

<div class="funcion">
```
pilas.obtener_actor_por_nombre(nombre)
pilas.buscar_actor(nombre)
```

Busca en todos los actores de la escena si existe uno con el nombre solicitado, y
en caso afirmativo retorna una referencia a ese actor.

Es importante que al momento de llamar a esta función el actor esté vivo, sino
la función va a retornar un error.

Por ejemplo:

```
› pilas.obtener_actor_por_nombre("plataforma")
‹ <plataforma en (0.00, -90.00)>

› var mi_plataforma = pilas.obtener_actor_por_nombre("plataforma")
› mi_plataforma.decir("¡hola!")
```

</div>

<div class="funcion">
```
pilas.existe_un_actor_llamado(nombre)
```

Retorna `true` o `false` indicando si en la escena actual existe un
actor con el nombre solicitado. Esta función es útil para saber si se puede
llamar a `obtener_actor_por_nombre`.

Por ejemplo:

```
› pilas.existe_un_actor_llamado("plataforma")
‹ true

› pilas.existe_un_actor_llamado("jugador")
‹ false

if (pilas.existe_un_actor_llamado("jugador")) {
  actor.decir("El jugar está vivo!")
} else {
  actor.decir("Uh, el jugador no está, ¿se eliminó?")
}
```

</div>

<div class="funcion">
```
pilas.obtener_actor_por_etiqueta(etiqueta)
```

Retorna el primer actor que encuentre con la etiqueta solicitada. La
etiqueta se tiene que enviar como una cadena de texto entre comillas.

Si no se encuentra ningún actor con esa etiqueta la función va a retornar
`undefined`.

Por ejemplo:

```
› pilas.obtener_actor_por_etiqueta("enemigo")
‹ <alien en (0.00, -70.00)>

› pilas.obtener_actor_por_etiqueta("prueba")
‹ Sin definir (undefined)
```

</div>

<div class="funcion">
```
pilas.obtener_todos_los_actores_con_la_etiqueta(etiqueta)
```

Retorna una lista de todos los actores que contienen la etiqueta
enviada como parámetro.

Si no existe ningún actor con esa etiqueta esta función retornará
una lista vacía.

Por ejemplo:

```
› pilas.obtener_todos_los_actores_con_la_etiqueta("enemigo")
‹ [
    <alien en (0.00, -70.00)>,
    <fantasma en (20.00, -20.00)>
  ]

› pilas.obtener_todos_los_actores_con_la_etiqueta("moneda")
‹ []
```

</div>

<div class="funcion">
```
pilas.obtener_cantidad_de_actores()
```

Retorna el número de actores que existen en la escena actual.

Por ejemplo:

```
› pilas.obtener_cantidad_de_actores()
‹ 10
```

</div>

<div class="funcion">
```
pilas.obtener_diccionario_de_actores()
```

Retorna una estructura de datos tipo diccionario con todos los nombres
y referencias a los actores.

Por ejemplo:

```
› var diccionario = pilas.obtener_diccionario_de_actores()
› diccionario.pelota
‹ <pelota en (-200, -40)
```

</div>

<div class="funcion">
```
pilas.obtener_actores_en(x, y)
```

Retorna una lista de todos los actores que están ocupando la coordenada
`x` e `y` enviada por parámetro.

Si no existe ningún actor en esa coordenada esta función retornará una lista
vacía.

Por ejemplo:

```
› pilas.obtener_actores_en(-190, -30)
‹ [
    <pelota en (-200, -40)
  ]

› pilas.obtener_actores_en(0, 0)
‹ []
```

</div>

<div class="funcion">
```
pilas.existe_actor_en(x, y)
```

Retorna `true` si hay un actor en esa coordenada `x` e `y` enviara por parámetro.

Por ejemplo:

```
› pilas.existe_actor_en(-190, -30)
‹ true
```

</div>

<div class="funcion">
```
pilas.existe_actor_con_etiqueta_en(etiqueta, x, y)
```

Retorna `true` si un actor con la etiqueta enviara como parámetro
se encuentra en esa posición `x` e `y`.

Por ejemplo:

```
› pilas.existe_actor_con_etiqueta_en("pelota", -190, -30)
‹ true

› pilas.existe_actor_con_etiqueta_en("enemigo", -190, -30)
‹ false
```

</div>

<div class="funcion">
```
pilas.luego(duración, tarea)
```

Ejecuta una tarea o función luego de que transcurra una cantidad
de segundos determinada por el parámetro `duración`.

Es importante mencionar que la duración tiene que ser un número de
segundos, que puede ser un número entero o con parte decimal. Y la
función se puede enviar como una referencia o una función tipo `arrow`
como se muestra en este ejemplo.

Por ejemplo, para que una actor salude luego de 3 segundos:

```
› actor = pilas.actores.nave()
› pilas.luego(3, () => {
    actor.saludar("Hola!, luego de 3 segundos.");
  }
```

</div>

<div class="funcion">
```
pilas.cada(duración, tarea, veces)
```

Ejecuta una tarea o función varias veces cada cierto intervalo
de segundos.

Es importante mencionar que la duración tiene que ser un número de
segundos, y que la función se va a llamar tantas veces como indique
el argumento `veces`. Si se quiere ejecutar esa función infinitas veces
se puede omitir ese último parámetro.

Opcionalmente, también se puede interrumpir las subsiguientes repeticiones
si se retorna `true` desde la función.

Por ejemplo:

```
› actor = pilas.actores.nave()
› pilas.cada(5, () => {
    actor.saludar("¡Hola!, saludando cada 5 segundos");
  }, 10);
```

</div>

<div class="funcion">
```
pilas.azar(desde, hasta)
```

Retorna un número aleatorio en el rango que va desde el primer argumento
al segundo (incluyendo los extremos).

Por ejemplo:

```
› pilas.azar(1, 5)
‹ 3

› pilas.azar(1, 5)
‹ 5

› pilas.azar(1, 5)
‹ 2
```

</div>

<div class="funcion">
```
pilas.azar_excluyendo_un_valor(desde, hasta, valor_a_excluir)
```

Retorna un número aleatorio en el rango que va desde el primer argumento
al segundo (incluyendo los extremos), pero excluye el valor
indicado en el último argumento.

Por ejemplo:

```
› pilas.azar(1, 3, 2)
‹ 1

› pilas.azar(1, 3, 2)
‹ 3

› pilas.azar(5, 8, 6)
‹ 7

› pilas.azar(5, 8, 6)
‹ 5

› pilas.azar(5, 8, 6)
‹ 8
```

</div>


<div class="funcion">
```
pilas.azar_desde_lista(lista)
```

Retorna al azar uno de los elementos de la lista que se envía como
parámetro.

Por ejemplo:

```
› pilas.azar_desde_lista(['uno', 'dos', 'tres'])
‹ 'uno'
```

</div>

<div class="funcion">
```
pilas.subdividir_lista(lista, cantidad_de_elementos)
```

Retorna una lista nueva que solo tendrá la cantidad de elementos
que se le soliciten por parámetro. Los elementos que se preservarán
serán aquellos que estén al principio de la lista inicial.

Por ejemplo:

```
› pilas.subdividir_lista(['uno', 'dos', 'tres'], 2)
‹ ['uno', 'dos']

› pilas.subdividir_lista([3, 4, 5, 6], 3)
‹ [3, 4, 5]

› pilas.subdividir_lista([3, 4, 5, 6, 8, 2, 3], 1)
‹ [3]
```

</div>

<div class="funcion">
```
pilas.desordenar_lista(lista)
```

Retorna una copia de la lista enviada como parámetro pero
con todos sus elementos intercambiados de posición al azar.

Por ejemplo:

```
› pilas.azar_desde_lista([1, 2, 3, 4, 5, 6])
‹ [4, 6, 1, 3, 2, 5]
```

</div>


<div class="funcion">
```
pilas.intercambiar_posiciones_al_azar(lista_de_actores)
```

Intercambia de posición de los actores enviados como una lista
entre sí.

```
pilas.obtener_distancia_entre_puntos(x, y, x1, y1)
```

Retorna la cantidad de pixels de distancia entre dos puntos indicados
por parámetros.

Por ejemplo:

```
› pilas.obtener_distancia_entre_puntos(0, 0, 0, 100)
‹ 100

› pilas.obtener_distancia_entre_puntos(0, 0, 30, 40)
‹ 50
```

</div>

<div class="funcion">
```
pilas.obtener_distancia_entre_actores(actor1, actor2)
```

Retorna la cantidad de pixels de distancia entre dos actores
enviados por parámetros.

Por ejemplo:

```
› nave = pilas.actores.nave()
› pelota = pilas.actores.nave()
› pilas.obtener_distancia_entre_actores(nave, pelota)
‹ 69.5
```

</div>

<div class="funcion">
```
pilas.obtener_angulo_entre_puntos(x, y, x2, y2)
```

Retorna el ángulo en grados que se forma al trazar una linea
entre los puntos enviados por parámetro.

Por ejemplo:

```
› pilas.obtener_angulo_entre_puntos(0, 0, 40, 40)
‹ 45

› pilas.obtener_angulo_entre_puntos(0, 0, 100, 40)
‹ 21.80
```

</div>

<div class="funcion">
```
pilas.obtener_angulo_entre_actores(actor1, actor2)
```

Retorna el ángulo en grados que se forma al trazar una linea
entre la posición de un actor y otro.

Por ejemplo:

```
› nave = pilas.actores.nave()
› pelota = pilas.actores.nave()
› pilas.obtener_angulo_entre_actores(nave, pelota)
‹ 221
```

</div>

<div class="funcion">
```
pilas.ocultar_cursor()
```

Hace que el puntero del mouse sea invisible.

Por ejemplo:

```
› pilas.ocultar_cursor()
```

</div>

<div class="funcion">
```
pilas.definir_cursor(nombre)
```

Permite cambiar el puntero del mouse.

El parámetro nombre puede ser alguno de estos:

- normal
- pointer
- help
- none
- wait
- crosshair
- cell
- move
- text
- no-drop

</div>

<div class="funcion">
```
pilas.observar(nombre, variable)
```

Agrega un texto en pantalla para visualizar el valor de una variable
enviada por parámetro.

Esta función está diseñada para llamarse dentro del bloque `actualizar`,
tanto de escenas como de actores. Si se llama desde otro lado el
valor de la variable no se va a actualizar, y va quedar con el valor
inicial.

Por ejemplo:

```
› pilas.observar("posicion_x", nave.x)
› pilas.observar("rotacion de la nave", nave.rotacion)
```

</div>


<div class="funcion">
```
pilas.clonar(nombre)
```

Permite clonar un actor y poner esa copia del actor en pantalla. Esta función creará
al nuevo actor en la misma posición del actor original.

Se puede clonar cualquier actor de la escena, o de otras escenas, incluso se pueden
clonar actores que no estén activos.

Por ejemplo:

```
› var nave_nueva = pilas.clonar("nave")
› nave_nueva.x = 100
```

</div>

<div class="funcion">
```
pilas.clonar_en(nombre, x, y)
```

Permite clonar un actor en la posición solicitada.

Por ejemplo:

```
› var actor = pilas.actores.nave()
› pilas.clonar_en("nave", 100, 100)
‹ <nave en (100, 100)>
```

</div>

<div class="funcion">
```
pilas.clonar_en_la_posión_del_cursor(nombre)
```

Permite clonar un actor en la posición del mouse.

Por ejemplo:

```
› var actor = pilas.actores.nave()

› pilas.cursor_x
‹ 24

› pilas.cursor_y
‹ -139

› pilas.clonar_en_la_posión_del_cursor("nave")
‹ <nave en (24, -139)>
```

</div>

<div class="funcion">
```
pilas.clonar_en_posicion_al_azar(nombre)
```

Permite clonar un actor en una posición aleatoria de la pantalla.

Por ejemplo:

```
› pilas.actores.nave()
‹ <nave en (131, 183)>
```

</div>

<div class="funcion">
```
pilas.es_multiplo(a, b)
```

Determina si un numero es múltiplo de otro.

Por ejemplo:

```
› pilas.es_multiplo(12, 3)
‹ true

› pilas.es_multiplo(3, 2)
‹ false
```

</div>

<div class="funcion">
```
pilas.enviar_mensaje_global(mensaje, datos)
```

Envía un mensaje a todos los actores y la escena actual.

Para capturar estos mensajes desde actores o la escena, se tiene
que crear un método de la forma "cuando_llega_el_mensaje_nombre" donde
"nombre" tiene que ser mensaje que se quiere capturar.

Por ejemplo, si un actor llama a la siguiente función `this.pilas.enviar_mensaje_global('ganar')`
deberías poder capturar ese mensaje desde cualquier actor o escena
declarando el método "cuando_llega_el_mensaje_ganar".

El argumento `datos` es opcional, y se puede utilizar para enviar
parámetros adicionales junto con el mensaje. Este argumento datos
se va a enviar directamente a todos los actores que atiendan el mensaje,
pero es aconsejable que sea un diccionario. Por ejemplo, si se quiere
enviar dos valores se podría armar un diccionario así:

```
pilas.enviar_mensaje_global("empujar", {fuerza: 10, mi_posicion: this.x})
```

y desde cualquier otro actor se puede atender esa función creando
el siguiente método

```
class actor {

  cuando_llega_el_mensaje_empujar(datos) {
    this.impulsar(0, datos.fuerza);

    this.decir(`el otro parámetro era x: ${datos.mi_posicion}`);
  }
```

</div>

<div class="funcion">
```
pilas.alternar_modo_pantalla_completa()
pilas.solicitar_modo_pantalla_completa()
pilas.solicitar_modo_ventana()
```

Permite cambiar el modo de pantalla a pantalla completa o ventana.

Si se pasa al modo pantalla completa, el usuario de todas formas
puede volver al modo ventana pulsando la tecla `ESC`.

Por ejemplo:

```
› pilas.alternar_modo_pantalla_completa()
```

</div>

<div class="funcion">
```
pilas.alinear(numero, grilla)
pilas.ajustar(numero, grilla)
```

Ajusta un número a una escala de grilla, muy útil en juegos donde
el jugador se puede mover por escenarios rígidos tipo mosaico o
tableros.

Por ejemplo:

```
› pilas.alienar(130, 64)
‹ 28
```

</div>

<div class="funcion">
```
pilas.pausar()
```

Detiene la ejecución del juego por completo y espera a que
el usuario pulse la tecla espacio o haga click con el
mouse para continuar.

</div>

<div class="funcion">
```
pilas.reproducir_musica(nombre)
```

Comienza a reproducir una música a partir de un nombre y vuelve a repetirlo cuando finaliza
de forma automática.

Si hay otra música sonando esta función la detiene y comienza a reproducir la
música nueva.

Ten en cuenta que la música seguirá sonando, incluso cuando cambies de escena.

</div>

<div class="funcion">
```
pilas.detener_musica()
```

Detiene toda música que esté sonando en ese momento.

</div>

<div class="funcion">
```
pilas.esta_reproduciendo_musica()
```

Retorna `true` si en ese momento está sonando una música, sino responde
con el valor `false`.

</div>


<div class="funcion">
```
pilas.definir_mapa(diccionario)
```

Permite describir cómo se van a representar los actores en un
mapa de escenario. Esta función se utiliza casi siempre al
principio del juego o antes de llamar a la función `pilas.crear_mapa`.

Un ejemplo de invocación es el siguiente:

```
this.pilas.definir_mapa({
                x: "ladrillo",
                n: "nave"
            });
```

y luego de que se definieron los caracteres, se puede crear
un mapa así:


```
this.pilas.crear_mapa(`
          xxxxxxx
          x.....x
          x..n..x
          x.....x
          xxxxxxx
        `);
```

</div>


<div class="funcion">
```
pilas.crear_mapa(mapa, grilla, origen_x, origen_y)
```

Esta función permite crear un mapa a partir de un diccionario de
símbolos previamente creado con la función `pilas.definir_mapa`.

El argumento mapa tiene que ser una cadena de textos con la descripción
del escenario. Opcionalmente se pueden usar caracteres punto (.) o guión
(-) para separar los items del mapa. También se pueden usar espacios para
facilitar la legibilidad, esta función va a ignorar esos espacios.

Por ejemplo, esta podría ser una llamada a esta función `crear_mapa`:

```
this.pilas.crear_mapa(`
          x.....x
          x..n..x
        `);
```

Luego esta función admite como argumentos el tamaño de la grilla (64px
por omisión) y las coordenadas en las que se debería dibujar el mapa
(x=0, y=0 por omisión).

</div>

<div class="funcion">
```
pilas.laser(actor, x, y, x_final, y_final)
```

Esta función realiza un laser "instantáneo" para reconocer todos
los actores que colisionan en una linea recta que va del punto
(x, y) hasta el punto (x_final, y_final).

Una vez que la función se ejecuta, retornará una lista de esta
forma:


```
[
   {
      x: 10,
      y: 10,
      actor: <actor>
      distancia: 30
   },
   ...
 ]
```
</div>

<div class="funcion">
```
pilas.laser_al_primer_actor(actor, x, y, x_final, y_final, etiqueta)
```

Similar a la función "laser", pero solo retornará el primer actor que
se encuentre cuando traza un laser desde la posición (x, y) hasta
la posición (x_final, y_final).

Opcionalmente, a esta función se le puede indicar una etiqueta, para
que solo tenga en cuenta colisiones contra actores que tengan esa
etiqueta.

</div>

<div class="funcion">
```
actor.pausar_animacion()
```

Detiene la animación actual en el cuadro de animación en
donde se encuentre. Llamar a este método es necesario si
queremos controlar manualmente la animación más adelante en
el código.


La animación permanecerá pausada hasta que se llame a la
función "actualizar_animación" o se cambie a otra animación
diferente.
</div>

<div class="funcion">
```
actor.actualizar_animacion(velocidad = 1)
```

Este método intenta avanzar la animación de forma manual
cada vez que se invoca. Es un método útil cuando la
animación está pausada y queremos hacerla avanzar de forma
controlada, por ejemplo cuando un personaje sube una
escalera:


```
actualizar() {
  if (this.control.arriba) {
    this.actualizar_animacion(1);
  }

  if (this.control.abajo) {
    this.actualizar_animacion(-1);
  }
}
```

El método admite un parámetro para controlar la velocidad de
la animación, e incluso la posibilidad de reproducir la
animación en reversa.

La velocidad puede ser cualquier número positivo para
"avanzar" la animación, siendo el número 1 (para la
velocidad normal) o 2, 3, 4 para reproducir más rápido o
numeros fraccionarios como 1/2, 1/3 etc.. para velocidades
más lentas.

También se pueden especificar números negativos, para llevar
la animación en reversa. Y aquí lo mismo de antes, valores
como -2 o -4 harán que la animación se ejecute muy rápido,
mientras que otros valores como -1/4 o -0.5 reproducirán la
animación en reversa muy lentamente.

</div>

<div class="funcion">
```
actor.continuar_animacion()
```

Restaura la animación desde el punto en donde se dejó.

</div>
