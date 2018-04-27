import Controller from "@ember/controller";

export default Controller.extend({
  url: "./manual/index.html",
  queryParams: ["url"],

  actions: {
    cuandoCambiaURL(url) {
      this.set("url", url);
    },

    abrirEnUnaVentanaNueva() {
      window.open(this.url);
    }
  }
});
