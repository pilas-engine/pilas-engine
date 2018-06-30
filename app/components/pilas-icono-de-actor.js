import Component from "@ember/component";

export default Component.extend({
  tagName: "",
  style: Ember.computed("actor", function() {
    let actor = this.get("actor");
    let rootURL = this.rootURL;
    let url = `url('${rootURL}iconos_actores/${actor.imagen}.png')`;
    return new Ember.String.htmlSafe(`background-image: ${url}`);
  })
});
