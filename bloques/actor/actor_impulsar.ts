Blockly.Blocks["actor_impulsar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Impulsar X")
			.appendField(new Blockly.FieldNumber(-100, 4, 100, 0.1), "x")
			.appendField("e Y")
			.appendField(new Blockly.FieldNumber(-100, 4, 100, 0.1), "y")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_impulsar"] = function(block) {
  var intensidad = block.getFieldValue("intensidad");
  var x = +block.getFieldValue("x");
  var y = +block.getFieldValue("y");

  var code = `this.impulsar(${x}, ${y});\n`;
  return code;
};
