/// <reference path="habilidades/rotar-constantemente"/>
/// <reference path="habilidades/arrastrable"/>
/// <reference path="habilidades/mover-con-el-teclado"/>
/// <reference path="habilidades/seguir-al-mouse"/>
/// <reference path="habilidades/seguir-al-mouse-lentamente"/>
/// <reference path="habilidades/seguir-al-teclado"/>
/// <reference path="habilidades/oscilar-verticalmente"/>
/// <reference path="habilidades/oscilar-rotacion"/>
/// <reference path="habilidades/oscilar-transparencia"/>

class Habilidades {
  pilas: Pilas;
  _habilidades: any[];

  constructor(pilas) {
    this.pilas = pilas;
    this._habilidades = [];

    this.vincular("rotar constantemente", RotarConstantemente);
    this.vincular("arrastrable", Arrastrable);
    this.vincular("mover con el teclado", MoverConElTeclado);
    this.vincular("seguir al mouse", SeguirAlMouse);
    this.vincular("seguir al mouse lentamente", SeguirAlMouseLentamente);
    this.vincular("seguir al teclado", SeguirAlTeclado);
    this.vincular("oscilar verticalmente", OscilarVerticalmente);
    this.vincular("oscilar rotacion", OscilarRotacion);
    this.vincular("oscilar transparencia", OscilarTransparencia);
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
    let habilidad = this._habilidades.find(function(habilidad) {
      return habilidad.nombre === nombre;
    });

    if (!habilidad) {
      this._habilidades.push({
        nombre: nombre,
        clase: clase
      });
    } else {
      habilidad.clase = clase;
    }
  }
}
