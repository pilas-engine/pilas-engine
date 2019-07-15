export default function recetasActorControlarAlActorComoSiFueraUnAutomovil() {
  return {
    titulo: "Controlar al actor como si fuera un automóvil",
    icono: "receta_pad",
    para: "actor",
    etiquetas: ["mover", "control"],
    codigo: `
            actualizar() {
               let velocidad = 5;
               let velocidad_para_doblar = 5;

               if (this.pilas.control.arriba) {
                   this.avanzar(this.rotacion, velocidad)
               }

               if (this.pilas.control.izquierda) {
                   this.rotacion += velocidad_para_doblar;
               }

               if (this.pilas.control.derecha) {
                   this.rotacion -= velocidad_para_doblar;
               }
           }
        `
  };
}
