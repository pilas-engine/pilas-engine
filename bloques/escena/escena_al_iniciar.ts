Blockly.Blocks["escena_al_iniciar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Al iniciar")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["escena_al_iniciar"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `escena._bloques_al_iniciar = function(x, y, evento) {
    ${sentencias}
  };\n`;

  return code;
};
