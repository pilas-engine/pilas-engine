---
title: Pilas como biblioteca externa
---

Pilas se puede usar como una biblioteca externa para permitir un uso avanzado
y muy personalizado de pilas.

Esta opción es ideal si quieres poner tu juego en blogs, fotos o incluso
en dispositivos móviles como tablets o celulares con herramientas como
cordova o phonegap.

El primer paso para incorporar pilas como biblioteca es descargar los
archivos javascript `phaser`, `nineslice` y `pilas-engine` del directorio
`public` de nuestro repositorio y colocarlos en un directorio local:

- https://github.com/pilas-engine/pilas-engine/tree/master/public

Luego, deberías agregar en ese mismo directorio los archivos
"imagenes/sin_imagen.png" y el directorio "fuentes" que también aparencen
en el link anterior.

Por último, deberías crear un archivo index.html con la estructura inicial
que necesita pilas.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <script src="archivo phaser js"></script>
    <script src="archivo nineslice js"></script>
    <script src="archivo pilas-engine js"></script>
  </head>

  <body>
    <script>
      var pilas = pilasengine.iniciar(600, 600);

      pilas.onready = function() {
        let actor = pilas.actores.actor();
      };
    </script>
  </body>
</html>
```

Este archivo `index.html` se tiene que cargar en un navegador usando
un webserver y no directamente abriendo el archivo `index.html`.
Esto se tiene que hacer debido a que pilas (y phaser) usan ajax para cargar
imágenes y otros recursos.

Adicionalmente, si tu juego utiliza recursos propios, u otros actores de
pilas, te recomendamos ver este otro ejemplo en donde se cargan varios
recursos:

- https://github.com/pilas-engine/pilas-engine/blob/feature/adaptar-para-ser-usada-como-biblioteca/public/ejemplo-minimo-con-recursos.html

Vas a notar que la diferencia más grande de este otro ejemplo es que usamos
un parámetro para especificar la lista de recursos a cargar y opcionalmente
enumeramos los detalles del proyecto.
