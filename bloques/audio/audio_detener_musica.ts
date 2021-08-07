Blockly.Blocks["audio_detener_musica"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Detener música")

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

Blockly.JavaScript["audio_detener_musica"] = function (block) {
  var code = `this.pilas.detener_musica();\n`;
  return code;
};
