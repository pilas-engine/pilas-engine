/// <reference path="-habilidad"/>

class SeguirAlTeclado extends Habilidad {
  actor_con_teclado: Actor;
  
  iniciar() {
    let habilidad_teclado = this.pilas.habilidades.buscar("mover con el teclado").name;
    let actores_con_teclado = this.pilas.obtener_actores().filter( a =>
        a.tiene_habilidad(habilidad_teclado)
    );
    if(actores_con_teclado) {
      this.actor_con_teclado = actores_con_teclado[0];
    }else{
      this.actor_con_teclado = null;
    }
  }

  limitar(v: number): number {
    return Math.max(-5, Math.min(5,v));
  }

  actualizar() {
    if (this.actor_con_teclado) {
      let destino_x = this.actor_con_teclado.x;
      let destino_y = this.actor_con_teclado.y;

      this.actor.x += this.limitar((destino_x - this.actor.x) / 10);
      this.actor.y += this.limitar((destino_y - this.actor.y) / 10);
    }
  }
}
