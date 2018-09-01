import Component from "@ember/component";
import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",
  style: computed("actor", function() {
    let actor = this.actor;
    let rootURL = this.rootURL;
    let url = `url('${rootURL}iconos_actores/${actor.imagen}.png')`;
    return new htmlSafe(`background-image: ${url}`);
  })
});
