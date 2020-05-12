---
title: Azar o cálculos aleatorios
---

Una utilidad muy utilizada en los juegos son las funciones para obtener
números aleatorios. Pilas incluye una función muy simple para esto llamada
`pilas.azar`:

La función `pilas.azar` retorna un número aleatorio entre dos números. Por
ejemplo, si buscas que pilas retorne un número al hacer entre 1 y 5 podrías
llamar a la función así:

```typescript
pilas.azar(1, 5)
```

Es importante mencionar que el rango de valores incluye los extremos. En el
caso anterior la función podría retorna 1, 2, 3, 4 o 5.
