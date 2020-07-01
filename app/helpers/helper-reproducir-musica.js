import { helper } from "@ember/component/helper";

export function reproducirMusica(params) {
  let nombre = params[0];
  return `this.reproducir_musica("${nombre}");`;
}

export default helper(reproducirMusica);
