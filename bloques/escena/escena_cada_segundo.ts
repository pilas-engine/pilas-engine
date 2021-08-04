Blockly.Blocks["escena_cada_segundo"] = {
  init: function() {
    this.appendDummyInput()
      .appendField("En cada segundo trancurrido")
    this.appendStatementInput("NAME").setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript["escena_cada_segundo"] = function(block) {
  var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");

  var code = `escena._bloques_cada_segundo = function(segundos_transcurridos) {
    ${sentencias}
  };\n`;

  return code;
};
