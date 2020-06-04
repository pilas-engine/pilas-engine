import { Promise } from "rsvp";

export default function obtener_contenido_en_base_64(archivo, extension) {
  function corregir_nombre_del_archivo(nombre, extension) {
    let resultado = nombre.toLowerCase();

    extension.split("|").map(extension => {
      resultado = resultado.replace(`.${extension}`, "");
    });

    return resultado;
  }

  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.onload = function() {
      resolve({
        nombre: corregir_nombre_del_archivo(archivo.name, extension),
        contenido: reader.result
      });
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsDataURL(archivo);
  });
}
