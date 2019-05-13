import Component from "@ember/component";
/*
import { task, timeout } from "ember-concurrency";
let serialport = {};
let five = {};

if (window.enElectron) {
  serialport = requireNode("serialport");
  five = requireNode("johnny-five");
}
*/

export default Component.extend({
  conectado: false,
  dispositivos: null,

  haConectadoAlgunaVez: false,
  mostrarErrorDeReConexion: false,

  /*
  tareaListarDispositivos: task(function*() {
    while (true) {
      serialport.list((err, ports) => {
        let dispositivos = ports.map(e => {
          return {
            comName: e.comName,
            manufacturer: e.manufacturer,
            esArduino: /Arduino/.test(e.manufacturer)
          };
        });

        this.set("dispositivos", dispositivos);

        this.set("conectado", false);

        for (let i = 0; i < dispositivos.length; i++) {
          if (/Arduino/.test(dispositivos[i].manufacturer)) {
            if (this.haConectadoAlgunaVez) {
              this.set("mostrarErrorDeReConexion", true);
            }

            this.set("conectado", true);
            this.set("haConectadoAlgunaVez", true);
          }
        }
      });

      yield timeout(4000);
    }
  }),
  */

  didInsertElement() {
    this.set("dispositivos", []);

    /*
    if (window.enElectron) {
      this.tareaListarDispositivos.perform({});

      var board = new five.Board({
        repl: false,
        debug: false
      });

      this.set("board", board);
      this.set("five", five);

      board.on("ready", function() {
        console.log("Se cargó el dispositivo correctamente.");
      });

      board.on("warn", function(event) {
        console.log("warn", event);
      });

      board.on("fail", function(event) {
        console.log("fail", event);
      });

      board.on("error", function(event) {
        alert(event.message);
      });

      board.on("exit", function() {
        console.log("Board closed");
      });
    }
    */
  },
  actions: {
    /*
    prenderLed() {
      let five = this.five;
      var led = new five.Led(13);
      led.on();
    },

    apagarLed() {
      let five = this.five;
      var led = new five.Led(13);
      led.off();
    }
    */
  }
});
