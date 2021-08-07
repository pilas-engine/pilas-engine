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
  return {
    kind: "category",
    name: "Funciones",
    custom: "PROCEDURE",
  }
}

function categoria_camara() {
  return categoria("Cámara", [
        bloque("camara_fijar_x"),
        bloque("camara_fijar_y"),
        bloque("camara_vibrar"),
        bloque("camara_desplazar_horizontalmente"),
        bloque("camara_desplazar_verticalmente"),
      ]);
}

function categoria_control() {
  return {
            kind: "category",
            name: "Control",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
            ],
          };
}

function categoria_audio() {
  return categoria("Audio", [
    bloque("audio_reproducir_sonido"),
    bloque("audio_reproducir_musica"),
    bloque("audio_detener_musica"),
  ]);
}

function generar_toolbox() {
  return {
    actor: [
			categoria("Acciones", [
				bloque("actor_decir"),
				bloque("actor_saltar"),
				bloque("actor_impulsar"),
				bloque("actor_desplazar"),
				bloque("actor_reiniciar"),
      ]),
      categoria("Eventos", [
        bloque("actor_inicia"),
        bloque("actor_cuando_hace_click"),
        bloque("actor_cuando_hace_click_en_la_pantalla"),
        bloque("actor_actualizar"),
        bloque("actor_cada_segundo"),
      ]),
      categoria_control(),
      categoria_camara(),
      categoria_audio(),
      
      variables(),
      procedimientos(),
    ],
    escena: [
			categoria("Valores", [
				bloque("pilas_cursor_x"),
				bloque("pilas_cursor_y"),
			]),

      categoria("Eventos", [
        bloque("escena_al_iniciar"),
        bloque("escena_cuando_hace_click"),
        bloque("escena_al_actualizar"),
        bloque("escena_cada_segundo"),
      ]),

      categoria_control(),
      categoria_camara(),
      categoria_audio(),

      variables(),
      procedimientos(),
    ],
    proyecto: [],
  }
}

var toolbox_de_bloques_compilados = generar_toolbox();

/*
 {
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
            name: "Acciones",
            contents: [
              {
                kind: "block",
                type: "text",
              },
              {
                kind: "block",
                type: "desplazar",
              },
              {
                kind: "block",
                type: "reproducir_animacion",
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
        ],
        escena: [
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
