import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Component.extend({
  bus: service(),

  didInsertElement() {
    // atributos que se reciben del nivel superior
    // this.instancia_seleccionada

    // Atributos especiales para el tamaño del escenario.
    this.set("propiedad_ancho", {propiedad: "ancho"});
    this.set("propiedad_alto", {propiedad: "alto"});

    this.set("propiedades", [
      {
        tipo: "separador",
        nombre: "Cámara",
        etiqueta: "stage.camera",
      },
      {
        tipo: "numero",
        propiedad: "camara_x",
        etiqueta: "stage.camera.x",
        intensidad: 1,
        min: 0,
        max: 99999
      },
      {
        tipo: "numero",
        propiedad: "camara_y",
        etiqueta: "stage.camera.y",
        intensidad: 1,
        min: -99999,
        max: 0
      },
      {
        tipo: "separador",
        nombre: "Apariencia",
        etiqueta: "stage.appearance",
      },
      {
        tipo: "imagen",
        propiedad: "fondo",
        filtroPropuesto: "",
        etiqueta: "stage.background"
      },
      {
        tipo: "separador",
        nombre: "Simulación Física",
        etiqueta: "stage.physical.simulation"
      },
      {
        tipo: "numero",
        propiedad: "gravedad_x",
        intensidad: 0.1,
        etiqueta: "stage.gravity.x"
      },
      {
        tipo: "numero",
        propiedad: "gravedad_y",
        intensidad: 0.1,
        etiqueta: "stage.gravity.y"
      }
    ]);
  },


  actions: {
    cuando_cambia_el_tamaño_del_escenario(propiedad, valor) {
      let proyecto = this.instancia_seleccionada;

      // importante, la propiedad solo puede ser "ancho" o "alto".
      console.assert(['ancho', 'alto'].includes(propiedad), "No es un valor aceptado");
      proyecto.set(propiedad, valor);

        this.bus.trigger("cuando_cambia_el_tamaño_del_escenario", {
          ancho: proyecto.get("ancho"),
          alto: proyecto.get("alto"),
        });
    }
  }
});
