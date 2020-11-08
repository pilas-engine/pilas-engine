interface Intersección {
  actor: Actor;
  body: any;
  distancia: number;
  x: number;
  y: number;
}

class Laser {
  actor: Actor;
  nombre: string;
  rotacion: number;
  longitud: number;

  constructor(actor: Actor, nombre: string, rotacion: number, longitud: number) {
    this.actor = actor;
    this.nombre = nombre;
    this.rotacion = rotacion;
    this.longitud = longitud;
  }

  obtener_colisiones() {
    let pilas = this.actor.pilas;
    let angulo = pilas.utilidades.convertir_angulo_a_radianes(this.rotacion);
    let x1 = this.actor.x;
    let y1 = this.actor.y;
    let x2 = x1 + Math.cos(angulo) * this.longitud;
    let y2 = y1 + Math.sin(angulo) * this.longitud;

    return pilas.laser(this.actor, x1, y1, x2, y2);
  }

  distancia_al_actor_mas_cercado() {
    let colisiones = this.obtener_colisiones();

    if (colisiones.length > 0) {
      return colisiones[0].distancia;
    } else {
      return this.longitud;
    }
  }

  distancia_al_actor_con_etiqueta(etiqueta: string) {
    let colisiones = this.obtener_colisiones();

    colisiones = colisiones.filter(col => {
      return col.actor.tiene_etiqueta(etiqueta);
    });

    if (colisiones.length > 0) {
      return colisiones[0].distancia;
    } else {
      return this.longitud;
    }
  }

  colisiona_con_un_actor_de_etiqueta(etiqueta: string) {
    let colisiones = this.obtener_colisiones();

    colisiones = colisiones.filter(col => {
      return col.actor.tiene_etiqueta(etiqueta);
    });

    return colisiones.length > 0;
  }

  obtener_actor_mas_cercano() {
    let colisiones = this.obtener_colisiones();

    if (colisiones.length > 0) {
      return colisiones[0].actor;
    } else {
      return null;
    }
  }
}

function raycast(bodies: any, start: any, end: any, sort = true) {
  start = vec2.fromOther(start);
  end = vec2.fromOther(end);

  // @ts-ignore
  var query = Phaser.Physics.Matter.Matter.Query.ray(bodies, start, end);
  var cols = [];
  var raytest = new ray(start, end);

  for (var i = query.length - 1; i >= 0; i--) {
    var bcols = ray.bodyCollisions(raytest, query[i].body);
    for (var k = bcols.length - 1; k >= 0; k--) {
      cols.push(bcols[k]);
    }
  }

  if (sort) {
    cols.sort(function(a, b) {
      return a.point.distance(start) - b.point.distance(start);
    });
  }

  return cols;
}

class raycol {
  body: any;
  point: any;
  normal: any;
  verts: any;

  constructor(body: any, point: any, normal: any, verts: any) {
    this.body = body;
    this.point = point;
    this.normal = normal;
    this.verts = verts;
  }
}

class ray {
  start: any;
  end: any;
  verts: any;

  constructor(start: any, end: any) {
    this.start = start;
    this.end = end;
  }

  yValueAt(x: number) {
    return this.offsetY + this.slope * x;
  }

  xValueAt(y: number) {
    return (y - this.offsetY) / this.slope;
  }

  pointInBounds(point: any) {
    var minX = Math.min(this.start.x, this.end.x);
    var maxX = Math.max(this.start.x, this.end.x);
    var minY = Math.min(this.start.y, this.end.y);
    var maxY = Math.max(this.start.y, this.end.y);
    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
  }

  calculateNormal(ref: any) {
    var dif = this.difference;
    var norm1 = dif.normalized().rotate(Math.PI / 2);
    var norm2 = dif.normalized().rotate(Math.PI / -2);

    if (this.start.plus(norm1).distance(ref) < this.start.plus(norm2).distance(ref)) return norm1;
    return norm2;
  }

  get difference() {
    return this.end.minus(this.start);
  }

