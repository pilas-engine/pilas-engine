import Component from "@ember/component";

export default Component.extend({
  didReceiveAttrs() {
    let propiedades = [];

    // Solo los actores texto pueden cambiar de mensaje y solamente los
    // actores normales pueden cambiar de imagen.
    propiedades.pushObject({
      tipo: "interruptor",
      propiedad: "activo",
      nombreCorto: "Activo"
    });

    propiedades.pushObject({
      tipo: "cadena",
      propiedad: "etiqueta"
    });

    if (this.get("instancia_seleccionada.es_texto")) {
      propiedades.pushObject({
        tipo: "cadena",
        propiedad: "texto"
      });

      propiedades.pushObject({
        tipo: "combo",
        propiedad: "fuente",
        opciones: [
          {
            valor: "color-negro",
            texto: "color-negro"
          },
          {
            valor: "color-blanco",
            texto: "color-blanco"
          },
          {
            valor: "color-blanco-con-sombra-chico",
            texto: "color-blanco-con-sombra-chico"
          },
          {
            valor: "color-blanco-con-sombra-medio",
            texto: "color-blanco-con-sombra-medio"
          },
          {
            valor: "color-blanco-con-sombra-grande",
            texto: "color-blanco-con-sombra-grande"
          },
          {
            valor: "color-blanco-con-sombra",
            texto: "color-blanco-con-sombra"
          },
          {
            valor: "pixel-color-negro",
            texto: "pixel-color-negro"
          },
          {
            valor: "pixel-color-blanco",
            texto: "pixel-color-blanco"
          }
        ]
      });

      propiedades.pushObject({
        tipo: "imagen",
        propiedad: "fondo",
        filtroPropuesto: "redimensionable"
      });
    } else {
      propiedades.pushObject({
        tipo: "imagen",
        propiedad: "imagen"
      });
    }

    propiedades.addObjects([
      {
        tipo: "separador",
        nombre: "Posición"
      },
      {
        tipo: "numero",
        propiedad: "x",
        intensidad: 1
      },
      {
        tipo: "numero",
        propiedad: "y",
        intensidad: 1
      },
      {
        tipo: "numero",
        propiedad: "z",
        intensidad: 1
      },

      {
        tipo: "separador",
        nombre: "Comportamientos iniciales"
      },
      {
        tipo: "habilidades",
        propiedad: "habilidades"
      },

      {
        tipo: "separador",
        nombre: "Transformaciones"
      },
      {
        tipo: "numero",
        propiedad: "escala_x",
        intensidad: 0.01
      },
      {
        tipo: "numero",
        propiedad: "escala_y",
        intensidad: 0.01
      },
      {
        tipo: "numero",
        propiedad: "rotacion",
        intensidad: 1
      },
      {
        tipo: "numero",
        propiedad: "transparencia",
        intensidad: 1,
        min: 0,
        max: 100
      },
      {
        tipo: "numero",
        propiedad: "centro_x",
        intensidad: 0.1
      },
      {
        tipo: "numero",
        propiedad: "centro_y",
        intensidad: 0.1
      },
      {
        tipo: "interruptor",
        propiedad: "espejado",
        nombreCorto: "Espejado Horizontal"
      },
      {
        tipo: "interruptor",
        propiedad: "espejado_vertical",
        nombreCorto: "Espejado Vertical"
      },

      {
        tipo: "separador",
        nombre: "Simulación física"
      },
      {
        tipo: "combo",
        propiedad: "figura",
        opciones: [
          {
            valor: "",
            texto: "ninguna"
          },
          {
            valor: "circulo",
            texto: "círculo"
          },
          {
            valor: "rectangulo",
            texto: "rectángulo"
          }
        ]
      },
      {
        tipo: "numero",
        propiedad: "figura_ancho",
        nombreCorto: "Ancho",
        intensidad: 1,
        min: 1,
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_alto",
        nombreCorto: "Alto",
        intensidad: 1,
        min: 1,
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_radio",
        nombreCorto: "Radio",
        intensidad: 1,
        min: 1,
        max: 1000
      },
      {
        tipo: "numero",
        propiedad: "figura_rebote",
        nombreCorto: "Rebote",
        intensidad: 0.01,
        min: 0,
        max: 1.5
      },
      {
        tipo: "interruptor",
        propiedad: "figura_dinamica",
        nombreCorto: "Dinámica"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sin_rotacion",
        nombreCorto: "Sin rotación"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sensor",
        nombreCorto: "¿Es sensor?"
      }
    ]);

    propiedades.addObjects([
    {
      tipo: "separador",
      nombre: "Sensores"
    },
    {
      tipo: "sensores",
      propiedad: "sensores",
    }
  ]);

    this.set("propiedades", propiedades);
  }
});
