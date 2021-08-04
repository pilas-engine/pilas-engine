Blockly.Blocks["camara_fijar_x"] = {
    init: function() {
          this.appendDummyInput()
              .appendField("Fijar posición horizontal de la cámara en")
              .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
};

Blockly.JavaScript["camara_fijar_x"] = function (block) {
  var valor = block.getFieldValue('valor');

  var code = `
    this.pilas.camara.x = ${valor};
  `;

  return code;
};
