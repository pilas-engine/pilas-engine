Blockly.Blocks["actor_decir"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Decir")
      .appendField(new Blockly.FieldTextInput("¡hola!"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_decir"] = function(block) {
  var value_name = block.getFieldValue("NAME");
  var code = `this.decir("${value_name}");\n`;
  return code;
};
