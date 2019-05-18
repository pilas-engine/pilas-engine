import { later } from "@ember/runloop";
import { Promise as EmberPromise } from "rsvp";

export default async function esperarElemento(selector) {
  await new EmberPromise((success, fail) => {
    let cantidadDeIntentos = 0;

    function existeElemento() {
      return document.querySelectorAll(selector).length > 0;
    }

    consultarExistenciaDiferida();

    function consultarExistenciaDiferida() {
      later(() => {
        if (existeElemento()) {
          success();
        } else {
          cantidadDeIntentos += 1;

          if (cantidadDeIntentos > 20) {
            fail(
              new Error(
                `No se encontró el elemento '${selector}', incluso con una espera.`
              )
            );
          } else {
            consultarExistenciaDiferida();
          }
        }
      }, 1000);
    }
  });
}
