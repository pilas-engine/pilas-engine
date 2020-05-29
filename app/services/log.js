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
      detalle: detalle,
      tiempo: this._obtener_tiempo()
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  info(mensaje) {
    this.items.pushObject({
      tipo: "info",
      mensaje: mensaje,
      tiempo: this._obtener_tiempo()
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  mensaje(mensaje) {
    this.items.pushObject({
      tipo: "mensaje",
      mensaje: mensaje,
      tiempo: this._obtener_tiempo()
    });
    this.bus.trigger("se_actualiza_el_log");
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
    this.bus.trigger("se_actualiza_el_log");
  },

  grupo(titulo, texto_multilinea) {
    this.items.pushObject({
      tipo: "grupo",
      titulo: titulo,
      lineas: texto_multilinea.split("\n"),
      tiempo: this._obtener_tiempo()
    });
    this.bus.trigger("se_actualiza_el_log");
  },

  alRecibirUnErrorDesdeElBus(datos) {
    this.error(datos.mensaje, datos.stack);
  }
});
