import animaciones_iniciales from "./animaciones-iniciales";
import fixture_workspace_bloques_de_escena_nueva from "./workspace-bloques-de-escena-nueva";
import fixture_sonidos_iniciales from "./sonidos-iniciales";

export default {
  titulo: "Proyecto",
  ancho: 500,
  alto: 500,
  tamaño: "500x500",
  nombre_de_la_escena_inicial: "escena1",
  imagenes: [],
  animaciones: animaciones_iniciales,
  codigos: {
    escenas: [
      {
        nombre: "escena1",
        codigo: "class escena1 extends Escena {\n  iniciar() {\n\n  }\n\n  actualizar() {\n    this.desplazamiento_del_fondo_x += 2;\n  }\n}",
      },
    ],
    actores: [
      {
        nombre: "nave",
        codigo: "// @ts-ignore\nclass nave extends Actor {\n\n  iniciar() { }\n\n  actualizar() {\n    if (this.control.arriba) {\n      this.y += 5;\n    }\n\n    if (this.control.abajo) {\n      this.y -= 5;\n    }\n  }\n}\n",
      },
    ],
    proyecto: "class Proyecto {\n    iniciar() {\n    }\n}",
  },
  escenas: [
    {
      nombre: "escena1",
      id: 1,
      ancho: 1000,
      alto: 1000,
      camara_x: 0,
      camara_y: 0,
      gravedad_x: 0,
      gravedad_y: 1,
      fondo: "decoracion:fondos/fondo-espacio_1",
      actores: [
        {
          x: -179.90867579908675,
          y: 8.219178082191775,
          z: 0,
          imagen: "imagenes:nave/nave",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "actor",
          espejado: false,
          espejado_vertical: false,
          figura: "",
          figura_dinamica: true,
          figura_ancho: 100,
          figura_alto: 100,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 1,
          figura_sensor: false,
          es_texto: false,
          texto_con_borde: false,
          id: 12064284181927134,
          activo: true,
          nombre: "nave",
          habilidades: [],
          sensores: [],
          lasers: [],
        },
      ],
    },
  ],
  fps: 60,
  modo_de_video: "suavizado",
  sonidos: fixture_sonidos_iniciales,
  bloques: {
    proyecto: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="ZC`*TK^}PI+^~52^ak!H" x="35" y="44"></block></xml>',
    escenas: [
      {
        nombre: "escena1",
        bloques: {
          texto: fixture_workspace_bloques_de_escena_nueva,
          codigo_de_bloques:
            "if (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('^BS9[_V!D30$Klp?G]Nt', this.id);\n}\nactor._bloques_iniciar = function() {\n\n  };\n\nif (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('D[i2{g4SjDY+sAT7f=W@', this.id);\n}\nactor._bloques_actualizar = function() {\n\n  };\n",
        },
      },
    ],
    actores: [
      {
        nombre: "nave",
        bloques: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="actor_inicia" id="^BS9[_V!D30$Klp?G]Nt" x="-217" y="-205"></block><block type="actor_actualizar" id="D[i2{g4SjDY+sAT7f=W@" x="-212" y="-36"></block></xml>',
        codigo_de_bloques:
          "if (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('^BS9[_V!D30$Klp?G]Nt', this.id);\n}\nactor._bloques_iniciar = function() {\n\n  };\n\nif (this.id) {\n\tthis.pilas.notificar_ejecucion_del_bloque('D[i2{g4SjDY+sAT7f=W@', this.id);\n}\nactor._bloques_actualizar = function() {\n\n  };\n",
      },
    ],
  },
};
