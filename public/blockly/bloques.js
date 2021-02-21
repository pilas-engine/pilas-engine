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
      .appendField(
        new Blockly.FieldDropdown([
          ["explosion", "explosion"],
          ["mini_explosion", "mini_explosion"]
        ]),
        "animacion"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["reproducir_animacion"] = function(block) {
  var animacion = block.getFieldValue("animacion");
  var code = `this.reproducir_animacion("${animacion}");\n`;
  return code;
};
