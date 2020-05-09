import Service from "@ember/service";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";

export default Service.extend({
  compilar(codigoTypescript, proyecto) {
    let compilerOptions = {};

    let codigo = ts.transpile(codigoTypescript, compilerOptions, "codigo.js", /*diagnostics*/ undefined, /*moduleName*/ undefined);
    let proyecto_serializado = string_a_json(json_a_string(proyecto));

    return { codigo, proyecto_serializado };
  },

  compilar_proyecto(proyecto) {
    let codigo_de_escenas = proyecto.codigos.escenas.map(e => e.codigo).join("\n");
    let codigo_de_actores = proyecto.codigos.actores.map(e => e.codigo).join("\n");
    let codigo_de_proyecto = proyecto.codigos.proyecto + "\n\n";

    let codigo_completo = codigo_de_proyecto + codigo_de_escenas + codigo_de_actores;

    return this.compilar(codigo_completo, proyecto);
  }
});
