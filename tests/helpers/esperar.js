import { later } from '@ember/runloop';
import { Promise as EmberPromise } from 'rsvp';
import { registerAsyncHelper } from "@ember/test";

export default registerAsyncHelper("esperar", function(app, segundos) {
  return new EmberPromise(success => {
    later(success, segundos * 1000);
  });
});
