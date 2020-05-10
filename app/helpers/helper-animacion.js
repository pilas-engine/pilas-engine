import { helper } from "@ember/component/helper";

export function helperAnimacion(params) {
  let nombre = params[0];
  return `this.animacion = "${nombre}";`;
}

export default helper(helperAnimacion);
