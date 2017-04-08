class Etiquetas {
  listado_de_etiquetas: String[];

  constructor() {
    this.listado_de_etiquetas = [];
  }

  /**
   * Agrega una etiqueta a un actor o similar.
   */
  agregar(etiqueta: String) {
    if (!this.tiene_etiqueta(etiqueta)) {
      this.listado_de_etiquetas.push(etiqueta.toLowerCase());
    }
  }

  /**
   * Consulta si la etiqueta existe en el actor o similar.
   */
  tiene_etiqueta(etiqueta: String) {
    return (this.listado_de_etiquetas.indexOf(etiqueta.toLowerCase()) > -1);
  }

  /**
   * Retorna todas las etiquetas como una lista de cadenas de texto.
   */
  obtener_como_lista() {
    return this.listado_de_etiquetas;
  }

  /**
   * Retorna la cantidad de etiquetas.
   */
  obtener_cantidad() {
    return this.listado_de_etiquetas.length;
  }

  /**
   * Elimina una etiqueta de la lista.
   */
  eliminar(etiqueta: String) {
    if (this.tiene_etiqueta(etiqueta)) {
      let index = this.listado_de_etiquetas.indexOf(etiqueta.toLowerCase());
      this.listado_de_etiquetas.splice(index, 1);
    }
  }
  
}
