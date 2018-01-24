export default function autocompletar(contexto, texto) {
  function obtener_atributos(objeto) {
    let atributos = [];

    for (let atributo in objeto) {
      atributos.push(atributo);
    }

    return atributos;
  }

  function comienza_con(cadena, texto_a_consultar) {
    return cadena.indexOf(texto_a_consultar) === 0;
  }


  function completar(contexto, tokens) {

    if (!contexto) {
      return [];
    }

    if (!tokens) {
      return obtener_atributos(contexto);
    }

    let primer_elemento = tokens.shift();

    if (!contexto[primer_elemento]) {
      return obtener_atributos(contexto).filter(e => comienza_con(e, primer_elemento));
    }

    return completar(contexto[primer_elemento], tokens);
  }

  let tokens = texto.split('.');
  let items = completar(contexto, tokens);

  let prefijo = texto.split('.');
  prefijo.pop();

  if (prefijo.length >= 1) {
    return items.map(e => prefijo.join(".") + "." + e);
  } else {
    return items;
  }

}
