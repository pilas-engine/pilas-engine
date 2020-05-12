---
title: Escenas
---

Las escenas te permiten dividir el juego en partes reconocibles y que interactúan de manera diferente con el usuario.

Un juego típico tendrá al menos una escena como el menú principal, una presentanción y una pantalla de juego.

![](imagenes/assets/escenas_juego.png)

## Cambiar o reiniciar escenas

Para cambiar la escena actual se puede llamar a la función `cambiar_escena`
indicando el nombre de la escena que se quiere cambiar. Por ejemplo:

```typescript
pilas.cambiar_escena("escena2");
```

También se puede reiniciar la escena actual llamando a esta
función:

```typescript
pilas.reiniciar_escena();
```

## Gravedad y simulación física

Cada escena tiene asociado su propio entorno de simulación
de física. Así que si estás haciendo un juego que involucra
física es probable que quieras ajustar algunos parámetros
como `gravedad_x` y `gravedad_y`. Estos parámetros se
encuentran en el inspector de la escena y también se pueden
cambiar desde el código así:

```typescript
pilas.fisica.gravedad_x = 1;
pilas.fisica.gravedad_y = 1;
```

o bien:

```typescript
pilas.escena.gravedad_x = 0;
pilas.escena.gravedad_y = -2;
```
