import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ["pagina", "etiqueta"],
  pagina: 1,
  etiqueta: null,
});
