Blockly.Blocks["audio_reproducir_musica"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Reproducir música")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "musica");

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

Blockly.JavaScript["audio_reproducir_musica"] = function (block) {
  var musica = block.getFieldValue("musica");
  var code = `this.pilas.reproducir_musica("${musica}");\n`;
  return code;
};
