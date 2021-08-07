Blockly.Blocks["actor_reiniciar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Reiniciar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_reiniciar"] = function(block) {
  var code = `this.reiniciar();\n`;
  return code;
};
