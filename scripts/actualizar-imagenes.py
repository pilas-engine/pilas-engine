import os
import json

from PIL import Image
from PyTexturePacker import Packer




def crear_spritesheet_css_de_ejemplos():
    packer = Packer.create(bg_color=0xffffff, texture_format=".png", atlas_format='json', enable_rotated=False)
    packer.pack("recursos/ejemplos/", "ejemplos")

    ## como el archivo origne es un json, se tiene que crear un css a partir de el.
    f = open("ejemplos.json", 'rt')
    data = json.load(f)
    f.close()

    lineas = []
    lineas.append(".sprite-ejemplos {display:inline-block; overflow:hidden; background-repeat: no-repeat;background-image:url(ejemplos.jpg);}")


    for nombre, imagen in data["frames"].items():
        identificador = nombre.replace(".png", "")
        x = imagen["frame"]["x"]
        y = imagen["frame"]["y"]
        w = imagen["frame"]["w"]
        h = imagen["frame"]["h"]

        lineas.append(f".capturas-{identificador} {{width: {w}px; height: {h}px; background-position: -{x}px -{y}px}}")

    salida = open("public/ejemplos.css", "wt")
    for linea in lineas:
        salida.write(linea + "\n")
    salida.close()

    im = Image.open("ejemplos.png")
    rgb_im = im.convert("RGB")
    rgb_im.save("public/ejemplos.jpg")

    print("Creando el archivo public/ejemplos.css")
    print("Creando el archivo public/ejemplos.jpg")

    os.remove("ejemplos.png")
    os.remove("ejemplos.json")

if __name__ == "__main__":
    crear_spritesheet_css_de_ejemplos()
