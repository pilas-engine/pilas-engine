import Component from "@ember/component";
import { later } from "@ember/runloop";

export default Component.extend({
  sb: null,

  didInsertElement() {
    later(() => {
      this.vincular_scrollbooster();
    }, 1000);
  },

  vincular_scrollbooster() {
    let contenido = this.element;
    let viewport = this.element.parentElement.parentElement;

    let sb = new ScrollBooster({
      viewport: viewport,
      content: contenido,
      emulateScroll: false,
      shouldScroll: (data, event) => {
        if (
          event.target.classList.contains("input") ||
          event.target.classList.contains("select")
        ) {
          return false;
        } else {
          return true;
        }
      },
      onUpdate: function(data) {
        viewport.scrollTop = data.position.y;
        viewport.scrollLeft = data.position.x;
      }
    });

    this.set("sb", sb);
  },

  willDestroyElement() {
    let sb = this.get("sb");

    if (sb) {
      sb.destroy();
    }
  }
});
