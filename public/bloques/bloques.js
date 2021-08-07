/* global Blockly */

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7ragh2

Blockly.Blocks["desplazar"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Desplazar x")
      .appendField(new Blockly.FieldNumber(0, -300, 300), "x");
    this.appendDummyInput()
      .appendField("y")
      .appendField(new Blockly.FieldNumber(0, -300, 300), "y");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["desplazar"] = function(block) {
  var number_x = block.getFieldValue("x");
  var number_y = block.getFieldValue("y");

  var code = `this.x += ${number_x};\nthis.y += ${number_y};\n`;
  return code;
};


Blockly.Blocks["control_tecla"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("¿Pulsa la tecla")
      .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME")
      .appendField("?");
    this.setOutput(true, "Boolean");
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  generateOptions: function() {
    return window.valores_dropdown.teclas;
  }
};

Blockly.JavaScript["control_tecla"] = function(block) {
  var dropdown_name = block.getFieldValue("NAME");
  var code = "this.pilas.control." + dropdown_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks["reproducir_animacion"] = {
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

Blockly.JavaScript["reproducir_animacion"] = function(block) {
  var animacion = block.getFieldValue("animacion");
  var code = `this.animacion = "${animacion}";\n`;
  return code;
};

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
