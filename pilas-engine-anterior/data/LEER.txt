Este directorio contiene los spritesheets que utilizará pilas
para mostrar imágenes.

Los spritesheets permite optimizar la carga del motor, porque el navegador
pasará a hacer dos request (uno para el .json y otro para el .png) en
lugar de hacer varios request (uno para cada imagen .png).

Si querés agregar imágenes a la colección de imágenes de pilas
vas a tener que agregar el archivo dentro del directorio "src" y
luego ejecutar el comando "make actualizar_imagenes". Esto va a volver
a generar el spritesheet y colocarlo en el directorio que efectivamente
usará pilas para servir las imágenes "public/data".

Ah, y necesitás instalar sprite-sheet.js (https://github.com/krzysztof-o/spritesheet.js)
con el comando:

    npm install spritesheet-js -g
