import Service from "@ember/service";

export default Service.extend({
  enElectron: false,

  iniciar() {
    if (window.enElectron) {
      this.set("enElectron", true);
    }
  }
});
