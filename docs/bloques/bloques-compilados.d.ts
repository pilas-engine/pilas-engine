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
declare function variables(): {
    kind: string;
    name: string;
    custom: string;
};
declare function procedimientos(): {
    kind: string;
    name: string;
    custom: string;
};
declare function categoria_camara(): {
    kind: string;
    name: any;
    contents: any;
};
declare function categoria_control(): {
    kind: string;
    name: string;
    contents: {
        kind: string;
        type: any;
    }[];
};
declare function categoria_audio(): {
    kind: string;
    name: any;
    contents: any;
};
declare function generar_toolbox(): {
    actor: ({
        kind: string;
        name: any;
        contents: any;
    } | {
        kind: string;
        name: string;
        custom: string;
    })[];
    escena: ({
        kind: string;
        name: any;
        contents: any;
    } | {
        kind: string;
        name: string;
        custom: string;
    })[];
    proyecto: any[];
};
declare var toolbox_de_bloques_compilados: {
    actor: ({
        kind: string;
        name: any;
        contents: any;
    } | {
        kind: string;
        name: string;
        custom: string;
    })[];
    escena: ({
        kind: string;
        name: any;
        contents: any;
    } | {
        kind: string;
        name: string;
        custom: string;
    })[];
    proyecto: any[];
};
