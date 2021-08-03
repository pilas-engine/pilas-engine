function categoria(nombre, bloques) {
    return {
        kind: "category",
        name: nombre,
        contents: bloques,
    };
}
function bloque(nombre) {
    return {
        kind: "block",
        type: nombre
    };
}
function generar_toolbox() {
    return {
        actor: [
            categoria("Eventos", [
                bloque("actor_inicia"),
                bloque("actor_actualizar"),
            ]),
        ],
        escena: [],
        proyecto: [],
    };
}
var toolbox_de_bloques_compilados = generar_toolbox();
Blockly.Blocks["actor_actualizar"] = {
    init: function () {
        this.appendDummyInput().appendField("Al actualizar");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_actualizar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "actor._bloques_actualizar = function() {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["actor_inicia"] = {
    init: function () {
        this.appendDummyInput().appendField("Al iniciar");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(210);
        this.setTooltip("Hace que el actor diga algo");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["actor_inicia"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "actor._bloques_iniciar = function() {\n    " + sentencias + "\n  };\n";
    return code;
};
