Blockly.Blocks["pilas_cursor_y"] = {
  init: function () {
    this.appendDummyInput().appendField("Posición Y del mouse");
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["pilas_cursor_y"] = function (block) {
  var code = "pilas.cursor_y";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
