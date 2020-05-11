import os

def convertir_markdown_a_html(fuente, includes):
    destino = fuente.replace(".md", ".html")
    opciones = "--template=manual/templates/template.html --css estilo.css --standalone --highlight-style manual/templates/syntax.theme"

    if includes:
        opciones = opciones + " --include-in-header=manual/templates/header.html"
        opciones = opciones + " --include-after-body=manual/templates/footer.html"

    os.system("pandoc manual/" + fuente + " -o public/manual/" + destino + " " + opciones)

def generar_manual_en_html():
    archivos = os.listdir("manual")

    for x in archivos:
        if '.md' in x and x != "index.md":
            convertir_markdown_a_html(x, includes=True)

    convertir_markdown_a_html("index.md", includes=False)

if __name__ == "__main__":
    generar_manual_en_html()
