import Service from "@ember/service";

export default Service.extend({
  compilar(codigoTypescript) {
    let compilerOptions = {};

    let codigo = ts.transpile(codigoTypescript, compilerOptions, "codigo.js", /*diagnostics*/ undefined, /*moduleName*/ undefined);

    return { codigo: codigo };
  }
});
