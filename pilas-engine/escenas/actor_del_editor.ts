class ActorDelEditor {
  actor: Phaser.GameObjects.Sprite;

  constructor(funcion, datos) {
    let actor = funcion.call(datos.x, datos.y, datos.imagen);
  }
}
