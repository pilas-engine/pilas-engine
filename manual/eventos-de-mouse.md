---
title: Eventos del mouse
---

En pilas llamamos "eventos" a las señales que emiten desde
dispositivos como el mouse o teclado. Por ejemplo, un "click" del mouse es un evento al igual que la pulsación de una tecla.

Y lo interesante de los eventos es que podemos capturarlos y disparar alguna acción dentro del juego para responder. Por ejemplo, en un juego de acción, el "click" del mouse podría realizar una explosión o hacer que un personaje salte.

## Antes de empezar, el caso más común

Si bien esta sección habla de eventos y cómo hacer uso por completo
del mouse, casi siempre se quiere saber la posición del mouse para
mover actores o crear objetos. Si ese es tu caso, te comentamos que
pilas tiene 4 atributos para conocer en qué posición se encuentra
el cursor del mouse en todo momento:

- pilas.cursor_x: posición horizontal del mouse.
- pilas.cursor_y: posición vertical del mouse.
- pilas.cursor_x_absoluta: posición horizontal del mouse pero sin tener en cuenta la posición de la cámara. La coordenada corresponderá a la coordenada física de la ventana.
- pilas.cursor_y_absoluta: posición vertical del mouse pero sin tener en cuenta la posición de la cámara.

Y estos atributos, se puede usar generalmente directamente desde la función
actualizar de los actores:

```typescript
class actor extends Actor {
  iniciar() {}

  actualizar() {
    // la sentencias a continuación hacen que el actor siga la
    // posición del cursor del mouse en todo momento
    this.x = this.pilas.cursor_x;
    this.y = this.pilas.cursor_y;
  }
}
```

## ¿Cómo capturar un evento del mouse?

Para capturar un evento desde el mouse simplemente hay que declarar alguna de estas funciones en el código:

- cuando_hace_click(x, y, evento_original)
- cuando_termina_de_hacer_click(x, y, evento_original)
- cuando_mueve(x, y, evento_original)
- cuando_sale(x, y, evento_original)

Estas funciones se pueden crear en el código de una escena o de un actor. La diferencia es que en las escenas el "click" o el movimiento se van a detectar en toda la pantalla, mientras que en el código del actor solo se detectarán si el mouse apunta al actor.

Si desde un actor necesitas detectar el click del mouse en la pantalla deberías
usar este otro método:

- cuando_hace_click_en_la_pantalla(x, y, evento_original)

Veamos un ejemplo, imaginá que queremos crear actores de la clase "Pelota" cada vez que el usuario hace "click" sobre la pantalla. Podríamos hacerlo colocando este código en la escena:

```typescript
class escena2 extends Escena {
  iniciar() {}

  actualizar() {}

  cuando_mueve(x, y, evento_original) {}

  cuando_hace_click(x, y, evento_original) {
    let pelota = this.pilas.actores.pelota();
    pelota.x = x;
    pelota.y = y;
  }
}
```

## ¿Cómo capturar eventos del mouse en un actor?

Para capturar eventos en el contexto de un actor, tenemos que usar las mismas funciones, pero declarándolas dentro del código del actor.

Por ejemplo, imaginá que estamos haciendo un juego de cartas y queremos que la carta se pueda hacer girar con un "click" de mouse y que cambie de transparencia cuando el mouse esté sobre ella:

![](imagenes/assets/carta_con_eventos.gif)

El código del actor debería quedarnos algo similar a lo siguiente:

```typescript
class actor extends Actor {
  propiedades = {};

  iniciar() {
    this.transparencia = 50;
  }

  actualizar() {}

  cuando_mueve(x, y, evento_original) {
    this.escala = 1.2;
    this.transparencia = 0;
  }

  cuando_sale(x, y, evento_original) {
    this.transparencia = 50;
    this.escala = 1;
  }

  cuando_hace_click(x, y, evento_original) {
    this.rotacion = [360];
  }

  cuando_termina_de_hacer_click(x, y, evento_original) {}
}
```

Los manejadores de eventos como `cuando_mueve`, `cuando_sale` y `cuando_hace_click` van a ser llamados internamente cuando se produzcan esos eventos sobre el actor.

## Capturar eventos de forma global, con manejadores

Otra forma de capturar eventos más sofisticada es utilizando
el módulo `eventos` de la escena.

```typescript
pilas.eventos.conectar("mueve_mouse", (x, y) => {
  console.log("mueve", x, y);
});

pilas.eventos.conectar("click_de_mouse", (x, y) => {
  console.log("mueve", x, y);
});

pilas.eventos.conectar("termina_click", (x, y) => {
  console.log("mueve", x, y);
});
```

Esta es la lista de eventos completa:

- `mueve_mouse`: x, y
- `click_de_mouse`: x, y, boton_izquierdo, boton_derecho
- `termina_click`: x, y, boton_izquierdo, boton_derecho
