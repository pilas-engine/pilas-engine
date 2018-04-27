import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  classNames: ["flex1"],
  url: "./manual/index.html",
  currentURL: "",

  observarURL: task(function*() {
    while (true) {
      let element = this.$("iframe").get(0);
      let url = element.contentDocument.location.href;

      if (this.currentURL != url && url != "about:blank") {
        this.set("currentURL", url);
        if (this.cuandoCambiaURL) {
          this.cuandoCambiaURL(url);
        }
      }

      yield timeout(500);
    }
  }),

  didInsertElement() {
    this.observarURL.perform({});
    this.set("iframeURL", this.url);
  }
});
