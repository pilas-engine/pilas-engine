# Autómatas y estados

Un desafío muy común en el desarrollo de juegos es lograr que los actores puedan mostrar animaciones y reaccionar de acuerdo a modos particulares: saltar, caminar, quedarse parado, pediendo etc…

Para estas cosas Pilas incorpora un mecanismo de autómatas y estados.

Un actor puede estar en un estado a la vez, por ejemplo, "parado" podría ser el estado de un actor en un juego de plataformas. Cuando el usuario pulsa hacia arriba, podría pasar al estado "saltando", pero solo cuando toca el piso podría pasar al estado "parado" nuevamente.

Este modelo de estados y transiciones es lo que llamamos un autómata, y si bien puede parece algo complejo al principio, con el tiempo notarás que se trata de algo muy práctico y sencillo. 

Para crear un estado simplemente tenemos que editar el código de un actor y asignarle un valor a la propiedad "estado" y crear dos métodos para que pilas sepa a qué métodos llamar cuando el actor esté en ese estado:

```typescript
class MiActor extends Actor {
    iniciar() {
        this.estado = "parado";
    }
    
    actualizar() {
    }
    
    parado_iniciar() {
        this.animacion = "parado";
    }
    
    parado_actualizar() {
  		// código que se ejecutará 60 veces por segundo
        // cuando el actor esté en el estado "parado".
    }
}
```

