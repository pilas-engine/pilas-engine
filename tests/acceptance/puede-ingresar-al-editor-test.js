import { currentURL, visit, click } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";
import pulsar from "pilas-engine/tests/helpers/pulsar";
import esperar from "pilas-engine/tests/helpers/esperar";
import esperarElemento from "pilas-engine/tests/helpers/esperar-elemento";

module("Acceptance | puede ingresar al editor", function(hooks) {
  setupApplicationTest(hooks);

  const PAUSA = 2;

  test("puede ingresar a la pantalla principal", async function(assert) {
    await visit("/");

    assert.dom("#pilas-logo").exists();
    assert.equal(currentURL(), "/", "Está en la ruta principal");

    await pulsar("Abrir el editor");
    assert.equal(currentURL(), "/editor", "Ingresó al editor");

    await esperarElemento("a#ejecutar");

    await pulsar("Ejecutar");
    await esperar(PAUSA);

    await pulsar("Detener");
    await esperar(PAUSA);

    await pulsar("Ejecutar");
    await esperar(PAUSA);

    await pulsar("Pausar");
    await esperar(PAUSA);

    function cambiar_input(valor) {
      let elemento = document.querySelector("input#posicion");
      elemento.value = valor;

      function triggerEvent(el, type) {
        let e = null;
        if ("createEvent" in document) {
          e = document.createEvent("HTMLEvents");
          e.initEvent(type, false, true);
          el.dispatchEvent(e);
        } else {
          e = document.createEventObject();
          e.eventType = type;
          el.fireEvent("on" + e.eventType, e);
        }
      }

      triggerEvent(elemento, "input");

      return esperar(0.01);
    }

    for (let i = 140; i >= 0; i -= 2) {
      await cambiar_input(i);
    }

    await esperar(PAUSA / 2);

    for (let i = 0; i <= 140; i += 2) {
      await cambiar_input(i);
    }

    await esperar(PAUSA / 2);

    await pulsar("Detener");
    await esperar(PAUSA);

    await click(".test-regresar");

    assert.equal(currentURL().replace("?livereload=false", ""), "/", "Pudo regresar a la ruta inicial.");
  });
});
