export default {
  titulo: "Proyecto demo",
  ancho: 500,
  alto: 500,
  escena_inicial: 1,
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
        nombre: "conejo",
        codigo: `class conejo extends Actor {\n    propiedades = {\n        x: 0,\n        y: 0,\n        imagen: "conejo_parado1",\n\n        figura: "rectangulo",\n        figura_ancho: 50,\n        figura_alto: 100,\n        figura_radio: 50,\n        figura_sin_rotacion: true,\n        figura_dinamica: true,\n        figura_rebote: 0\n    };\n\n    toca_el_suelo = false;\n    pies = null;\n\n    iniciar() {\n        this.crear_animacion("conejo_parado", ["conejo_parado1", "conejo_parado2"], 2);\n        this.crear_animacion("conejo_camina", ["conejo_camina1", "conejo_camina2"], 20);\n        this.crear_animacion("conejo_salta", ["conejo_salta"], 20);\n        this.crear_animacion("conejo_muere", ["conejo_muere"], 1);\n\n        this.estado = "parado";\n        this.pies = this.agregar_sensor(50, 10, 0, -50);\n    }\n\n    actualizar() {\n        if (this.pies.colisiones.length > 0) {\n            this.toca_el_suelo = true;\n        } else {\n            this.toca_el_suelo = false;\n        }\n    }\n\n    parado_iniciar() {\n        this.reproducir_animacion("conejo_parado");\n    }\n\n    parado_actualizar() {\n        if (this.pilas.control.izquierda || this.pilas.control.derecha) {\n            this.estado = "camina";\n        }\n\n        if (this.pilas.control.arriba && this.toca_el_suelo) {\n            this.impulsar(0, 10);\n            this.estado = "salta";\n        }\n\n        if (!this.toca_el_suelo) {\n            this.estado = "salta";\n        }\n    }\n\n    camina_iniciar() {\n        this.reproducir_animacion("conejo_camina");\n    }\n\n    camina_actualizar() {\n        if (this.pilas.control.izquierda) {\n            this.x -= 5;\n            this.espejado = true;\n        }\n\n        if (this.pilas.control.derecha) {\n            this.x += 5;\n            this.espejado = false;\n        }\n\n        if (!this.pilas.control.derecha && !this.pilas.control.izquierda) {\n            this.estado = "parado";\n            return;\n        }\n\n        if (this.pilas.control.arriba && this.toca_el_suelo) {\n            this.impulsar(0, 10);\n            this.estado = "salta";\n        }\n\n        if (!this.toca_el_suelo) {\n            this.estado = "salta";\n        }\n    }\n\n    salta_iniciar() {\n        this.reproducir_animacion("conejo_salta");\n    }\n\n    salta_actualizar() {\n        if (this.pilas.control.izquierda) {\n            this.x -= 5;\n        }\n\n        if (this.pilas.control.derecha) {\n            this.x += 5;\n        }\n\n        if (this.toca_el_suelo) {\n            this.estado = "parado";\n        }\n    }\n\n    cuando_comienza_una_colision(actor) {\n        if (actor.etiqueta === "moneda") {\n            this.pilas.reproducir_sonido("moneda");\n            actor.eliminar();\n        }\n    }\n\n    cuando_se_mantiene_una_colision(actor) {}\n\n    cuando_termina_una_colision(actor) {}\n}`
      },
      {
        nombre: "plataforma",
        codigo: 'class plataforma extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "plataforma",\n        y: 0,\n        figura_ancho: 250,\n        figura_alto: 40,\n        figura_dinamica: false,\n        figura_rebote: 0\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "caja",
        codigo: 'class caja extends Actor {\n    propiedades = {\n        x: 0,\n        y: 0,\n        imagen: "caja",\n        etiqueta: "caja",\n        figura: "rectangulo",\n        figura_ancho: 45,\n        figura_alto: 45,\n        figura_rebote: 0.9\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "pelota",
        codigo: 'class pelota extends Actor {\n    propiedades = {\n        imagen: "pelota",\n        figura: "circulo",\n        figura_radio: 25\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "techo",
        codigo: 'class techo extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "techo",\n        y: +255,\n        figura_ancho: 600,\n        figura_alto: 25,\n        figura_dinamica: false\n    };\n\n    iniciar() {}\n}'
      },
      {
        nombre: "suelo",
        codigo: 'class suelo extends Actor {\n    propiedades = {\n        figura: "rectangulo",\n        imagen: "suelo",\n        y: -250,\n        figura_ancho: 600,\n        figura_alto: 25,\n        figura_dinamica: false\n    };\n\n    iniciar() {}\n}'
      }
    ]
  },
  escenas: [
    {
      nombre: "escena1",
      id: 1,
      camara_x: 0,
      camara_y: 0,
      fondo: "fondo_cielo_1",
      actores: [
        {
          x: 0,
          y: 0,
          z: 0,
          imagen: "conejo",
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
          figura_dinamica: true,
          figura_ancho: 50,
          figura_alto: 100,
          figura_radio: 50,
          figura_sin_rotacion: true,
          figura_rebote: 0,
          figura_sensor: false,
          id: 1143,
          nombre: "conejo"
        },
        {
          x: 0,
          y: -90,
          imagen: "plataforma",
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
          imagen: "caja",
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
          imagen: "pelota",
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
          imagen: "techo",
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
          imagen: "suelo",
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
      fondo: "plano",
      actores: []
    }
  ]
};
