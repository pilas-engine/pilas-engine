import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  classNames: ["flex1"],
  seccion: "index.html",
  currentURL: "",
  iframeURL: "",
  prefijo: "manual/",

  observarURL: task(function*() {
    while (true) {
      let element = this.element.querySelector("iframe");
      let url = element.contentDocument.location.pathname;

      if (url === "blank") {
        yield timeout(2000);
        continue;
      }

      url = url.split("manual/")[1];

      url = url.replace(this.prefijo, "").replace(/\//g, "__");

      if (this.currentURL != url && url.includes(".html")) {
        this.set("currentURL", url);

        if (this.cuandoCambiaURL) {
          this.cuandoCambiaURL(url.replace(".html", ""));
        }
      }

      yield timeout(2000);
    }
  }),

  didInsertElement() {
    this.observarURL.perform({});
    this.set("iframeURL", this.prefijo + this.seccion.replace(/__/g, "/") + ".html");
  }
});
