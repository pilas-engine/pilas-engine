Blockly.Blocks["pilas_cursor_x"] = {
  init: function () {
    this.appendDummyInput().appendField("Posición X del mouse");
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["pilas_cursor_x"] = function (block) {
  var code = "pilas.cursor_x";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
