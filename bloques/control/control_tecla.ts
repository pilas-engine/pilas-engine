Blockly.Blocks["control_tecla"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("¿Pulsa la tecla")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME")
      .appendField("?");
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  generateOptions: function() {
    return window["valores_dropdown"].teclas;
  }
};

Blockly.JavaScript["control_tecla"] = function(block) {
  var dropdown_name = block.getFieldValue("NAME");
  var code = "this.pilas.control." + dropdown_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
