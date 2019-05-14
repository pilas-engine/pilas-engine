export default {
  titulo: "Proyecto demo",
  ancho: 500,
  alto: 500,
  escena_inicial: 1,
  codigos: {
    escenas: [
      {
        nombre: "escena1",
        codigo:
          "class escena1 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
      },
      {
        nombre: "escena2",
        codigo:
          "class escena2 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
      }
    ],
    actores: [
      {
        nombre: "plataforma",
        codigo:
          'class plataforma extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "plataforma",\n        y: 0,\n        figura_ancho: 250,\n        figura_alto: 40,\n        figura_dinamica: false,\n        figura_rebote: 0\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "caja",
        codigo:
          'class caja extends Actor {\n    propiedades = {\n        x: 0,\n        y: 0,\n        imagen: "caja",\n        etiqueta: "caja",\n        figura: "rectangulo",\n        figura_ancho: 45,\n        figura_alto: 45,\n        figura_rebote: 0.9\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "pelota",
        codigo:
          'class pelota extends Actor {\n    propiedades = {\n        imagen: "pelota",\n        figura: "circulo",\n        figura_radio: 25\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "techo",
        codigo:
          'class techo extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "techo",\n        y: +255,\n        figura_ancho: 600,\n        figura_alto: 25,\n        figura_dinamica: false\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "suelo",
        codigo:
          'class suelo extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "suelo",\n        y: -250,\n        figura_ancho: 600,\n        figura_alto: 25,\n        figura_dinamica: false\n    };\n\n    iniciar() {}\n}'
      }
    ]
  },
  escenas: [
    {
      nombre: "escena1",
      id: 1,
      camara_x: 0,
      camara_y: 0,
      gravedad_x: 0,
      gravedad_y: 1,
      fondo: "imagenes:fondo-plano.png",
      actores: [
        {
          x: 0,
          y: -90,
          z: 0,
          habilidades: [],
          imagen: "imagenes:plataforma.png",
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
          x: 96,
          y: 39,
          z: 0,
          habilidades: [],
          imagen: "imagenes:caja.png",
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
          x: -61,
          y: 57,
          z: 0,
          habilidades: [],
          imagen: "imagenes:pelota.png",
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
          x: 0,
          y: 255,
          z: 0,
          habilidades: [],
          imagen: "imagenes:techo.png",
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
          x: 0,
          y: -250,
          z: 0,
          habilidades: [],
          imagen: "imagenes:suelo.png",
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
          id: 1019,
          nombre: "suelo"
        }
      ]
    },
    {
      nombre: "escena2",
      id: 2,
      camara_x: 0,
      camara_y: 0,
      fondo: "imagenes:fondo-plano.png",
      actores: []
    }
  ]
};
