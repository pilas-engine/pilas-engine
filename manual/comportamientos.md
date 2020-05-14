---
title: Comportamientos
---

En el desarrollo de videojuegos es conveniente tener una forma de indicarle a los actores una rutina o tarea para que la realicen.

En pilas usamos el concepto de comportamiento. Un comportamiento es un objeto que simboliza una acción a realizar por un actor.

La utilidad de usar componentes es que puedes asociarlos y intercambiarlos libremente para lograr efectos útiles.

Por ejemplo: un guardia de un juego de acción puede ir de un lado a otro en un pasillo:

- caminar hacia la izquierda hasta el fin del pasillo.
- dar una vuelta completa.
- caminar hacia la derecha hasta el fin del pasillo.
- dar una vuelta completa.
- etc...

En este caso hay 4 comportamientos, y queda en nuestro control si queremos que luego de los 4 comportamientos comience nuevamente.

## Realizando comportamientos

Para indicarle a un actor que realice un comportamiento tenemos que llamar a la función
`hacer` indicándole el nombre del comportamiento:

```typescript
let mi_actor = pilas.actores.actor();
mi_actor.hacer("aparecer");
```

Ten en cuenta que los comportamientos se pueden encadenar para lograr efectos o animaciones
una detrás de otra. Por ejemplo, si queremos mostrar y ocultar un actor podemos hacerlo
así:

```typescript
let mi_actor = pilas.actores.actor();
mi_actor.hacer("aparecer");
mi_actor.hacer("desaparecer");
```

Incluso, algunas habilidades reciben parámetros para indicar velocidad, posición etc...

Por ejemplo, si queremos hacer que el actor desaparezca y aparezca varias veces muy rápidamente
podemos escribir algo así:

```typescript
let mi_actor = pilas.actores.actor();

for (i=0; i<50; i++) {
  mi_actor.hacer("aparecer", {velocidad: 10});
  mi_actor.hacer("desaparecer", {velocidad: 10});
}
```

## Comportamientos incluidos en pilas

Esta es la lista de comportamientos que incluye pilas:

- desaparecer (parámetros: velocidad)
- aparecer (parámetros: velocidad)
- eliminar (sin parámetros)
- mover (parámetros: x, y, demora)

## Comportamientos personalizados

Si quieres crear tus propios comportamientos podrías abordarlo de la siguiente forma:

Primero, deberías crear una clase que herede de `Comportamientos` y tenga al menos
un método iniciar y actualizar así:

```typescript
class MiComportamiento extends Comportamiento {

  iniciar(argumentos) {
  }

  actualizar() {
    // retornar true para detener el comportamiento.
  }

  terminar() {}
}
```

Luego, deberías vincularlo al módulo de comportamientos:

```typescript
pilas.comportamientos.vincular("mi comportamiento", MiComportamiento);
```

y por último asignárselo a un actor:

```typescript
mi_actor.hacer("mi_comportamiento");
```
