# Escenas

Las escenas te permiten dividir el juego en partes reconocibles y que interactúan de manera diferente con el usuario.

Un juego típico tendrá al menos una escena como el menú principal, una presentanción y una pantalla de juego.

![](assets/escenas_juego.png)

## Cambiar de escena

Para cambiar la escena actual se puede llamar a la función `cambiar_escena`
indicando el nombre de la escena que se quiere cambiar. Por ejemplo:

```
pilas.cambiar_escena("escena2");
```
