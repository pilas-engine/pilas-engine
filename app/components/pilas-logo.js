import Ember from "ember";

export default Ember.Component.extend({
  didInsertElement() {
    this.$("img").css("opacity", 0);
    this.$("img").animate({
      opacity: 1
    });
  }
});
