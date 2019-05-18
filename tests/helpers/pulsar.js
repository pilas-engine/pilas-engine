import { later } from "@ember/runloop";
import { Promise as EmberPromise } from "rsvp";

export default async function pulsar(texto) {
  let elemento = [].slice
    .call(document.querySelectorAll(`a`))
    .filter(a => a.innerHTML.includes(texto));

  if (elemento.length === 0) {
    throw new Error(`No existe un tag a con el texto: '${texto}'.`);
  }

  if (elemento.length > 1) {
    throw new Error(
      `Hay ${
        elemento.length
      } elemento con el texto: '${texto}', se esperaba solo uno.`
    );
  }

  await new EmberPromise(function(resolve) {
    later(() => {
      resolve();
    }, 1000);
  });

  await elemento[0].click();
}
