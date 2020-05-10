import { helper } from "@ember/component/helper";

export function helperImagen(params) {
  let nombre = params[0];
  return `this.imagen = "${nombre}";`;
}

export default helper(helperImagen);
