import EmberObject from "@ember/object";

export default function convertirProyectoEnObjetoEmber(proyecto) {
  let proyectoComoObjetoEmber = EmberObject.create(proyecto);

  proyectoComoObjetoEmber.escenas = proyecto.escenas.map(escena => {
    escena.actores = escena.actores.map(a => EmberObject.create(a));
    return EmberObject.create(escena);
  });

  proyectoComoObjetoEmber.codigos.actores = proyecto.codigos.actores.map(tipo => {
    return EmberObject.create(tipo);
  });

  proyectoComoObjetoEmber.codigos.escenas = proyecto.codigos.escenas.map(tipo => {
    return EmberObject.create(tipo);
  });

  return proyectoComoObjetoEmber;
}
