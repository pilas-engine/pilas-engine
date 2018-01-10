import Service from "@ember/service";
import config from "pilas-engine/config/environment";

export default Service.extend({
  iniciado: false,
  data: null,

  iniciar() {
    if (this.get("iniciado")) {
      return;
    }

    Ember.$.ajax({
      mimeType: "application/json",
      dataType: "json",
      url: `${config.rootURL}actores/actores.js`,
      success: result => {
        this.set("data", result);
        this.set("iniciado", true);
        console.log(result);
      }
    });
  }
});
