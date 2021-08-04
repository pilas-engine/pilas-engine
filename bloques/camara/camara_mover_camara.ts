Blockly.Blocks["camara_mover_camara"] = {
  init: function () {
    this.appendDummyInput().appendField("Mover la cámara a X:");
    this.appendValueInput("x").setCheck("Number");
    this.appendDummyInput().appendField("e Y:");
    this.appendValueInput("y").setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["camara_mover_camara"] = function (block) {
  var value_x = Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ATOMIC);

  var code = `
    pilas.camara.x = ${value_x};
    pilas.camara.y = ${value_y};
  `;

  return code;
};
