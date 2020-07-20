import Service from "@ember/service";
import json_a_string from "../utils/json-a-string";
import string_a_json from "../utils/string-a-json";

export default Service.extend({
  compilar(codigoTypescript, proyecto) {
    let compilerOptions = {};
    let diagnostics = undefined;
    let moduleName = undefined;

    let codigo = ts.transpile(codigoTypescript, compilerOptions, "codigo.js", diagnostics, moduleName);
    let proyecto_serializado = string_a_json(json_a_string(proyecto));

    return { codigo, proyecto_serializado };
  },

  /**
   * La compilación consiste en llevar el código TypeScript a un AST, luego insertar código
   * de seguimiento y por último generar el código JavaScript que se pueda devaluar directamente.
   */
  compilar_proyecto(proyecto) {
    let codigos = proyecto.codigos;
    let codigo_de_escenas = codigos.escenas.map(e => e.codigo).join("\n");
    let codigo_de_actores = codigos.actores.map(e => this.instrumentar_codigo_de_actor(e));
    let codigo_de_proyecto = codigos.proyecto + "\n\n";

    let codigo_completo = codigo_de_proyecto + codigo_de_escenas + codigo_de_actores.join("\n");

    return this.compilar(codigo_completo, proyecto);
  },

  /**
   * Interviene el código de un actor colocando código de seguimiento para saber qué lineas
   * de código se ejecutaron realmente.
   */
  instrumentar_codigo_de_actor({ nombre, codigo }) {
    let ast_instrumentado = this.instrumentar(nombre, codigo);
    let codigo_como_texto = this.convertir_ast_en_texto(ast_instrumentado);

    return codigo_como_texto;
  },

  instrumentar(nombre, código) {
    let sourceFile = ts.createSourceFile(
      "codigo.ts",
      código, // código
      ts.ScriptTarget.ES2015,
      true,
      ts.ScriptKind.TS
    );

    let transformer = context => rootNode => {
      function crear_sentencia_de_instrumentacion(node) {
        let linea = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;

        let funcion = ts.createIdentifier("this.pilas.notificar_traza_de_ejecucion");
        let params = [
          // representa el primer argumento: this.id
          ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("id")),
          // representa la parte número de linea: por ejemplo 3
          ts.createNumericLiteral(`${linea}`)
        ];

        let condicion = ts.createPropertyAccess(ts.createThis(), ts.createIdentifier("pilas"));
        let bloque = ts.createBlock([ts.createCall(funcion, undefined, params)], true); // llamada a la función de instrumnetación

        return ts.createIf(condicion, bloque, undefined);
      }

      function visit(node) {
        /*
          Toda sentencia de la forma:

            2.
            3.   this.impulsar(10, 0);
            4.

          se tiene que convertir en dos sentencias, donde la primera es una llamada
          al recoletor de instrumentación y la segunda es la linea original:

            2.
            3.   this.pilas.notificar_traza_de_ejecucion(this.id, 3);
            4.   this.impulsar(10, 0);
            5.

          Tener en cuenta que el número de linea corresponde al código original y
          no al código que finalmente se genera.

        */
        if (ts.isExpressionStatement(node) || ts.isVariableStatement(node)) {
          let nuevo = crear_sentencia_de_instrumentacion(node);
          return ts.createNodeArray([nuevo, node], false);
        }

        /*
          Todo método tiene que tiene la siguiente forma:

            2.
            3.   iniciar() {
            4.   }
            5.

          se tiene que reemplazar por un código de la forma:

            2.
            3.   iniciar() {
            4.      this.pilas.notificar_traza_de_ejecucion(this.id, 3);
            5.   }
            6.

        */
        if (ts.isMethodDeclaration(node)) {
          let nuevo = crear_sentencia_de_instrumentacion(node);

          node.body = ts.createBlock(
            ts.createNodeArray(
              [
                nuevo, // linea instrumentada
                ...ts.visitEachChild(node.body, visit, context).statements // sentencias originales
              ],
              false
            )
          );

          return node;
        }

        return ts.visitEachChild(node, visit, context);
      }

      return ts.visitNode(rootNode, visit);
    };

    const result = ts.transform(sourceFile, [transformer]);
    const resultado = result.transformed[0];

    return resultado;
  },

  convertir_ast_en_texto(ast) {
    const printer = ts.createPrinter();
    return printer.printFile(ast);
  }
});
