import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("en-electron", "Integration | Component | en electron", {
  integration: true
});

test("it renders", function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    {{#en-electron}}
      demo
    {{else}}
      otro
    {{/en-electron}}
  `);

  assert.equal(this.$().text().trim(), "otro");
});
