/* global Blockly */

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#7ragh2

Blockly.Blocks["actor_decir"] = {
  init: function() {
    this.appendValueInput("NAME")
      .setCheck("String")
      .appendField("Decir");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip("Hace que el actor diga algo");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_decir"] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_ATOMIC);
  var code = `this.decir(${value_name});\n`;
  return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yigt2z

Blockly.Blocks["actor_inicia"] = {
  init: function() {
    this.appendDummyInput().appendField("Al iniciar");
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(210);
    this.setTooltip("Hace que el actor diga algo");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_inicia"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `actor._bloques_iniciar = function() {
    ${sentencias}
  };\n`;

  return code;
};

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

Blockly.Blocks["actor_actualizar"] = {
  init: function() {
    this.appendDummyInput().appendField("Al actualizar");
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_actualizar"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `actor._bloques_actualizar = function() {
    ${sentencias}
  };\n`;
  return code;
};

Blockly.Blocks["control_izquierda"] = {
  init: function() {
    this.appendDummyInput().appendField("¿Pulsa tecla izquierda?");
    this.setOutput(true, "Boolean");
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["control_izquierda"] = function() {
  var code = "this.pilas.control.izquierda";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
