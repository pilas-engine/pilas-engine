Blockly.Blocks["camara_desplazar_horizontalmente"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Desplazar la cámara")
      .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor")
      .appendField("pixels horizontalmente");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["camara_desplazar_horizontalmente"] = function (block) {
  var valor = block.getFieldValue('valor');

  return `this.pilas.camara.x += ${valor};\n`;
};
