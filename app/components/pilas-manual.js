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

      if (this.get("currentURL") != url && url != "about:blank") {
        this.set("currentURL", url);
        this.get("cuandoCambiaURL")(url);
      }

      yield timeout(500);
    }
  }),

  didInsertElement() {
    this.get("observarURL").perform({});
    this.set("iframeURL", this.get("url"));
  }
});
