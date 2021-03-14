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

  // FIX: muchos proyectos existentes no se pueden convertir correctamente porque
  // no vienen con bloques. Creo que esto no va a ser un problema grave porque
  // en realidad después de esta función se llama la migración y eso agrega los bloques
  // para los actores y la escenas.
  if (proyecto.bloques) {
    proyectoComoObjetoEmber.bloques.actores = proyecto.bloques.actores.map(bloque_de_actor => {
      return EmberObject.create(bloque_de_actor);
    });

    proyectoComoObjetoEmber.bloques.escenas = proyecto.bloques.escenas.map(bloque_de_escena => {
      return EmberObject.create(bloque_de_escena);
    });
  }

  return proyectoComoObjetoEmber;
}
