declare var Blockly: any;
declare function categoria(nombre: any, bloques: any): {
    kind: string;
    name: any;
    contents: any;
};
declare function bloque(nombre: any): {
    kind: string;
    type: any;
};
declare function generar_toolbox(): {
    actor: {
        kind: string;
        name: any;
        contents: any;
    }[];
    escena: any[];
    proyecto: any[];
};
declare var toolbox_de_bloques_compilados: {
    actor: {
        kind: string;
        name: any;
        contents: any;
    }[];
    escena: any[];
    proyecto: any[];
};
