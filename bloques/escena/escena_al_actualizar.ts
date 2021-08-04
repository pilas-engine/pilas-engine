Blockly.Blocks["escena_al_actualizar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Al actualizar")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["escena_al_actualizar"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `escena._bloques_al_actualizar = function() {
    ${sentencias}
  };`;

  return code;
};
