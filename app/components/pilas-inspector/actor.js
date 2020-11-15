import Component from "@ember/component";

export default Component.extend({
  didReceiveAttrs() {
    let propiedades = [];

    // Solo los actores texto pueden cambiar de mensaje y solamente los
    // actores normales pueden cambiar de imagen.
    propiedades.pushObject({
      tipo: "interruptor",
      propiedad: "activo",
      etiqueta: "actor.active"
    });

    propiedades.pushObject({
      tipo: "cadena",
      propiedad: "etiqueta",
      etiqueta: "actor.label"
    });

    if (this.get("instancia_seleccionada.es_texto")) {
      propiedades.pushObject({
        tipo: "cadena",
        propiedad: "texto",
        etiqueta: "actor.text"
      });

      propiedades.pushObject({
        tipo: "combo",
        propiedad: "fuente",
        etiqueta: "actor.font",
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
        filtroPropuesto: "redimensionable",
        etiqueta: "actor.background"
      });
    } else {
      propiedades.pushObject({
        tipo: "imagen",
        propiedad: "imagen",
        etiqueta: "actor.image"
      });
    }

    propiedades.addObjects([
      {
        tipo: "separador",
        nombre: "Posición",
        etiqueta: "actor.position"
      },
      {
        tipo: "numero",
        propiedad: "x",
        intensidad: 1,
        etiqueta: "actor.x"
      },
      {
        tipo: "numero",
        propiedad: "y",
        intensidad: 1,
        etiqueta: "actor.y"
      },
      {
        tipo: "numero",
        propiedad: "z",
        intensidad: 1,
        etiqueta: "actor.z"
      },

      {
        tipo: "separador",
        nombre: "Comportamientos iniciales",
        etiqueta: "actor.behaviors"
      },
      {
        tipo: "habilidades",
        propiedad: "habilidades",
        etiqueta: "actor.ablities"
      },

      {
        tipo: "separador",
        nombre: "Transformaciones",
        etiqueta: "actor.transformations"
      },
      {
        tipo: "numero",
        propiedad: "escala_x",
        intensidad: 0.01,
        etiqueta: "actor.scale.x"
      },
      {
        tipo: "numero",
        propiedad: "escala_y",
        intensidad: 0.01,
        etiqueta: "actor.scale.y"
      },
      {
        tipo: "numero",
        propiedad: "rotacion",
        intensidad: 1,
        etiqueta: "actor.rotation"
      },
      {
        tipo: "numero",
        propiedad: "transparencia",
        intensidad: 1,
        min: 0,
        max: 100,
        etiqueta: "actor.transparency"
      },
      {
        tipo: "numero",
        propiedad: "centro_x",
        intensidad: 0.1,
        etiqueta: "actor.center.x"
      },
      {
        tipo: "numero",
        propiedad: "centro_y",
        intensidad: 0.1,
        etiqueta: "actor.center.y"
      },
      {
        tipo: "interruptor",
        propiedad: "espejado",
        nombreCorto: "Espejado Horizontal",
        etiqueta: "actor.flip.x"
      },
      {
        tipo: "interruptor",
        propiedad: "espejado_vertical",
        nombreCorto: "Espejado Vertical",
        etiqueta: "actor.flip.y"
      },

      {
        tipo: "separador",
        nombre: "Simulación física",
        etiqueta: "actor.physical.simulation"
      },
      {
        tipo: "combo",
        propiedad: "figura",
        etiqueta: "actor.shape.title",
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
        max: 1000,
        etiqueta: "actor.shape.width"
      },
      {
        tipo: "numero",
        propiedad: "figura_alto",
        nombreCorto: "Alto",
        intensidad: 1,
        min: 1,
        max: 1000,
        etiqueta: "actor.shape.height"
      },
      {
        tipo: "numero",
        propiedad: "figura_radio",
        nombreCorto: "Radio",
        intensidad: 1,
        min: 1,
        max: 1000,
        etiqueta: "actor.shape.ratio"
      },
      {
        tipo: "numero",
        propiedad: "figura_rebote",
        nombreCorto: "Rebote",
        intensidad: 0.01,
        min: 0,
        max: 1.5,
        etiqueta: "actor.shape.bounce"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_dinamica",
        nombreCorto: "Dinámica",
        etiqueta: "actor.shape.dynamic"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sin_rotacion",
        nombreCorto: "Sin rotación",
        etiqueta: "actor.shape.no.rotation"
      },
      {
        tipo: "interruptor",
        propiedad: "figura_sensor",
        etiqueta: "actor.shape.is.sensor"
      }
    ]);

    propiedades.addObjects([
      {
        tipo: "separador",
        nombre: "Sensores",
        etiqueta: "actor.sensors"
      },
      {
        tipo: "sensores",
        propiedad: "sensores",
        etiqueta: "actor.sensors"
      }
    ]);

    propiedades.addObjects([
      {
        tipo: "separador",
        nombre: "Lasers",
        etiqueta: "actor.lasers"
      },
      {
        tipo: "lasers",
        propiedad: "lasers",
        etiqueta: "actor.lasers"
      }
    ]);

    this.set("propiedades", propiedades);
  }
});
