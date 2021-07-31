import animaciones_iniciales from "./animaciones-iniciales";

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
        codigo: "class escena1 extends Escena {\n    iniciar() {\n\n    }\n\n    actualizar() {\n\n    }\n}"
      }
    ],
    actores: [
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
      ]
    },
  ]
};
