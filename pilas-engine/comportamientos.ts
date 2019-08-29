/// <reference path="comportamientos/aparecer"/>
/// <reference path="comportamientos/desaparecer"/>
/// <reference path="comportamientos/eliminar"/>
/// <reference path="comportamientos/mover"/>

class Comportamientos {
  pilas: Pilas;
  _comportamientos: any[];

  constructor(pilas) {
    this.pilas = pilas;
    this._comportamientos = [];

    this.vincular("desaparecer", ComportamientoDesaparecer);
    this.vincular("aparecer", ComportamientoAparecer);
    this.vincular("eliminar", ComportamientoEliminar);
    this.vincular("mover", ComportamientoMover);
  }

  buscar(comportamiento: String) {
    let lista = this.generar_lista_de_similitudes(comportamiento);
    lista = lista.sort((a, b) => {
      if (a.similitud > b.similitud) {
        return 1;
      } else {
        return -1;
      }
    });

    return lista[0].comportamiento.clase;
  }

  generar_lista_de_similitudes(comportamiento) {
    return this._comportamientos.map(h => {
      return {
        similitud: this.pilas.utilidades.obtener_similaridad(h.nombre, comportamiento),
        comportamiento: h
      };
    });
  }

  listar() {
    return this._comportamientos.map(h => h.nombre);
  }

  vincular(nombre: string, clase: any) {
    let encontrado = this._comportamientos.find(function(comportamiento) {
      return comportamiento.nombre === nombre;
    });

    if (!clase || !nombre) {
      throw new Error(`Para vincular un comportamiento tiene que especificar nombre y clase, envió nombre=${nombre} y clase=${clase}`);
    }

    if (!encontrado) {
      this._comportamientos.push({
        nombre: nombre,
        clase: clase
      });
    } else {
      console.warn(`No se vinculó la clase ${nombre} porque ya estaba vinculada con anterioridad.`);
    }
  }

  validar_si_existe(nombre: string) {
    let todos_los_nombres = this._comportamientos.map(c => c.nombre);

    if (todos_los_nombres.indexOf(nombre) === -1) {
      let alternativa = this.pilas.utilidades.obtener_mas_similar(nombre, todos_los_nombres);
      throw new Error(`No existe un comportamiento llamado "${nombre}", ¿quisiste decir "${alternativa}" o te faltó vincularlo?`);
    }
  }
}
