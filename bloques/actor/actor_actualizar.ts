Blockly.Blocks["actor_actualizar"] = {
  init: function() {
    this.appendDummyInput().appendField("Al actualizar");
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_actualizar"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `actor._bloques_actualizar = function() {
    ${sentencias}
  };\n`;
  return code;
};
