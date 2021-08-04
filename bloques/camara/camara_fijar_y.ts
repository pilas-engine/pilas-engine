Blockly.Blocks["camara_fijar_y"] = {
    init: function() {
          this.appendDummyInput()
              .appendField("Fijar posición vertical de la cámara en")
              .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
};

Blockly.JavaScript["camara_fijar_y"] = function (block) {
  var valor = block.getFieldValue('valor');

  var code = `
    this.pilas.camara.y = ${valor};
  `;

  return code;
};
