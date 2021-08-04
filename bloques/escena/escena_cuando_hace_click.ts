Blockly.Blocks["escena_cuando_hace_click"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Cuando hace click")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["escena_cuando_hace_click"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `escena._bloques_cuando_hace_click = function(x, y, evento) {
    ${sentencias}
  };\n`;

  return code;
};
