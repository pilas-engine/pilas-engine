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
function variables() {
    return {
        kind: "category",
        name: "Variables",
        custom: "VARIABLE",
    };
}
function procedimientos() {
    return {
        kind: "category",
        name: "Funciones",
        custom: "PROCEDURE",
    };
}
function generar_toolbox() {
    return {
        actor: [
            categoria("Eventos", [
                bloque("actor_inicia"),
                bloque("actor_actualizar"),
            ]),
            variables(),
            procedimientos(),
        ],
        escena: [
            categoria("Valores", [
                bloque("pilas_cursor_x"),
                bloque("pilas_cursor_y"),
            ]),
            categoria("Cámara", [
                bloque("camara_fijar_x"),
                bloque("camara_fijar_y"),
                bloque("camara_vibrar"),
                bloque("camara_desplazar_horizontalmente"),
                bloque("camara_desplazar_verticalmente"),
            ]),
            categoria("Eventos", [
                bloque("escena_al_iniciar"),
                bloque("escena_cuando_hace_click"),
                bloque("escena_al_actualizar"),
                bloque("escena_cada_segundo"),
            ]),
            variables(),
            procedimientos(),
        ],
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
Blockly.Blocks["camara_desplazar_horizontalmente"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Desplazar la cámara")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor")
            .appendField("pixels horizontalmente");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_desplazar_horizontalmente"] = function (block) {
    var valor = block.getFieldValue('valor');
    return "this.pilas.camara.x += " + valor + ";\n";
};
Blockly.Blocks["camara_desplazar_verticalmente"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Desplazar la cámara")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor")
            .appendField("pixels verticalmente");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_desplazar_verticalmente"] = function (block) {
    var valor = block.getFieldValue('valor');
    return "this.pilas.camara.y += " + valor + ";\n";
};
Blockly.Blocks["camara_fijar_x"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Fijar posición horizontal de la cámara en")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_fijar_x"] = function (block) {
    var valor = block.getFieldValue('valor');
    var code = "\n    this.pilas.camara.x = " + valor + ";\n  ";
    return code;
};
Blockly.Blocks["camara_fijar_y"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Fijar posición vertical de la cámara en")
            .appendField(new Blockly.FieldNumber(2, -100, 100, 1), "valor");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["camara_fijar_y"] = function (block) {
    var valor = block.getFieldValue('valor');
    var code = "\n    this.pilas.camara.y = " + valor + ";\n  ";
    return code;
};
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
    var code = "\n    this.pilas.camara.x = " + value_x + ";\n    this.pilas.camara.y = " + value_y + ";\n  ";
    return code;
};
Blockly.Blocks["camara_vibrar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Vibrar cámara con intensidad de")
            .appendField(new Blockly.FieldNumber(2, 1, 50, 1), "intensidad")
            .appendField("pixels durante")
            .appendField(new Blockly.FieldNumber(0.5, 0.1, 10, 0.1), "segundos")
            .appendField("segundos");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["camara_vibrar"] = function (block) {
    var intensidad = block.getFieldValue("intensidad");
    var segundos = block.getFieldValue("segundos");
    return "pilas.camara.vibrar(" + intensidad + ", " + segundos + ");\n";
};
Blockly.Blocks["escena_al_actualizar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Al actualizar");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_al_actualizar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_al_actualizar = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["escena_al_iniciar"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Al iniciar");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_al_iniciar"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_al_iniciar = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["escena_cada_segundo"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("En cada segundo trancurrido");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_cada_segundo"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_cada_segundo = function(segundos_transcurridos) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["escena_cuando_hace_click"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cuando hace click");
        this.appendStatementInput("NAME").setCheck(null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript["escena_cuando_hace_click"] = function (block) {
    var sentencias = Blockly.JavaScript.statementToCode(block, "NAME");
    var code = "escena._bloques_cuando_hace_click = function(x, y, evento) {\n    " + sentencias + "\n  };\n";
    return code;
};
Blockly.Blocks["pilas_cursor_x"] = {
    init: function () {
        this.appendDummyInput().appendField("Posición X del mouse");
        this.setOutput(true, null);
        this.setColour(135);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["pilas_cursor_x"] = function (block) {
    var code = "pilas.cursor_x";
    return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.Blocks["pilas_cursor_y"] = {
    init: function () {
        this.appendDummyInput().appendField("Posición Y del mouse");
        this.setOutput(true, null);
        this.setColour(135);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};
Blockly.JavaScript["pilas_cursor_y"] = function (block) {
    var code = "pilas.cursor_y";
    return [code, Blockly.JavaScript.ORDER_NONE];
};
