class Depurador {
  pilas: Pilas;
  modos: any;
  modos_disponibles: any;


  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.modos = [];
    this.modos_disponibles = {
      'fps': ModoFPS
    };
  }

  cuando_dibuja_actor(actor: any) {
    this.modos.forEach((e:any) => {
      e.cuando_dibuja_actor(actor);
    });
  }

  realizar_dibujado() {
    this.modos.forEach((e:any) => {
      e.realizar_dibujado();
    });
  }

  activar_modo(modo: string) {
    var clase = this.modos_disponibles[modo];

    this.modos.push(new clase(this.pilas));

  }

  desactivar_modo(modo: string) {
    console.error(modo);
  }
}
