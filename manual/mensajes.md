---
title: Mensajes entre actores y escenas
---

Dentro de un juego se puede producir varias comunicaciones
entre actores. Si un personaje protagonista pierde, tal vez queremos
que el contador de puntajes se entere y cambie de color, o que
los enemigos conjuntamente dejen de seguir al protagonista; tal vez
incluso vamos a querer que la escena se notifique de esto y ponga
un cartel en pantalla o pase a otra escena.

Los mensajes sirven para implementar este tipo de comunicaciones entre
distintos objetos de nuestro juego. Y tienen una ventaja, porque podemos
hacer que un actor no tenga que conocer todo lo que lo rodea, sino que
simplemente emita un mensaje "y quién escuche puede hacer algo al respecto".

## Enviar mensajes globalmente

Un ejemplo típico que se suele dar de mensajes son los mensajes globales,
estos mensajes se pueden enviar desde un actor a todos los demás, estos
mensajes globales incluso llegan a la escenas.

Para enviar un mensaje global tenemos que escribir este código en
el actor emisor:

```typescript
this.pilas.enviar_mensaje_global("mi_mensaje");
```

Y para que otros actores puedan atender este mensaje simplemente tenemos
que crear un método que se llame "cuando*llega_el_mensaje*" seguido del
nombre del mensaje así:

```typescript
cuando_llega_el_mensaje_mi_mensaje() {
  this.decir("Algún actor envió el mensaje 'mi_mensaje'");
}
```

opcionalmente, si queremos un actor o escena que capture todos los mensajes
podemos usar este método:

```typescript
cuando_llega_un_mensaje(mensaje:string) {
  this.decir("llegó el mensaje " + mensaje);
}
```

## Mensajes dirigidos a actores particulares

Si no queremos enviar el mensajes a todos los actores y escenas, lo que
podemos hacer es obtener la referencia a un actor en particular y enviarle
el mensaje de forma directa:

```typescript
let puntaje = this.pilas.obtener_actor_por_nombre("puntaje");
puntaje.enviar_mensaje("aumentar");
```

Y de forma similar a como mencionamos antes, el puntaje debería tener
un método llamado `cuando_llega_el_mensaje_aumentar` para reaccionar
al mensaje:

```typescript
cuando_llega_el_mensaje_aumentar() {
  this.puntaje_acumulado += 1;
}
```

## Mensajes con parámetros

A veces junto con el mensaje necesitamos enviar parámetros para ser más
específicos. Para eso podemos usar el segundo argumento de las funciones
de mensajes.

Por ejemplo, imagina que tenemos un actor que cuando colisiona con una
moneda sume 5 puntos, pero cuando colisiona con un diamante sume 10 puntos.

Por un lado, cuando se produce la colisión podemos emitir el mensaje
"aumentar_puntaje" con la cantidad de puntos que le corresponden:

```typescript
cuando_colisiona(actor: Actor) {
  if (actor.tiene_etiqueta("moneda")) {
    actor.eliminar();
    this.pilas.enviar_mensaje_global("aumentar_puntaje", {cantidad: 5});
  }

  if (actor.tiene_etiqueta("diamante")) {
    actor.eliminar();
    this.pilas.enviar_mensaje_global("aumentar_puntaje", {cantidad: 10});
  }
}
```

Luego, del lado del receptor (o los receptores) del mensaje, tenemos que
leer los parámetros adicionales así:

```typescript
cuando_llega_el_mensaje_aumentar_puntaje(datos) {
  this.puntaje_acumulado += datos.cantidad;
}
```
