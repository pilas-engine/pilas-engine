import { helper } from "@ember/component/helper";

export function helperAnimacion(params) {
  let nombre = params[0];
  return `this.reproducir_sonido("${nombre}");`;
}

export default helper(helperAnimacion);
