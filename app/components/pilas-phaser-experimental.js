import Ember from "ember";

export default Ember.Component.extend({
  codigo: `
    var playState = {
        init: function () {
            //Se llama cuando se inicia el estado
        },
        preload: function () {
            //Se cargan Imagenes y archivos de recurso
        },
        create: function () {
            //Se crea el personaje, los enemigos, los sonidos, el fondo del juego, etc
        },
        update: function () {
            //Logica del Juego como los movimientos, las colisiones, el movimiento del personaje, etc
        },
        render: function () {
            //Depurar lo que se renderiza
            //this.game.debug.body(this.player);
        },
        pause: function () {
            //Cuando el juego es pausado
        },
        shutdown: function () {
            //Cuando se sale del estado
        }
    };

    var game = new Phaser.Game(320, 240, Phaser.AUTO, 'game');
    game.state.add('play', playState);
    game.state.start('play');
    
`,

  didInsertElement() {
    let iframe = this.$("iframe")[0];
    let codigo = this.get("codigo");

    iframe.onload = () => {
      iframe.contentWindow.eval(codigo);
    };
  }
});
