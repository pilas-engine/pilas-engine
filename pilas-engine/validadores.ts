/**
 * Agrupa todos los validadores de datos o cadenas de texto.
 */
class Validadores {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  /**
   * Emite una excepción si el valor enviado como parámetro no es un número.
   *
   * El parmámetro 'mensaje_de_contexto' sirve para mejorar el mensaje de
   * error. Debería usarse un verbo como 'definir el valor x' o cualquier frase
   * similar para que el usuario sepa 'cuándo' se produjo la validación.
   */
  solo_numero_o_interpolacion(valor, mensaje_de_contexto: string = undefined) {

    function es_un_numero(x) {
      return (!isNaN(x));
    }

    if (es_un_numero(valor)) {
      return true;
    }

    if (Array.isArray(valor)) {
      if (valor.every(es_un_numero)) {
        return true;
      }
    }

    if (mensaje_de_contexto) {
      throw new Error(`Solo se permite asignar un número o una lista de números, falló al ${mensaje_de_contexto}, se quiso asignar el valor ${valor}.`)
    }

    throw new Error("Solo se permite asignar un número o una lista de números.");

  }
}
