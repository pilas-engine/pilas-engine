import Service from "@ember/service";

export default Service.extend({
  compilar(codigoTypescript) {
    let compilerOptions = {};

    let codigo = ts.transpile(codigoTypescript, compilerOptions, "codigo.js", /*diagnostics*/ undefined, /*moduleName*/ undefined);

    return { codigo: codigo };
  },

  compilar_proyecto(proyecto) {
    let codigo_de_escenas = proyecto.codigos.escenas.map(e => e.codigo).join("\n");
    let codigo_de_actores = proyecto.codigos.actores.map(e => e.codigo).join("\n");

    let codigo_completo = codigo_de_escenas + codigo_de_actores;

    return this.compilar(codigo_completo);
  }
});
