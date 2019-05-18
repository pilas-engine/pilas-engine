import Component from "@ember/component";

export default Component.extend({
  didInsertElement() {
    this.element.querySelector("input").focus();
  }
});
