class ceferino extends Actor {
  propiedades = {
    imagen: "imagenes:basicos/invisible"
  };

  iniciar() {
    let scon = this.pilas.game.cache.json.get("ceferino");
    var data = new Data().load(scon);
    var pose = new Pose(data);
    pose.setEntity("entidad");
    pose.setAnim("mueve");

    // Inicia la animación desde el punto inicial
    pose.update(0);
    pose.strike();

    // draw
    pose.object_array.map(data => {
      console.log(data);
      let sprite = this.pilas.modo.add.sprite(0, 0, data.name);
      sprite.setOrigin(data.pivot.x, data.pivot.y);

      sprite.x = data.local_space.position.x + 100;
      sprite.y = data.local_space.position.y + 200;
      sprite.setRotation(-data.world_space.rotation.rad);
    });

    console.log(pose);
    window.pose = pose;

    /*

    let c1 = this.pilas.modo.add.container(0, 0);

    let p1 = this.pilas.modo.add.sprite(200, 200, "p1");
    let p2 = this.pilas.modo.add.sprite(200, 300, "p2");

    this.c1 = c1;
    window.ceferino = this;
    */
  }

  actualizar() {}
}
