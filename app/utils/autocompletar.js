export default function autocompletar(contexto, texto) {
  function obtener_atributos(objeto) {
    let atributos = [];

    for (let atributo in objeto) {
      atributos.push(atributo);
    }

    return atributos;
  }

  function adjuntar_prefijo(prefijo, elemento) {
    if (prefijo) {
      return `${prefijo}.${elemento}`;
    } else {
      return elemento;
    }
  }

  function autocompletar(tokens, contexto, finaliza_con_punto, prefijo) {
    let primer_elemento = tokens.shift();

    if (tokens.length > 0) {
      return autocompletar(
        tokens,
        contexto[primer_elemento],
        finaliza_con_punto,
        prefijo
      );
    }

    if (!finaliza_con_punto) {
      return obtener_atributos(contexto)
        .filter(e => e.startsWith(primer_elemento))
        .map(e => adjuntar_prefijo(prefijo, e));
    } else {
      return obtener_atributos(contexto).map(e => adjuntar_prefijo(prefijo, e));
    }
  }

  let tokens = texto.split(".");
  let finaliza_con_punto = texto.endsWith(".");
  let prefijo = texto.substring(0, texto.lastIndexOf("."));

  return autocompletar(tokens, contexto, finaliza_con_punto, prefijo);
}
