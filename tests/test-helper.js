import resolver from "@ember/test-helpers";
import { setResolver } from "ember-qunit";
import { start } from "ember-cli-qunit";

setResolver(resolver);
start();
