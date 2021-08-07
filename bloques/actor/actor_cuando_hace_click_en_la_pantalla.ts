Blockly.Blocks["actor_cuando_hace_click_en_la_pantalla"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Cuando hace click en la pantalla")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_cuando_hace_click_en_la_pantalla"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `

  actor._bloques_cuando_hace_click_en_la_pantalla = function(x, y, evento) {
    ${sentencias}
  };\n`;

  return code;
};
