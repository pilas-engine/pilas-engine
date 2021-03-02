import Service, { inject as service } from "@ember/service";

export default Service.extend({
  bus: service(),
  items: null,
  iniciado: false,

  iniciar() {
    this.set("items", []);

    if (this.iniciado) {
      return;
    }

    this.bus.on("error", this, "alRecibirUnErrorDesdeElBus");
  },

  error(mensaje, detalle) {
    this.items.pushObject({
      tipo: "error",
      mensaje: mensaje,
      detalle: detalle
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  info(mensaje) {
    this.items.pushObject({
      tipo: "info",
      mensaje: mensaje
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  mensaje(mensaje) {
    this.items.pushObject({
      tipo: "mensaje",
      mensaje: mensaje
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  imprimir_desde_el_editor(mensaje, tipo_de_dato) {
    this.items.pushObject({
      tipo: "mensaje-desde-el-editor",
      mensaje,
      tipo_de_dato
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  entrada(mensaje) {
    this.items.pushObject({
      tipo: "entrada",
      mensaje: mensaje
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  salida(mensaje) {
    this.items.pushObject({
      tipo: "salida",
      mensaje: mensaje
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  salida_especial(mensaje) {
    this.items.pushObject({
      tipo: "salida-especial",
      mensaje: mensaje
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  _agregar_ceros(numero) {
    return (numero < 10 ? "0" : "") + numero;
  },

  limpiar() {
    this.set("items", []);
    this.bus.trigger("se_actualiza_el_log");
  },

  grupo(titulo, texto_multilinea) {
    this.items.pushObject({
      tipo: "grupo",
      titulo: titulo,
      lineas: texto_multilinea.split("\n")
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  alRecibirUnErrorDesdeElBus(datos) {
    this.error(datos.mensaje, datos.stack);
  }
});
