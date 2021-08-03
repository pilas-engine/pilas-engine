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

