import { later } from "@ember/runloop";
import { Promise as EmberPromise } from "rsvp";

export default async function esperar(segundos) {
  await new EmberPromise(success => {
    later(success, segundos * 1000);
  });
}
