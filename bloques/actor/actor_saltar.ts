Blockly.Blocks["actor_saltar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Saltar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_saltar"] = function(block) {
  var code = `this.saltar();\n`;
  return code;
};
