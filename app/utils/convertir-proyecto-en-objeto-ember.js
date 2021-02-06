import EmberObject from "@ember/object";

export default function convertirProyectoEnObjetoEmber(proyecto) {
  let proyectoComoObjetoEmber = EmberObject.create(proyecto);

  proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
    escena.actores = escena.actores.map(a => EmberObject.create(a));

    if (escena.carpetas) {
      escena.carpetas = escena.carpetas.map(carpeta => EmberObject.create(carpeta));
    }

    return EmberObject.create(escena);
  });

  proyectoComoObjetoEmber.codigos.actores = proyecto.codigos.actores.map(codigo_de_actor => {
    return EmberObject.create(codigo_de_actor);
  });

  proyectoComoObjetoEmber.codigos.escenas = proyecto.codigos.escenas.map(codigo_de_escena => {
    return EmberObject.create(codigo_de_escena);
  });

  proyectoComoObjetoEmber.bloques.actores = proyecto.bloques.actores.map(bloque_de_actor => {
    return EmberObject.create(bloque_de_actor);
  });

  proyectoComoObjetoEmber.bloques.escenas = proyecto.bloques.escenas.map(bloque_de_escena => {
    return EmberObject.create(bloque_de_escena);
  });

  return proyectoComoObjetoEmber;
}
