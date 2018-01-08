import { registerAsyncHelper } from "@ember/test";
import Ember from "ember";

export default registerAsyncHelper("esperar", function(app, segundos) {
  return new Ember.RSVP.Promise(success => {
    Ember.run.later(success, segundos * 1000);
  });
});
