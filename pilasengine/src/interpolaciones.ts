/// <reference path="../libs/greensock.d.ts"/>

declare var Timeline: any;

class Interpolaciones {
  pilas: Pilas;
  time: number;
  tl: any;

  constructor(pilas: Pilas) {
    this.pilas = pilas;

    if (this.pilas.opciones.en_test) {
      this.time = 0;
    } else {
      this.time = window.performance.now();
    }

    //this.tl = new TimelineLite({onUpdate: this.onDrawAll});
  }

  private _agregar_intepolacion(interpolacion: TweenLite) {
    console.log(interpolacion);
  }

  onDrawAll(data:any) {
    console.log(data);
  }

  actualizar() {
    //this.time += 1000.0/60;
    //TWEEN.update(this.time);
  }

  reiniciar() {
    //TWEEN.removeAll();
  }

  crear_interpolacion(actor: Actor, propiedad: string, valor: any, duracion: number, tipo: string, infinito: boolean) {
    var contadorDelay = 0;
    var attrs = {};
    attrs[propiedad] = valor;

    // Se asegura que la demora sea de cada paso de la interpolación.
    //if (valor instanceof Array) {
    //  duracion *= valor.length;
    //}

    if (infinito) {

      if (valor['length']) {
        valor.push(actor[propiedad]);
      }

    } else {

      if (valor['length']) {
        var timeline = new TimelineMax();

        valor.forEach((i: any) => {
          let attr = {};
          attr[propiedad] = i;
          attr['ease'] = Power0['easeNone'];

          timeline.add(new TweenMax(actor, duracion, attr));

          /*
          attrs[propiedad] = i;
          attrs['delay'] = contadorDelay;
          console.log(attrs);
          this._agregar_intepolacion(TweenMax.to(actor, duracion, attrs));
          contadorDelay += duracion;
          */
        });

        //timeline.yoyo();
      } else {
        this._agregar_intepolacion(TweenMax.to(actor, duracion, attrs));
      }
    }


    /*
    //var tween = new TWEEN.Tween(actor).to(attrs, duracion * 1000.0);

    var algoritmos = {
      "lineal": TWEEN.Easing.Linear.None,
      "aceleracion_gradual": TWEEN.Easing.Quadratic.In,
      "desaceleracion_gradual": TWEEN.Easing.Quadratic.InOut,
      "elastico": TWEEN.Easing.Elastic.Out,
    };

    let interporlacion_como_constante = algoritmos[tipo];

    if (!interporlacion_como_constante) {
      throw new Error(`No existe el tipo de interpolación ${tipo}`);
    }

    if (infinito) {
      tween.repeat(Infinity);
    }

    tween.easing(interporlacion_como_constante);




    tween.start();
    */
  }
}
