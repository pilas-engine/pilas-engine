Blockly.Blocks["audio_reproducir_animacion"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Reproducir la animación")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "animacion");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  generateOptions: function() {
    return window.valores_dropdown.animaciones;
  }
};

Blockly.JavaScript["audio_reproducir_animacion"] = function (block) {
  var animacion = block.getFieldValue("animacion");
  return `this.animacion = "${animacion}";\n`;
};