  get slope() {
    var dif = this.difference;
    return dif.y / dif.x;
  }

  get offsetY() {
    return this.start.y - this.slope * this.start.x;
  }

  get isHorizontal() {
    return compareNum(this.start.y, this.end.y);
  }

  get isVertical() {
    return compareNum(this.start.x, this.end.x);
  }

  static intersect(rayA: any, rayB: any) {
    if (rayA.isVertical && rayB.isVertical) return null;
    if (rayA.isVertical) return new vec2(rayA.start.x, rayB.yValueAt(rayA.start.x));
    if (rayB.isVertical) return new vec2(rayB.start.x, rayA.yValueAt(rayB.start.x));
    if (compareNum(rayA.slope, rayB.slope)) return null;
    if (rayA.isHorizontal) return new vec2(rayB.xValueAt(rayA.start.y), rayA.start.y);
    if (rayB.isHorizontal) return new vec2(rayA.xValueAt(rayB.start.y), rayB.start.y);

    var x = (rayB.offsetY - rayA.offsetY) / (rayA.slope - rayB.slope);
    return new vec2(x, rayA.yValueAt(x));
  }

  static collisionPoint(rayA: { pointInBounds: (arg0: vec2) => any }, rayB: { pointInBounds: (arg0: vec2) => any }) {
    var intersection = ray.intersect(rayA, rayB);

    if (!intersection) return null;
    if (!rayA.pointInBounds(intersection)) return null;
    if (!rayB.pointInBounds(intersection)) return null;
    return intersection;
  }

  static bodyEdges(body: any) {
    var r = [];
    for (var i = body.parts.length - 1; i >= 0; i--) {
      for (var k = body.parts[i].vertices.length - 1; k >= 0; k--) {
        var k2 = k + 1;
        if (k2 >= body.parts[i].vertices.length) k2 = 0;
        var tray = new ray(vec2.fromOther(body.parts[i].vertices[k]), vec2.fromOther(body.parts[i].vertices[k2]));

        tray.verts = [body.parts[i].vertices[k], body.parts[i].vertices[k2]];

        r.push(tray);
      }
    }
    return r;
  }

  static bodyCollisions(rayA: any, body: any) {
    var r = [];
    var edges = ray.bodyEdges(body);

    for (var i = edges.length - 1; i >= 0; i--) {
      var colpoint = ray.collisionPoint(rayA, edges[i]);

      if (!colpoint) continue;

      var normal = edges[i].calculateNormal(rayA.start);

      r.push(new raycol(body, colpoint, normal, edges[i].verts));
    }

    return r;
  }
}

function compareNum(a: number, b: number, leniency = 0.00001) {
  return Math.abs(b - a) <= leniency;
}

class vec2 {
  x: number;
  y: number;

  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }

  normalized(magnitude = 1) {
    return this.multiply(magnitude / this.distance());
  }

  get inverted() {
    return this.multiply(-1);
  }

  multiply(factor: number) {
    return new vec2(this.x * factor, this.y * factor);
  }

  plus(vec: any) {
    return new vec2(this.x + vec.x, this.y + vec.y);
  }

  minus(vec: any) {
    return this.plus(vec.inverted);
  }

  rotate(rot: number) {
    var ang = this.direction;
    var mag = this.distance();
    ang += rot;
    return vec2.fromAng(ang, mag);
  }

  toPhysVector() {
    return (Phaser.Physics.Matter as any).Matter.Vector.create(this.x, this.y);
  }

  get direction() {
    return Math.atan2(this.y, this.x);
  }

  distance(vec = new vec2()) {
    var d = Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2));
    return d;
  }

  clone() {
    return new vec2(this.x, this.y);
  }

  static fromAng(angle: number, magnitude = 1) {
    return new vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
  }

  static fromOther(vector: any) {
    return new vec2(vector.x, vector.y);
  }

  toString() {
    return "vector<" + this.x + ", " + this.y + ">";
  }
}
