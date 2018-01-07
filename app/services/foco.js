import Service from "@ember/service";

export default Service.extend({
  elemento: "ninguno",
  funcionParaHacerFocoEnPilas: null,
  funcionParaHacerFocoEnElEditor: null,

  conectarFunciones(hacerFocoEnPilas, hacerFocoEnElEditor) {
    this.set("funcionParaHacerFocoEnPilas", hacerFocoEnPilas);
    this.set("funcionParaHacerFocoEnElEditor", hacerFocoEnElEditor);
  },

  hacerFocoEnPilas() {
    if (this.get("funcionParaHacerFocoEnPilas")) {
      this.get("funcionParaHacerFocoEnPilas")();
      this.set("elemento", "pilas");
    } else {
      console.warn("No se puede hacer foco sobre pilas, porque no está conectada la función.");
    }
  },
  hacerFocoEnElEditor() {
    if (this.get("funcionParaHacerFocoEnElEditor")) {
      this.get("funcionParaHacerFocoEnElEditor")();
      this.set("elemento", "editor");
    } else {
      console.warn("No se puede hacer foco sobre el editor, porque no está conectada la función.");
    }
  },

  limpiar() {
    this.set("funcionParaHacerFocoEnPilas", null);
    this.set("funcionParaHacerFocoEnElEditor", null);
    this.set("elemento", "ninguno");
  }
});
