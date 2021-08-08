/* global Blockly */

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7ragh2


Blockly.Blocks["cuando_comienza_una_colision"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Cuando comienza una colisión con el actor")
      .appendField(new Blockly.FieldVariable("actor"), "actor");
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["cuando_comienza_una_colision"] = function(block) {
  var variable_actor = Blockly.JavaScript.variableDB_.getName(block.getFieldValue("actor"), Blockly.Variables.NAME_TYPE);
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `actor._bloques_cuando_colisiona = function(${variable_actor}) {
    ${sentencias}
  };\n`;
  return code;
};
