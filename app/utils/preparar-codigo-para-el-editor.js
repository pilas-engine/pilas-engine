export default function preparar_codigo_para_el_editor(texto) {
  let lineas = texto.split("\n");
  let lineas_seleccionadas = [];
  let dentro_de_propiedades = false;

  for (let i = 0; i < lineas.length; i++) {
    let linea = lineas[i];

    if (linea.indexOf("propiedades") > -1) {
      dentro_de_propiedades = true;
      continue;
    }

    if (dentro_de_propiedades && linea.indexOf("};") > -1) {
      dentro_de_propiedades = false;
      continue;
    }

    if (!dentro_de_propiedades) {
      lineas_seleccionadas.push(linea);
    }
  }

  return "// @ts-ignore\n" + lineas_seleccionadas.join("\n");
}
