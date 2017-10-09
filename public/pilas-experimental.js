var HOST = "file://";

if (window.location.host) {
  HOST = "http://" + window.location.host;
}

var editorState = {
  entidades: null,
  sprites: null,

  init: function(data) {
    this.entidades = data.entidades;
    this.sprites = {};
  },

  preload: function() {
    this.notificar_al_editor();
    this.game.time.events.loop(1000, this.notificar_al_editor, this);
  },

  crear_texto_con_posicion_del_mouse() {
    var style = {
      font: "16px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "top"
    };

    text = this.game.add.text(0, 5, " Mouse: (0, 0) ", style);
    text.setShadow(1, 1, "rgba(0, 0, 0, 0.5)", 3);
    this.text = text;
  },

  create: function() {
    this.crear_texto_con_posicion_del_mouse();

    this.game.stage.backgroundColor = "5b5";
  },

  /* Se invoca automáticamente con regularidad para
   * enviar toda la información de las entidades y el mouse
   * al editor.
   */
  notificar_al_editor() {
    let x = this.game.input.mousePointer.x;
    let y = this.game.input.mousePointer.y;

    window.parent.postMessage(
      { tipo: "movimiento_del_mouse", x: x, y: y },
      HOST
    );

    window.parent.postMessage(
      { tipo: "entidades", entidades: this.entidades },
      HOST
    );
  },

  update: function() {
    let x = this.game.input.mousePointer.x;
    let y = this.game.input.mousePointer.y;

    this.text.text = "  Mouse: (" + x + ", " + y + ") ";

    // Actualiza las entidades
    this.entidades = this.entidades.map(e => {
      var sprite = null;

      if (!this.sprites[e.id]) {
        console.log("Creando sprite cache para " + e.id, e);
        this.sprites[e.id] = this.game.add.sprite(e.x, e.y, e.imagen);

        sprite = this.sprites[e.id];
        sprite.pivot.x = e.centro_x;
        sprite.pivot.y = e.centro_y;

        sprite.inputEnabled = true;
        sprite.input.enableDrag();
      } else {
        sprite = this.sprites[e.id];
      }

      e.x = sprite.x;
      e.y = sprite.y;

      return e;
    });
  }
};

var debugState = {
  sprites: {},
  entidades: [],

  init: function() {},

  preload: function() {},

  create: function() {
    this.entidades = [];
    this.sprites = {};

    this.graphics = this.game.add.graphics(0, 0);
    game.stage.backgroundColor = "fbb";
  },

  update: function() {
    this.graphics.clear();
    this.game.world.bringToTop(this.graphics);

    // Actualiza las entidades
    this.entidades.map(e => {
      if (!this.sprites[e.id]) {
        console.log("Creando sprite cache para " + e.id, e);
        this.sprites[e.id] = this.game.add.sprite(e.x, e.y, e.imagen);
      }

      sprite = this.sprites[e.id];
      sprite.pivot.x = e.centro_x;
      sprite.pivot.y = e.centro_y;
      sprite.x = e.x;
      sprite.y = e.y;

      this._dibujar_punto_de_control(e.x, e.y);
    });

    this.game.debug.text("Hay " + this.entidades.length + " entidades", 10, 20);
  },

  _dibujar_punto_de_control: function(x, y) {
    let d = 5;
    let d2 = 4;

    this.graphics.lineStyle(4, 0x000000);
    this.graphics.moveTo(x - d, y - d);
    this.graphics.lineTo(x + d, y + d);

    this.graphics.moveTo(x + d, y - d);
    this.graphics.lineTo(x - d, y + d);

    this.graphics.lineStyle(2, 0xffffff);
    this.graphics.moveTo(x - d2, y - d2);
    this.graphics.lineTo(x + d2, y + d2);

    this.graphics.moveTo(x + d2, y - d2);
    this.graphics.lineTo(x - d2, y + d2);
  }
};

