import Service from "@ember/service";
import Ember from "ember";

export default Service.extend({
  bus: Ember.inject.service(),
  items: [],
  iniciado: false,

  iniciar() {
    if (this.get("iniciado")) {
      return;
    }

    this.get("bus").on("error", this, "alRecibirUnErrorDesdeElBus");
  },

  error(mensaje, detalle) {
    this.get("items").pushObject({
      tipo: "error",
      mensaje: mensaje,
      detalle: detalle,
      tiempo: this._obtener_tiempo()
    });
    this.get("bus").trigger("se_actualiza_el_log");
  },

  info(mensaje) {
    this.get("items").pushObject({
      tipo: "info",
      mensaje: mensaje,
      tiempo: this._obtener_tiempo()
    });
    this.get("bus").trigger("se_actualiza_el_log");
  },

  _obtener_tiempo() {
    let d = new Date();

    let horas = this._agregar_ceros(d.getHours());
    let minutos = this._agregar_ceros(d.getMinutes());
    let segundos = this._agregar_ceros(d.getSeconds());

    return `${horas}:${minutos}:${segundos}`;
  },

  _agregar_ceros(numero) {
    return (numero < 10 ? "0" : "") + numero;
  },

  limpiar() {
    this.set("items", []);
    this.get("bus").trigger("se_actualiza_el_log");
  },

  grupo(titulo, texto_multilinea) {
    this.get("items").pushObject({
      tipo: "grupo",
      titulo: titulo,
      lineas: texto_multilinea.split("\n"),
      tiempo: this._obtener_tiempo()
    });
    this.get("bus").trigger("se_actualiza_el_log");
  },

  alRecibirUnErrorDesdeElBus(datos) {
    this.error(datos.mensaje, datos.stack);
  }
});
