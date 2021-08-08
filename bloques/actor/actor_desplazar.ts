Blockly.Blocks["actor_desplazar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Desplazar X")
      .appendField(new Blockly.FieldNumber(1, -300, 300), "x")
			.appendField("e Y")
      .appendField(new Blockly.FieldNumber(2, -300, 300), "y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_desplazar"] = function(block) {
  var number_x = block.getFieldValue("x");
  var number_y = block.getFieldValue("y");

  var code = `this.x += ${number_x};\nthis.y += ${number_y};\n`;
  return code;
};
