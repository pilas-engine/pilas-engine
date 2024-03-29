---
title: Cámara
---

Si bien el juego tendrá un tamaño fijo en la pantalla, pilas incorpora una cámara que nos permite realizar desplazamientos para mostrar otras partes de la escena.

En esta sección vamos a controlar cámara de la escena tanto desde el editor como desde el juego en ejecución.

## Mover la cámara desde el editor

Para desplazar la cámara simplemente tenemos que pulsar y arrastrar con el mouse sobre el fondo de la escena:

![](imagenes/camara.assets/movimiento.gif)

Vas a notar que en la escena el movimiento de la cámara se refleja en los atributos "Cámara x" y "Cámara Y".

Esos dos atributos también se utilizan para definir la posición inicial de la cámara cuando comienza a ejecutarse el juego.

También vas a observar otros dos atributos llamados "Ancho" y "Alto". Estos dos atributos van a definir el tamaño total del escenario. Podes cambiar esos parámetros para hacer que el escenario total sea más grande o más chico.

## Mover la cámara mientras se ejecuta el juego

Para mover la cámara podemos acceder a los atributos de posición directamente, por ejemplo si quieres mover constantemente la cámara hacia la derecha, podrías escribir este código en la escena:

```typescript
class escena1 extends Escena {
  actualizar() {
    this.camara.x += 1;
  }
}
```

O bien, si quieres que un actor se mueva libremente por el escenario y la cámara la siga todo el tiempo podrías usar el método `seguir_al_actor` así:

```typescript
class nave extends Actor {
  actualizar() {
    this.camara.seguir_al_actor(this, 10, true);
  }
}
```

Ten en cuenta que esta función se tiene que llamar todo el tiempo, por eso la tenemos que incluir dentro del método actualizar.

También ten en cuenta que la función lleva 3 parámetros:

```typescript
seguir_al_actor(actor, suavidad, ignorar_bordes);
```

- `actor`: el actor que la cámara tiene que seguir.
- `suavidad`: tiene que ser un número indicando cuán gradual tiene que ser el movimiento de la cámara, cuanto menor sea el número mas rápido y brusco será el movimiento de la cámara.
- `ignorar_bordes`: el último parámetro tiene que ser `true` o `false`. Si se envía `true` la cámara seguirá al actor incluso si sale del area del escenario, esto es ideal para juegos con area de movimiento infinita. Si se coloca `false` la cámara se detendrá en los bordes del escenario.


## Zoom o aumento

La cámara de pilas también permite hacer acercamientos, o zoom, usando un atributo
llamado `escala`.

Por ejemplo, si queremos aumentar el acercamiento de la cámara podemos usar el atributo
`escala` con valores superiores a `1`:

```
this.camara.escala = 2.5;
```

O bien regresar al zoom original escribiendo:

```
this.camara.escala = 1;
```

## Fijar actores a la pantalla

Hay casos en donde queremos que algún actor permanezca fijo
en su posición, independiente del movimiento de la cámara.

Por ejemplo, el puntaje del jugador no es algo que queremos
que salga de la pantalla cuando la cámara se mueve, tampoco
los controles, ni el contador de vidas.

Para que este tipo de actores quede visible en pantalla
tenemos tenemos que definirles la propiedad `fijo` de
esta forma:

```
this.fijo = true;
```

Esa propiedad en valor `true` le indica a pilas que este actor
no se tiene que desplazar respetando la cámara, sino que debe
permanecer fijo a la pantalla en todo momento.
