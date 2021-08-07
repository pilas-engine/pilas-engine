Blockly.Blocks["actor_cada_segundo"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("En cada segundo transcurrido")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["actor_cada_segundo"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `actor._bloques_cada_segundo = function(segundos_transcurridos) {
    ${sentencias}
  };\n`;

  return code;
};
