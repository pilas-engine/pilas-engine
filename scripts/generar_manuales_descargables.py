import os
import re


def obtener_contenido(ruta):
    archivo = open(ruta, "rt")
    contenido = archivo.read()
    contenido = contenido.replace("---", "")
    contenido = contenido.replace("title:", "# ")
    archivo.close()
    return contenido

def generar_archivo_tmp_md_contatenado():
    archivo = open("manual/index.md", "rt")
    lineas = archivo.readlines()
    archivo.close()

    archivos = [extraer_nombre_de_archivo_markdown(linea) for linea in lineas if '.html' in linea]

    salida = open("manual/tmp.md", "wt")

    for nombre in archivos:
        contenido = obtener_contenido("manual/" + nombre)
        salida.write(contenido)

    salida.close()


def crear_libros():
    opciones = '--toc --top-level-division=chapter --metadata title="Manual de Pilas Engine 2"'
    generar_archivo_tmp_md_contatenado()
    os.system("cd manual; pandoc " + opciones + " tmp.md -o ../manuales/book.pdf")
    os.system("cd manual; pandoc " + opciones + " tmp.md -o ../manuales/book.epub")
    os.system("rm manual/tmp.md")

def extraer_nombre_de_archivo_markdown(linea):
    return re.search('\((.*)\.html\)', linea).group(1) + ".md"

def generar_manuales_descargables():
    os.system("rm -rf manuales")
    os.system("mkdir manuales")

    crear_libros()


if __name__ == "__main__":
    generar_manuales_descargables()
