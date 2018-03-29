# Animaciones

Para crear y asignar animaciones se tienen que definir previamente en el código del actor.

El método "crear_animacion" se puede llamar especificando el nombre de la animación, los cuadros que se deben mostrar y la velocidad.

Por ejemplo, para crear una animación de un actor mientras está esperando usé lo siguiente:

```typescript
this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);
```

El valor "2" significa que la animación se debe mostrar a una velocidad de 2 cuadros por segundo.

Luego, una vez creada la animación, se puede reproducir usando esta llamada:

```typescript
this.reproducir_animacion("conejo_parado");
```

La creación de animaciones generalmente se realiza en el método iniciar de esta forma:

```typescript
class Conejo extends Actor {
	iniciar() {
        this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);
        this.crear_animacion("conejo_camina", ["conejo_camina1", "conejo_camina2"], 20);
        this.crear_animacion("conejo_salta", ["conejo_salta"], 20);
        this.crear_animacion("conejo_muere", ["conejo_muere"], 1);

        this.animacion = "conejo_parado";
	}

    actualizar() {

    }
}
```


Luego, para cambiar de animación, se puede re-definir el valor del atributo
animación así:

```typescript
class Conejo extends Actor {
	iniciar() {
        this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);
        this.crear_animacion("conejo_camina", ["conejo_camina1", "conejo_camina2"], 20);
        this.crear_animacion("conejo_salta", ["conejo_salta"], 20);
        this.crear_animacion("conejo_muere", ["conejo_muere"], 1);

        this.animacion = "conejo_parado";
	}

    actualizar() {
        if (this.pilas.control.izquierda) {
					this.animacion = "conejo_camina";
					this.x -= 5;
				}

				if (this.pilas.control.derecha) {
					this.animacion = "conejo_camina";
					this.x += 5;
				}

				if (!this.pilas.control.izquierda && !this.pilas.control.derecha) {
					this.animacion = "conejo_parado";
				}
    }
}
```
