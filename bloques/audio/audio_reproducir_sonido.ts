Blockly.Blocks["audio_reproducir_sonido"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Reproducir el sonido")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "sonido");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  generateOptions: function() {
    return window.valores_dropdown.sonidos;
  }
};

Blockly.JavaScript["audio_reproducir_sonido"] = function (block) {
  var sonido = block.getFieldValue("sonido");
  var code = `this.pilas.reproducir_sonido("${sonido}");\n`;
  return code;
};
