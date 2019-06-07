import { helper } from "@ember/component/helper";

export function nombreDeImagen(params) {
  if (params[0]) {
    return params[0].split("/").reverse()[0];
  } else {
    return "";
  }
}

export default helper(nombreDeImagen);
