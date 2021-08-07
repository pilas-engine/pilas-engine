Blockly.Blocks["actor_cuando_hace_click"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Cuando hace click")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_cuando_hace_click"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `

  actor._bloques_cuando_hace_click = function(x, y, evento) {
    ${sentencias}
  };\n`;

  return code;
};
