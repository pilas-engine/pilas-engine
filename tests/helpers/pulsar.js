import { later } from "@ember/runloop";
import { Promise as EmberPromise } from "rsvp";
import $ from "jquery";

export default async function pulsar(texto) {
  let elemento = $(`a:contains('${texto}')`);

  if (elemento.length === 0) {
    throw new Error(`No existe un tag a con el texto: '${texto}'.`);
  }

  if (elemento.length > 1) {
    throw new Error(`Hay ${elemento.length} elemento con el texto: '${texto}', se esperaba solo uno.`);
  }

  await elemento.animate({ opacity: 0.2 }, 200).animate({ opacity: 1 }, 200);

  await new EmberPromise(success => {
    later(() => {
      success();
    }, 400);
  });

  await elemento.click();
}
