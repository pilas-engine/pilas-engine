# Aplica un patch al código de phaser para que las figuras
# de matter-js no cambien de tamaño cuando se cambia de tamaño
# el actor que posee la figura.
#
# Hay un commit de phaser en donde se buscó que las figuras
# y los sprites intenten tener el mismo tamaño, este patch
# evita que ese código se ejecute:
#
# https://github.com/photonstorm/phaser/commit/a98b3c3b15fe7c981703ebaf2f0513c592f3106e

ruta = "public/phaser.js"

buscar_scale_x = """//  Reset Matter scale back to 1 (sigh)
            Body.scale(this.body, factorX, factorY);

            Body.scale(this.body, value, this._scaleY);"""


buscar_scale_y = """Body.scale(this.body, factorX, factorY);

            Body.scale(this.body, this._scaleX, value);"""


archivo_de_entrada = open(ruta, "rt")
contenido = archivo_de_entrada.read()
archivo_de_entrada.close()

if contenido.find(buscar_scale_x) == -1:
    print("Parece que ya se aplicó el patch")
else:
    contenido = contenido.replace(buscar_scale_x, "\n// Desactivando escalado de body\n")
    contenido = contenido.replace(buscar_scale_y, "\n// Desactivando escalado de body\n")

    archivo_de_salida = open(ruta, "wt")
    archivo_de_salida.write(contenido)
    archivo_de_salida.close()

    print("Volviendo a guardar el archivo ", ruta)
