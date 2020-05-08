import animaciones_iniciales from "./animaciones-iniciales";

export default {
  titulo: "Proyecto demo",
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
        codigo: "class escena1 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
      },
      {
        nombre: "escena2",
        codigo: "class escena2 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
      }
    ],
    actores: [
      {
        nombre: "plataforma",
        codigo: "// @ts-ignore\nclass plataforma extends Actor {\n    iniciar() {}\n}"
      },
      {
        nombre: "caja",
        codigo: "// @ts-ignore\nclass caja extends Actor {\n    iniciar() {}\n}"
      },
      {
        nombre: "pelota",
        codigo: "// @ts-ignore\nclass pelota extends Actor {\n    iniciar() {}\n}"
      },
      {
        nombre: "techo",
        codigo: "// @ts-ignore\nclass techo extends Actor {\n    iniciar() {}\n}"
      },
      {
        nombre: "suelo",
        codigo: "// @ts-ignore\nclass suelo extends Actor {\n    iniciar() {}\n}"
      }
    ]
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
      fondo: "decoracion:fondos/fondo-plano",
      actores: [
        {
          activo: true,
          x: 0,
          y: -90,
          z: 0,
          habilidades: [],
          imagen: "imagenes:plataformas/plataforma",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "plataforma",
          espejado: false,
          espejado_vertical: false,
          figura: "rectangulo",
          figura_dinamica: false,
          figura_ancho: 250,
          figura_alto: 40,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 0,
          figura_sensor: false,
          id: 1952,
          nombre: "plataforma"
        },
        {
          activo: true,
          x: 96,
          y: 39,
          z: 0,
          habilidades: [],
          imagen: "imagenes:objetos/caja",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "caja",
          espejado: false,
          espejado_vertical: false,
          figura: "rectangulo",
          figura_dinamica: true,
          figura_ancho: 45,
          figura_alto: 45,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 0.9,
          figura_sensor: false,
          id: 1585,
          nombre: "caja"
        },
        {
          activo: true,
          x: -61,
          y: 57,
          z: 0,
          habilidades: [],
          imagen: "imagenes:objetos/pelota",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "actor",
          espejado: false,
          espejado_vertical: false,
          figura: "circulo",
          figura_dinamica: true,
          figura_ancho: 100,
          figura_alto: 100,
          figura_radio: 25,
          figura_sin_rotacion: false,
          figura_rebote: 1,
          figura_sensor: false,
          id: 1278,
          nombre: "pelota"
        },
        {
          activo: true,
          x: 0,
          y: 255,
          z: 0,
          habilidades: [],
          imagen: "imagenes:plataformas/techo",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "actor",
          espejado: false,
          espejado_vertical: false,
          figura: "rectangulo",
          figura_dinamica: false,
          figura_ancho: 600,
          figura_alto: 25,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 1,
          figura_sensor: false,
          id: 1403,
          nombre: "techo"
        },
        {
          activo: true,
          x: 0,
          y: -250,
          z: 0,
          habilidades: [],
          imagen: "imagenes:plataformas/suelo",
          centro_x: 0.5,
          centro_y: 0.5,
          rotacion: 0,
          escala_x: 1,
          escala_y: 1,
          transparencia: 0,
          etiqueta: "actor",
          espejado: false,
          espejado_vertical: false,
          figura: "rectangulo",
          figura_dinamica: false,
          figura_ancho: 600,
          figura_alto: 25,
          figura_radio: 40,
          figura_sin_rotacion: false,
          figura_rebote: 0,
          figura_sensor: false,
          id: 1019,
          nombre: "suelo"
        }
      ]
    },
    {
      nombre: "escena2",
      id: 2,
      ancho: 1000,
      alto: 1000,
      camara_x: 0,
      camara_y: 0,
      gravedad_x: 0,
      gravedad_y: 1,
      fondo: "decoracion:fondos/fondo-plano",
      actores: []
    }
  ]
};
