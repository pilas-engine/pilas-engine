/// <reference path="habilidades/rotar-constantemente"/>
/// <reference path="habilidades/arrastrable"/>

class Habilidades {
  pilas: Pilas;
  _habilidades: any[];

  constructor(pilas) {
    this.pilas = pilas;
    this._habilidades = [];

    this.vincular("rotar constantemente", RotarConstantemente);
    this.vincular("arrastrable", Arrastrable);
  }

  buscar(habilidad: String) {
    let lista = this.generar_lista_de_similitudes(habilidad);
    lista = lista.sort((a, b) => {
      if (a.similitud > b.similitud) {
        return 1;
      } else {
        return -1;
      }
    });

    return lista[0].habilidad.clase;
  }

  generar_lista_de_similitudes(habilidad) {
    return this._habilidades.map(h => {
      return {
        similitud: this.pilas.utilidades.obtener_similaridad(
          h.nombre,
          habilidad
        ),
        habilidad: h
      };
    });
  }

  listar() {
    return this._habilidades.map(h => h.nombre);
  }

  vincular(nombre: string, clase: any) {
    let encontrado = this._habilidades.find(function(habilidad) {
      return habilidad.nombre === nombre;
    });

    if (!encontrado) {
      this._habilidades.push({
        nombre: nombre,
        clase: clase
      });
    } else {
      console.warn(
        `No se vinculó la clase ${nombre} porque ya estaba vinculada con anterioridad.`
      );
    }
  }
}
