import Ember from "ember";
import { task, timeout } from "ember-concurrency";

const serialport = requireNode("serialport");
const five = requireNode("johnny-five");

export default Ember.Component.extend({
  conectado: false,
  dispositivos: [],

  tareaListarDispositivos: task(function*() {
    while (true) {
      console.log("tick");

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
            this.set("conectado", true);
          }
        }
      });

      yield timeout(4000);
    }
  }),

  didInsertElement() {
    this.get("tareaListarDispositivos").perform({});

    var board = new five.Board({
      repl: false,
      debug: true
    });

    this.set("board", board);
    this.set("five", five);

    board.on("ready", function() {
      console.log("Se cargó el dispositivo correctamente.");
    });

    board.on("connect", function(event) {
      console.log("connect", event);
    });

    board.on("warn", function(event) {
      console.log("warn", event);
    });

    board.on("fail", function(event) {
      console.log("fail", event);
    });

    board.on("exit", function() {
      console.log("Board closed");
      //led.off();
    });
    /*
    */
  },
  actions: {
    prenderLed() {
      let five = this.get("five");
      var led = new five.Led(13);
      led.on();
    },

    apagarLed() {
      let five = this.get("five");
      var led = new five.Led(13);
      led.off();
    }
  }
});
