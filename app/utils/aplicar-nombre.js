export default function aplicar_nombre(nombre, codigo) {
  let resultado = codigo.match(/(class\s+\w+)\sextend+/i);

  if (resultado.length > 1) {
    return codigo.replace(resultado[1], `class ${nombre}`);
  } else {
    return codigo;
  }
}
