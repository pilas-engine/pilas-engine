Blockly.Blocks["camara_vibrar"] = {
  init: function () {
    this.appendDummyInput()
			.appendField("Vibrar cámara con intensidad de")
			.appendField(new Blockly.FieldNumber(2, 1, 50, 1), "intensidad")
			.appendField("pixels durante")
			.appendField(new Blockly.FieldNumber(0.5, 0.1, 10, 0.1), "segundos")
			.appendField("segundos");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["camara_vibrar"] = function (block) {
  var intensidad = block.getFieldValue("intensidad");
  var segundos = block.getFieldValue("segundos");

  return `pilas.camara.vibrar(${intensidad}, ${segundos});\n`;
};