var playState = {
  // cache de sprites
  sprites: {},
  entidades: null,

  habilidades: {
    "seguir puntero": function(e) {
      e.x = e.x + 1;

      if (e.x > 600) {
        e.x = -100;
      }
    }
  },

  init: function(data) {
    this.entidades = data.entidades;
    this.sprites = {};
  },

  preload: function() {},

  create: function() {
    this.graphics = this.game.add.graphics(0, 0);
    this.game.stage.backgroundColor = "9b5";
  },

  update: function() {
    this.graphics.clear();
    this.game.world.bringToTop(this.graphics);
    //guardar();

    // Elimina entidades marcadas para eliminar.
    this.entidades = this.entidades.filter(e => {
      if (e.eliminado) {
        if (this.sprites[e.id]) {
          this.sprites[e.id].destroy();
          delete this.sprites[e.id];
        }

        return false;
      }

      return true;
    });

    // Actualiza las entidades
    this.entidades.map(e => {
      if (!this.sprites[e.id]) {
        console.log("Creando sprite cache para " + e.id, e);
        this.sprites[e.id] = this.game.add.sprite(e.x, e.y, e.imagen);

        if (e.fisica) {
          this.game.physics.p2.enable(this.sprites[e.id], true);
          this.sprites[e.id].body.restitution = 1;

          if (e.fisica_circulo) {
            this.sprites[e.id].body.setCircle(e.fisica_radio || 30);
          }
        }
      }

      if (e.habilidades) {
        e.habilidades.map(h => {
          this.habilidades[h.nombre](e);
        });
      }

      sprite = this.sprites[e.id];

      if (sprite.body) {
        sprite.body.static = e.estatico;
      }

      if (sprite.body) {
        if (sprite.body.static) {
          sprite.body.x = e.x;
          sprite.body.y = e.y;
        } else {
          e.x = sprite.body.x;
          e.y = sprite.body.y;
        }
      } else {
        sprite.x = e.x;
        sprite.y = e.y;
      }

      sprite.pivot.x = e.centro_x;
      sprite.pivot.y = e.centro_y;

      this._dibujar_punto_de_control(e.x, e.y);
    });

    var texto = "..";

    if (this.entidades.length === 0) {
      texto = "No hay entidades";
    } else {
      if (this.entidades.length === 1) {
        texto = "Hay una sola entidad";
      } else {
        texto = `Hay ${this.entidades.length} entidades`;
      }
    }

    this.game.debug.text("texto");
  },

  _dibujar_punto_de_control: function(x, y) {
    let d = 5;
    let d2 = 4;

    this.graphics.lineStyle(4, 0x000000);
    this.graphics.moveTo(x - d, y - d);
    this.graphics.lineTo(x + d, y + d);

    this.graphics.moveTo(x + d, y - d);
    this.graphics.lineTo(x - d, y + d);

    this.graphics.lineStyle(2, 0xffffff);
    this.graphics.moveTo(x - d2, y - d2);
    this.graphics.lineTo(x + d2, y + d2);

    this.graphics.moveTo(x + d2, y - d2);
    this.graphics.lineTo(x - d2, y + d2);
  },

  render: function() {},

  pause: function() {
    //Cuando el juego es pausado
  },

  shutdown: function() {
    //Cuando se sale del estado
  }
};

function preload() {
  game.load.image("ember", "imagenes/ember.png");
  game.load.image("pelota", "imagenes/pelota.png");
}

/*
// Toma un snapshot de la escena
function guardar() {
  imagenGuardada = JSON.parse(JSON.stringify(playState.entidades));
  historia.push(imagenGuardada);
}

// Restaura la última imagen guardada
function restaurar() {
  if (historia.length < 1) {
    console.warn("No quedan snapshots para restaurar");
  } else {
    // Si está en la simulación real, cambia a la escena maquina del tiempo
    if (game.state.current === "play") {
      game.state.start("maquina del tiempo");
    }

    debugState.entidades = historia.pop();
    console.log("restaurando entidades, quedan " + historia.length);
  }
}
*/

function emitirMensajeAlEditor(nombre, datos) {
  datos = datos || {};
  datos.tipo = nombre;
  window.parent.postMessage(datos, HOST);
}

function create() {
  this.stage.disableVisibilityChange = true;

  game.state.add("editorState", editorState);
  game.state.add("playState", playState);

  emitirMensajeAlEditor("finaliza_carga_de_recursos", {});

  /*

  // Aplica límites al escenario para las simulaciones físicas.
  game.world.setBounds(0, 0, 300, 300);
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 400;
  game.physics.p2.restitution = 0.9;

  // evita que phaser detenga la escena si pierde el foco de la ventana.

  // Carga la escena principal
  // game.state.start('play');

  // Carga la escena del editor
  game.state.start('editor');

  // carga la máquina del tiempo
  game.state.add('maquina del tiempo', debugState);


  p = crear("pelota");
  p.imagen = "pelota";
  p.fisica = true;
  p.estatico = true;
  p.y = 310;

  p.habilidades.push({
    nombre: 'seguir puntero'
  })

  p = crear("pelota");
  p.imagen = "pelota";
  p.fisica = true;

  p = crear("pelota");
  p.imagen = "pelota";
  p.fisica = true;

  p.fisica_circulo = true;
  p.fisica_radio = 25;
  p.x = 100;
  */
}

window.addEventListener(
  "message",
  e => {
    console.log("Desde iframe: " + e.data.tipo, e);

    if (e.origin != HOST) {
      return;
    }

    if (e.data.tipo === "define_escena") {
      game.state.start(e.data.nombre, true, false, {
        entidades: e.data.entidades
      });
    }
  },
  false
);

// Inicialización
var game = new Phaser.Game(500, 500, Phaser.AUTO, "game", {
  preload: preload,
  create: create
});

function crear(nombre) {
  let id = Math.round(Math.random() * 10000000);
  let entidad = {
    id: nombre + "_" + id,
    nombre: nombre,
    x: 50,
    y: 50,
    imagen: "ember",
    eliminado: false,
    centro_x: 0,
    centro_y: 0,
    fisica: false,
    estatico: false,
    habilidades: []
  };

  playState.entidades.push(entidad);
  return entidad;
}

function obtener(nombre) {
  items = playState.entidades.filter(e => e.nombre === nombre);

  if (items) {
    return items[0];
  } else {
    throw new Error("No existe una entidad con el nombre: " + nombre);
  }
}

window.game = game;

function obtener_entidades() {
  return game.state.getCurrentState().entidades;
}

/*
let contexto = {
  game: game,
  //obtener: obtener,
  //crear: crear,
  //playState: playState
  //guardar: guardar,
  //restaurar: restaurar
};

contexto;
*/
