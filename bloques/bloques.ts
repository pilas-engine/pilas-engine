// Para crear bloques nuevos se puede usar esta
// aplicación web:
//
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yigt2z

declare var Blockly: any;

function categoria(nombre, bloques) {
  return {
    kind: "category",
    name: nombre,
    contents: bloques,
  }
}

function bloque(nombre) {
  return {
    kind: "block",
    type: nombre
  }
}

function variables() {

  return {
            kind: "category",
            name: "Variables",
            custom: "VARIABLE",
  };
}

function procedimientos() {
  return          {
            kind: "category",
            name: "Funciones",
            custom: "PROCEDURE",
          }
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
        bloque("camara_mover_camara"),
        bloque("camara_vibrar"),
      ]),
      categoria("Eventos", [
        bloque("escena_cuando_hace_click"),
      ]),
      variables(),
      procedimientos(),
    ],
    proyecto: [],
  }
}

var toolbox_de_bloques_compilados = generar_toolbox();

/*
 {
 asda
        actor: [
          {
            kind: "category",
            name: "Eventos",
            contents: [
              {
                kind: "block",
                type: "cuando_comienza_una_colision",
              },
            ],
          },
          {
            kind: "category",
            name: "Control",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
            ],
          },
          {
            kind: "category",
            name: "Acciones",
            contents: [
              {
                kind: "block",
                type: "text",
              },
              {
                kind: "block",
                type: "actor_decir",
              },
              {
                kind: "block",
                type: "desplazar",
              },
              {
                kind: "block",
                type: "reproducir_animacion",
              },
              {
                kind: "block",
                type: "reproducir_sonido",
              },
              {
                kind: "block",
                type: "reproducir_musica",
              },

              {
                kind: "block",
                type: "detener_musica",
              },
            ],
          },
          {
            kind: "category",
            name: "Sensores",
            contents: [
              {
                kind: "block",
                type: "control_tecla",
              },
            ],
          },
          {
            kind: "category",
            name: "Variables",
            custom: "VARIABLE",
          },
          {
            kind: "category",
            name: "Funciones",
            custom: "PROCEDURE",
          },
        ],
        proyecto: [
          {
            kind: "category",
            name: "Logic",
            contents: [
              {
                kind: "block",
                type: "logic_compare",
              },
              {
                kind: "block",
                type: "logic_operation",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
            ],
          },
        ],
        escena: [
          {
            kind: "category",
            name: "Eventos",
            contents: [
              {
                kind: "block",
                type: "escena_iniciar",
              }
            ]
          },
          {
            kind: "category",
            name: "Lógica",
            contents: [
              {
                kind: "block",
                type: "logic_compare",
              },
              {
                kind: "block",
                type: "logic_operation",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
            ],
          },
        ],
      }
*/
