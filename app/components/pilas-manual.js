import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  classNames: ["flex1"],
  seccion: "index.html",
  currentURL: "",

  observarURL: task(function*() {
    while (true) {
      let element = this.element.querySelector("iframe");
      let url = element.contentDocument.location.pathname;

      url = url.replace("/manual/", "").replace(/\//g, "__");

      if (this.currentURL != url && url.includes(".html")) {
        this.set("currentURL", url);

        if (this.cuandoCambiaURL) {
          this.cuandoCambiaURL(url);
        }
      }

      yield timeout(2000);
    }
  }),

  didInsertElement() {
    this.observarURL.perform({});
    this.set("iframeURL", "/manual/" + this.seccion.replace(/__/g, "/"));
  }
});
