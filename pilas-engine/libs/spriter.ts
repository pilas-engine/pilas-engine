/**
 * Copyright (c) 2015 Flyover Games, LLC
 *
 * Jason Andersen jgandersen@gmail.com
 * Isaac Burns isaacburns@gmail.com
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgement in the product documentation would be
 *    appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

/**
 * A TypeScript API for the Spriter SCML animation data format.
 */

/**
 * Nota: para pilas-engine se eliminaron los exports de las funciones y
 * se corrigieron los errores de compilación.
 */

function loadBool(json: any, key: string | number, def?: boolean): boolean {
  const value: any = json[key];
  switch (typeof value) {
    case "string":
      return value === "true" ? true : false;
    case "boolean":
      return value;
    default:
      return def || false;
  }
}

function saveBool(json: any, key: string | number, value: boolean, def?: boolean): void {
  if (typeof def !== "boolean" || value !== def) {
    json[key] = value;
  }
}

function loadFloat(json: any, key: string | number, def?: number): number {
  const value: any = json[key];
  switch (typeof value) {
    case "string":
      return parseFloat(value);
    case "number":
      return value;
    default:
      return def || 0;
  }
}

function saveFloat(json: any, key: string | number, value: number, def?: number): void {
  if (typeof def !== "number" || value !== def) {
    json[key] = value;
  }
}

function loadInt(json: any, key: string | number, def?: number): number {
  const value: any = json[key];
  switch (typeof value) {
    case "string":
      return parseInt(value, 10);
    case "number":
      return 0 | value;
    default:
      return def || 0;
  }
}

function saveInt(json: any, key: string | number, value: number, def?: number): void {
  if (typeof def !== "number" || value !== def) {
    json[key] = value;
  }
}

function loadString(json: any, key: string | number, def?: string): string {
  const value: any = json[key];
  switch (typeof value) {
    case "string":
      return value;
    default:
      return def || "";
  }
}

function saveString(json: any, key: string | number, value: string, def?: string): void {
  if (typeof def !== "string" || value !== def) {
    json[key] = value;
  }
}

function makeArray(value: any): any[] {
  if (typeof value === "object" && typeof value.length === "number") {
    // (Object.isArray(value))
    return value;
  }
  if (typeof value !== "undefined") {
    return [value];
  }
  return [];
}

function wrap(num: number, min: number, max: number): number {
  if (min < max) {
    if (num < min) {
      return max - ((min - num) % (max - min));
    } else {
      return min + ((num - min) % (max - min));
    }
  } else if (min === max) {
    return min;
  } else {
    return num;
  }
}

function interpolateLinear(a, b, t) {
  return a + (b - a) * t;
}

function interpolateQuadratic(a, b, c, t) {
  return interpolateLinear(interpolateLinear(a, b, t), interpolateLinear(b, c, t), t);
}

function interpolateCubic(a, b, c, d, t) {
  return interpolateLinear(interpolateQuadratic(a, b, c, t), interpolateQuadratic(b, c, d, t), t);
}

function interpolateQuartic(a, b, c, d, e, t) {
  return interpolateLinear(interpolateCubic(a, b, c, d, t), interpolateCubic(b, c, d, e, t), t);
}

function interpolateQuintic(a, b, c, d, e, f, t) {
  return interpolateLinear(interpolateQuartic(a, b, c, d, e, t), interpolateQuartic(b, c, d, e, f, t), t);
}

function interpolateBezier(x1, y1, x2, y2, t) {
  function SampleCurve(a, b, c, t) {
    return ((a * t + b) * t + c) * t;
  }

  function SampleCurveDerivativeX(ax, bx, cx, t) {
    return (3.0 * ax * t + 2.0 * bx) * t + cx;
  }

  function SolveEpsilon(duration) {
    return 1.0 / (200.0 * duration);
  }

  function Solve(ax, bx, cx, ay, by, cy, x, epsilon) {
    return SampleCurve(ay, by, cy, SolveCurveX(ax, bx, cx, x, epsilon));
  }

  function SolveCurveX(ax, bx, cx, x, epsilon) {
    let t0;
    let t1;
    let t2;
    let x2;
    let d2;
    let i;

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = SampleCurve(ax, bx, cx, t2) - x;
      if (Math.abs(x2) < epsilon) return t2;

      d2 = SampleCurveDerivativeX(ax, bx, cx, t2);
      if (Math.abs(d2) < epsilon) break;

      t2 = t2 - x2 / d2;
    }

    // Fall back to the bisection method for reliability.
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = SampleCurve(ax, bx, cx, t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }

    return t2; // Failure.
  }

  const duration = 1;
  const cx = 3.0 * x1;
  const bx = 3.0 * (x2 - x1) - cx;
  const ax = 1.0 - cx - bx;
  const cy = 3.0 * y1;
  const by = 3.0 * (y2 - y1) - cy;
  const ay = 1.0 - cy - by;

  return Solve(ax, bx, cx, ay, by, cy, t, SolveEpsilon(duration));
}

function tween(a, b, t) {
  return a + (b - a) * t;
}

function wrapAngleRadians(angle) {
  if (angle <= 0.0) {
    return ((angle - Math.PI) % (2.0 * Math.PI)) + Math.PI;
  } else {
    return ((angle + Math.PI) % (2.0 * Math.PI)) - Math.PI;
  }
}

function tweenAngleRadians(a, b, t, spin) {
  if (spin === 0) {
    return a;
  } else if (spin > 0) {
    if (b - a < 0.0) {
      b += 2.0 * Math.PI;
    }
  } else if (spin < 0) {
    if (b - a > 0.0) {
      b -= 2.0 * Math.PI;
    }
  }
  return wrapAngleRadians(a + wrapAngleRadians(b - a) * t);
}

class Angle {
  public rad: number = 0;
  constructor(rad: number = 0) {
    this.rad = rad;
  }
  get deg(): number {
    return (this.rad * 180) / Math.PI;
  }
  set deg(value: number) {
    this.rad = (value * Math.PI) / 180;
  }
  get cos(): number {
    return Math.cos(this.rad);
  }
  get sin(): number {
    return Math.sin(this.rad);
  }
  selfIdentity(): Angle {
    this.rad = 0;
    return this;
  }
  copy(other: Angle): Angle {
    this.rad = other.rad;
    return this;
  }
  static add(a: Angle, b: Angle, out: Angle = new Angle()): Angle {
    out.rad = wrapAngleRadians(a.rad + b.rad);
    return out;
  }
  add(other: Angle, out: Angle = new Angle()): Angle {
    return Angle.add(this, other, out);
  }
  selfAdd(other: Angle): Angle {
    return Angle.add(this, other, this);
  }
  static tween(a: Angle, b: Angle, pct: number, spin: number, out: Angle = new Angle()): Angle {
    out.rad = tweenAngleRadians(a.rad, b.rad, pct, spin);
    return out;
  }
  tween(other: Angle, pct: number, spin: number, out: Angle = new Angle()): Angle {
    return Angle.tween(this, other, pct, spin, out);
  }
  selfTween(other: Angle, pct: number, spin: number): Angle {
    return Angle.tween(this, other, pct, spin, this);
  }
}

class Vector {
  public x: number = 0.0;
  public y: number = 0.0;
  constructor(x: number = 0.0, y: number = 0.0) {
    this.x = x;
    this.y = y;
  }
  public copy(other: Vector): Vector {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  public static equal(a: Vector, b: Vector, epsilon: number = 1e-6): boolean {
    if (Math.abs(a.x - b.x) > epsilon) {
      return false;
    }
    if (Math.abs(a.y - b.y) > epsilon) {
      return false;
    }
    return true;
  }
  public static add(a: Vector, b: Vector, out: Vector = new Vector()): Vector {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }
  public add(other: Vector, out: Vector = new Vector()): Vector {
    return Vector.add(this, other, out);
  }
  public selfAdd(other: Vector): Vector {
    // return Vector.add(this, other, this);
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  public static tween(a: Vector, b: Vector, pct: number, out: Vector = new Vector()) {
    out.x = tween(a.x, b.x, pct);
    out.y = tween(a.y, b.y, pct);
    return out;
  }
  public tween(other: Vector, pct: number, out: Vector = new Vector()): Vector {
    return Vector.tween(this, other, pct, out);
  }
  public selfTween(other: Vector, pct: number): Vector {
    return Vector.tween(this, other, pct, this);
  }
}

class Position extends Vector {
  constructor() {
    super(0.0, 0.0);
  }
}

class Rotation extends Angle {
  constructor() {
    super(0.0);
  }
}

class Scale extends Vector {
  constructor() {
    super(1.0, 1.0);
  }
  public selfIdentity(): Scale {
    this.x = 1.0;
    this.y = 1.0;
    return this;
  }
}

class Pivot extends Vector {
  constructor() {
    super(0.0, 1.0);
  }
  public selfIdentity(): Scale {
    this.x = 0.0;
    this.y = 1.0;
    return this;
  }
}

/**
 * @constructor
 */
class Space {
  position = new Position();
  rotation = new Rotation();
  scale = new Scale();
  copy(other: Space): Space {
    const space = this;
    space.position.copy(other.position);
    space.rotation.copy(other.rotation);
    space.scale.copy(other.scale);
    return space;
  }
  load(json: any): Space {
    const space = this;
    space.position.x = loadFloat(json, "x", 0.0);
    space.position.y = loadFloat(json, "y", 0.0);
    space.rotation.deg = loadFloat(json, "angle", 0.0);
    space.scale.x = loadFloat(json, "scale_x", 1.0);
    space.scale.y = loadFloat(json, "scale_y", 1.0);
    return space;
  }
  static equal(a: Space, b: Space, epsilon: number = 1e-6) {
    if (Math.abs(a.position.x - b.position.x) > epsilon) {
      return false;
    }
    if (Math.abs(a.position.y - b.position.y) > epsilon) {
      return false;
    }
    if (Math.abs(a.rotation.rad - b.rotation.rad) > epsilon) {
      return false;
    }
    if (Math.abs(a.scale.x - b.scale.x) > epsilon) {
      return false;
    }
    if (Math.abs(a.scale.y - b.scale.y) > epsilon) {
      return false;
    }
    return true;
  }
  static identity(out: Space = new Space()): Space {
    out.position.x = 0.0;
    out.position.y = 0.0;
    out.rotation.rad = 0.0;
    out.scale.x = 1.0;
    out.scale.y = 1.0;
    return out;
  }
  static translate(space, x, y) {
    x *= space.scale.x;
    y *= space.scale.y;
    const rad = space.rotation.rad;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    space.position.x += tx;
    space.position.y += ty;
    return space;
  }
  static rotate(space, rad) {
    space.rotation.rad = wrapAngleRadians(space.rotation.rad + rad);
    return space;
  }
  static scale(space, x, y) {
    space.scale.x *= x;
    space.scale.y *= y;
    return space;
  }
  static invert(space, out) {
    // invert
    // out.sca = space.sca.inv();
    // out.rot = space.rot.inv();
    // out.pos = space.pos.neg().rotate(space.rot.inv()).mul(space.sca.inv());

    out = out || new Space();
    const inv_scale_x = 1.0 / space.scale.x;
    const inv_scale_y = 1.0 / space.scale.y;
    const inv_rotation = -space.rotation.rad;
    const inv_x = -space.position.x;
    const inv_y = -space.position.y;
    out.scale.x = inv_scale_x;
    out.scale.y = inv_scale_y;
    out.rotation.rad = inv_rotation;
    const x = inv_x;
    const y = inv_y;
    const rad = inv_rotation;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    out.position.x = tx * inv_scale_x;
    out.position.y = ty * inv_scale_y;
    return out;
  }
  static combine(a, b, out) {
    // combine
    // out.pos = b.pos.mul(a.sca).rotate(a.rot).add(a.pos);
    // out.rot = b.rot.mul(a.rot);
    // out.sca = b.sca.mul(a.sca);

    out = out || new Space();
    const x = b.position.x * a.scale.x;
    const y = b.position.y * a.scale.y;
    const rad = a.rotation.rad;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    out.position.x = tx + a.position.x;
    out.position.y = ty + a.position.y;
    if (a.scale.x * a.scale.y < 0.0) {
      out.rotation.rad = wrapAngleRadians(a.rotation.rad - b.rotation.rad);
    } else {
      out.rotation.rad = wrapAngleRadians(b.rotation.rad + a.rotation.rad);
    }
    out.scale.x = b.scale.x * a.scale.x;
    out.scale.y = b.scale.y * a.scale.y;
    return out;
  }
  static extract(ab, a, out) {
    // extract
    // out.sca = ab.sca.mul(a.sca.inv());
    // out.rot = ab.rot.mul(a.rot.inv());
    // out.pos = ab.pos.add(a.pos.neg()).rotate(a.rot.inv()).mul(a.sca.inv());

    out = out || new Space();
    out.scale.x = ab.scale.x / a.scale.x;
    out.scale.y = ab.scale.y / a.scale.y;
    if (a.scale.x * a.scale.y < 0.0) {
      out.rotation.rad = wrapAngleRadians(a.rotation.rad + ab.rotation.rad);
    } else {
      out.rotation.rad = wrapAngleRadians(ab.rotation.rad - a.rotation.rad);
    }
    const x = ab.position.x - a.position.x;
    const y = ab.position.y - a.position.y;
    const rad = -a.rotation.rad;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    out.position.x = tx / a.scale.x;
    out.position.y = ty / a.scale.y;
    return out;
  }
  static transform(space, v, out) {
    out = out || new Vector();
    const x = v.x * space.scale.x;
    const y = v.y * space.scale.y;
    const rad = space.rotation.rad;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    out.x = tx + space.position.x;
    out.y = ty + space.position.y;
    return out;
  }
  static untransform(space, v, out) {
    out = out || new Vector();
    const x = v.x - space.position.x;
    const y = v.y - space.position.y;
    const rad = -space.rotation.rad;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const tx = c * x - s * y;
    const ty = s * x + c * y;
    out.x = tx / space.scale.x;
    out.y = ty / space.scale.y;
    return out;
  }
  static tween(a, b, pct, spin, out) {
    out.position.x = tween(a.position.x, b.position.x, pct);
    out.position.y = tween(a.position.y, b.position.y, pct);
    out.rotation.rad = tweenAngleRadians(a.rotation.rad, b.rotation.rad, pct, spin);
    out.scale.x = tween(a.scale.x, b.scale.x, pct);
    out.scale.y = tween(a.scale.y, b.scale.y, pct);
    return out;
  }
}

// @ts-ignore
class Element {
  id: number = -1;
  name: string = "";
  load(json: any): Element {
    this.id = loadInt(json, "id", -1);
    this.name = loadString(json, "name", "");
    // @ts-ignore
    return this;
  }
}

// @ts-ignore
class File extends Element {
  type: string = "unknown";
  constructor(type: string) {
    super();
    this.type = type;
  }
  load(json: any): any {
    // @ts-ignore
    super.load(json);
    const type = loadString(json, "type", "image");
    if (this.type !== type) throw new Error();
    return this;
  }
}

class ImageFile extends File {
  width: number = 0;
  height: number = 0;
  pivot: Pivot = new Pivot();
  constructor() {
    // @ts-ignore
    super("image");
  }
  load(json: any): ImageFile {
    // @ts-ignore
    super.load(json);
    this.width = loadInt(json, "width", 0);
    this.height = loadInt(json, "height", 0);
    this.pivot.x = loadFloat(json, "pivot_x", 0.0);
    this.pivot.y = loadFloat(json, "pivot_y", 1.0);
    return this;
  }
}

class SoundFile extends File {
  constructor() {
    // @ts-ignore
    super("sound");
  }
  load(json: any): SoundFile {
    // @ts-ignore
    super.load(json);
    return this;
  }
}

class Folder extends Element {
  file_array: File[] = [];
  load(json: any): Folder {
    // @ts-ignore
    super.load(json);
    this.file_array = [];
    json.file = makeArray(json.file);
    json.file.forEach(
      (file_json: any): void => {
        switch (file_json.type) {
          case "image":
          default:
            this.file_array.push(new ImageFile().load(file_json));
            break;
          case "sound":
            this.file_array.push(new SoundFile().load(file_json));
            break;
        }
      }
    );
    return this;
  }
}

class BaseObject {
  type: string = "unknown";
  name: string = "";
  local_space: any;
  world_space: any;
  pivot: any;
  constructor(type: string) {
    this.type = type;
  }
  load(json: any): BaseObject {
    const type = loadString(json, "type", "sprite");
    if (this.type !== type) throw new Error();
    return this;
  }
}

class SpriteObject extends BaseObject {
  parent_index: number = -1;
  folder_index: number = -1;
  file_index: number = -1;
  local_space: Space = new Space();
  world_space: Space = new Space();
  default_pivot: boolean = false;
  pivot: Pivot = new Pivot();
  z_index: number = 0;
  alpha: number = 1.0;
  constructor() {
    super("sprite");
  }
  load(json: any): SpriteObject {
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.folder_index = loadInt(json, "folder", -1);
    this.file_index = loadInt(json, "file", -1);
    this.local_space.load(json);
    this.world_space.copy(this.local_space);
    if (typeof json["pivot_x"] !== "undefined" || typeof json["pivot_y"] !== "undefined") {
      this.pivot.x = loadFloat(json, "pivot_x", 0.0);
      this.pivot.y = loadFloat(json, "pivot_y", 1.0);
    } else {
      this.default_pivot = true;
    }
    //debugger;
    //this.z_index = loadInt(json, "z_index", 0);
    this.z_index = 99;
    this.alpha = loadFloat(json, "a", 1.0);
    return this;
  }
  copy(other: SpriteObject): SpriteObject {
    this.parent_index = other.parent_index;
    this.folder_index = other.folder_index;
    this.file_index = other.file_index;
    this.local_space.copy(other.local_space);
    this.world_space.copy(other.world_space);
    this.default_pivot = other.default_pivot;
    this.pivot.copy(other.pivot);
    this.z_index = other.z_index;
    this.alpha = other.alpha;
    return this;
  }
  tween(other, pct, spin): void {
    Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    if (!this.default_pivot) {
      Vector.tween(this.pivot, other.pivot, pct, this.pivot);
    }
    this.alpha = tween(this.alpha, other.alpha, pct);
  }
}

class Bone extends BaseObject {
  parent_index: number = -1;
  local_space: Space = new Space();
  world_space: Space = new Space();
  constructor() {
    super("bone");
  }
  load(json: any): Bone {
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.local_space.load(json);
    this.world_space.copy(this.local_space);
    return this;
  }
  copy(other: Bone): Bone {
    this.parent_index = other.parent_index;
    this.local_space.copy(other.local_space);
    this.world_space.copy(other.world_space);
    return this;
  }
  tween(other: Bone, pct: number, spin: number): void {
    Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
  }
}

class BoxObject extends BaseObject {
  parent_index: number = -1;
  local_space: Space = new Space();
  world_space: Space = new Space();
  pivot: Pivot = new Pivot();
  constructor() {
    super("box");
  }
  load(json: any): BoxObject {
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.local_space.load(json);
    this.world_space.copy(this.local_space);
    this.pivot.x = loadFloat(json, "pivot_x", 0.0);
    this.pivot.y = loadFloat(json, "pivot_y", 1.0);
    return this;
  }
  copy(other: BoxObject): BoxObject {
    this.parent_index = other.parent_index;
    this.local_space.copy(other.local_space);
    this.world_space.copy(other.world_space);
    this.pivot.copy(other.pivot);
    return this;
  }
  tween(other: BoxObject, pct: number, spin: number): void {
    Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    // Vector.tween(this.pivot, other.pivot, pct, this.pivot);
  }
}

class PointObject extends BaseObject {
  parent_index: number = -1;
  local_space: Space = new Space();
  world_space: Space = new Space();
  constructor() {
    super("point");
  }
  load(json: any): PointObject {
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.local_space.load(json);
    this.world_space.copy(this.local_space);
    return this;
  }
  copy(other: PointObject): PointObject {
    this.parent_index = other.parent_index;
    this.local_space.copy(other.local_space);
    this.world_space.copy(other.world_space);
    return this;
  }
  tween(other: PointObject, pct: number, spin: number): void {
    Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
  }
}

class SoundObject extends BaseObject {
  folder_index: number = -1;
  file_index: number = -1;
  trigger: boolean = false;
  volume: number = 1.0;
  panning: number = 0.0;
  constructor() {
    super("sound");
  }
  load(json: any): SoundObject {
    super.load(json);
    this.folder_index = loadInt(json, "folder", -1);
    this.file_index = loadInt(json, "file", -1);
    this.trigger = loadBool(json, "trigger", false);
    this.volume = loadFloat(json, "volume", 1.0);
    this.panning = loadFloat(json, "panning", 0.0);
    return this;
  }
  copy(other: SoundObject): SoundObject {
    this.folder_index = other.folder_index;
    this.file_index = other.file_index;
    this.trigger = other.trigger;
    this.volume = other.volume;
    this.panning = other.panning;
    return this;
  }
  tween(other: SoundObject, pct: number, spin: number): void {
    this.volume = tween(this.volume, other.volume, pct);
    this.panning = tween(this.panning, other.panning, pct);
  }
}

class EntityObject extends BaseObject {
  parent_index: number = -1;
  local_space: Space = new Space();
  world_space: Space = new Space();
  entity_index: number = -1;
  animation_index: number = -1;
  animation_time: number = 0.0;
  pose: Pose;
  constructor() {
    super("entity");
  }
  load(json: any): EntityObject {
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.local_space.load(json);
    this.world_space.copy(this.local_space);
    this.entity_index = loadInt(json, "entity", -1);
    this.animation_index = loadInt(json, "animation", -1);
    this.animation_time = loadFloat(json, "t", 0.0);
    return this;
  }
  copy(other: EntityObject): EntityObject {
    this.parent_index = other.parent_index;
    this.local_space.copy(other.local_space);
    this.world_space.copy(other.world_space);
    this.entity_index = other.entity_index;
    this.animation_index = other.animation_index;
    this.animation_time = other.animation_time;
    return this;
  }
  tween(other: EntityObject, pct: number, spin: number): void {
    Space.tween(this.local_space, other.local_space, pct, spin, this.local_space);
    this.animation_time = tween(this.animation_time, other.animation_time, pct);
  }
}

class VariableObject extends BaseObject {
  constructor() {
    super("variable");
  }
  load(json: any): VariableObject {
    super.load(json);
    return this;
  }
  copy(other: VariableObject): VariableObject {
    return this;
  }
  tween(other: VariableObject, pct: number, spin: number): void {}
}

class Ref extends Element {
  parent_index: number = -1;
  timeline_index: number = -1;
  keyframe_index: number = -1;
  load(json: any): Ref {
    // @ts-ignore
    super.load(json);
    this.parent_index = loadInt(json, "parent", -1);
    this.timeline_index = loadInt(json, "timeline", -1);
    this.keyframe_index = loadInt(json, "key", -1);
    return this;
  }
}

class BoneRef extends Ref {}

class ObjectRef extends Ref {
  z_index: number = 0;
  load(json: any): ObjectRef {
    super.load(json);
    this.z_index = loadInt(json, "z_index", 0);
    return this;
  }
}

class Keyframe extends Element {
  time: number = 0;
  load(json: any): Keyframe {
    // @ts-ignore
    super.load(json);
    this.time = loadInt(json, "time", 0);
    return this;
  }
  static find(array: Keyframe[], time: number): number {
    if (array.length <= 0) {
      return -1;
    }
    if (time < array[0].time) {
      return -1;
    }
    const last = array.length - 1;
    if (time >= array[last].time) {
      return last;
    }
    let lo = 0;
    let hi = last;
    if (hi === 0) {
      return 0;
    }
    let current = hi >> 1;
    while (true) {
      if (array[current + 1].time <= time) {
        lo = current + 1;
      } else {
        hi = current;
      }
      if (lo === hi) {
        return lo;
      }
      current = (lo + hi) >> 1;
    }
  }
  static compare(a: Keyframe, b: Keyframe): number {
    return a.time - b.time;
  }
}

class Curve {
  type: string = "linear";
  c1: number = 0.0;
  c2: number = 0.0;
  c3: number = 0.0;
  c4: number = 0.0;
  load(json: any): Curve {
    this.type = loadString(json, "curve_type", "linear");
    this.c1 = loadFloat(json, "c1", 0.0);
    this.c2 = loadFloat(json, "c2", 0.0);
    this.c3 = loadFloat(json, "c3", 0.0);
    this.c4 = loadFloat(json, "c4", 0.0);
    return this;
  }
  evaluate(t: number): number {
    switch (this.type) {
      case "instant":
        return 0.0;
      case "linear":
        return t;
      case "quadratic":
        return interpolateQuadratic(0.0, this.c1, 1.0, t);
      case "cubic":
        return interpolateCubic(0.0, this.c1, this.c2, 1.0, t);
      case "quartic":
        return interpolateQuartic(0.0, this.c1, this.c2, this.c3, 1.0, t);
      case "quintic":
        return interpolateQuintic(0.0, this.c1, this.c2, this.c3, this.c4, 1.0, t);
      case "bezier":
        return interpolateBezier(this.c1, this.c2, this.c3, this.c4, t);
    }
    return 0.0;
  }
}

class MainlineKeyframe extends Keyframe {
  // @ts-ignore
  curve: Curve = new Curve();
  // @ts-ignore
  bone_ref_array: BoneRef[];
  // @ts-ignore
  object_ref_array: ObjectRef[];
  // @ts-ignore
  load(json: any): MainlineKeyframe {
    super.load(json);
    const mainline_keyframe = this;
    mainline_keyframe.curve.load(json);
    mainline_keyframe.bone_ref_array = [];
    json.bone_ref = makeArray(json.bone_ref);
    json.bone_ref.forEach(function(bone_ref_json) {
      mainline_keyframe.bone_ref_array.push(new BoneRef().load(bone_ref_json));
    });
    mainline_keyframe.bone_ref_array.sort(function(a, b) {
      // @ts-ignore
      return a.id - b.id;
    });
    mainline_keyframe.object_ref_array = [];
    json.object_ref = makeArray(json.object_ref);
    json.object_ref.forEach(function(object_ref_json) {
      mainline_keyframe.object_ref_array.push(new ObjectRef().load(object_ref_json));
    });
    mainline_keyframe.object_ref_array.sort(function(a, b) {
      // @ts-ignore
      return a.id - b.id;
    });
    return mainline_keyframe;
  }
}

class Mainline {
  keyframe_array: MainlineKeyframe[];
  load(json: any): Mainline {
    const mainline = this;
    mainline.keyframe_array = [];
    json.key = makeArray(json.key);
    json.key.forEach(function(key_json) {
      mainline.keyframe_array.push(new MainlineKeyframe().load(key_json));
    });
    mainline.keyframe_array.sort(Keyframe.compare);
    return mainline;
  }
}

class TimelineKeyframe extends Keyframe {
  type: string = "unknown";
  spin: number = 1; // 1: counter-clockwise, -1: clockwise
  // @ts-ignore
  curve: Curve = new Curve();
  constructor(type: string) {
    super();
    this.type = type;
  }
  // @ts-ignore
  load(json: any): TimelineKeyframe {
    super.load(json);
    // const type = loadString(json, 'type', "sprite");
    // if (this.type !== type) throw new Error();
    this.spin = loadInt(json, "spin", 1);
    this.curve.load(json);
    return this;
  }
}

class SpriteTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  sprite: SpriteObject;
  constructor() {
    super("sprite");
  }
  // @ts-ignore
  load(json: any): SpriteTimelineKeyframe {
    super.load(json);
    //debugger;
    this.sprite = new SpriteObject().load(json.object);
    return this;
  }
}

class BoneTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  bone: Bone;
  constructor() {
    super("bone");
  }
  // @ts-ignore
  load(json: any): BoneTimelineKeyframe {
    super.load(json);
    json.bone.type = json.bone.type || "bone";
    this.bone = new Bone().load(json.bone);
    return this;
  }
}

class BoxTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  box: BoxObject;
  constructor() {
    super("box");
  }
  // @ts-ignore
  load(json: any): BoxTimelineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "box";
    this.box = new BoxObject().load(json.object);
    return this;
  }
}

class PointTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  point: PointObject;
  constructor() {
    super("point");
  }
  // @ts-ignore
  load(json: any): PointTimelineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "point";
    this.point = new PointObject().load(json.object);
    return this;
  }
}

class SoundTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  sound: SoundObject;
  constructor() {
    super("sound");
  }
  // @ts-ignore
  load(json: any): SoundTimelineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "sound";
    this.sound = new SoundObject().load(json.object);
    return this;
  }
}

class EntityTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  entity: EntityObject;
  constructor() {
    super("entity");
  }
  // @ts-ignore
  load(json: any): EntityTimelineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "entity";
    this.entity = new EntityObject().load(json.object);
    return this;
  }
}

class VariableTimelineKeyframe extends TimelineKeyframe {
  // @ts-ignore
  variable: VariableObject;
  constructor() {
    super("variable");
  }
  // @ts-ignore
  load(json: any): VariableTimelineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "variable";
    this.variable = new VariableObject().load(json.object);
    return this;
  }
}

class TagDef extends Element {
  tag_index: number = -1;
  load(json: any): TagDef {
    // @ts-ignore
    super.load(json);
    return this;
  }
}

class Tag extends Element {
  tag_def_index: number = -1;
  load(json: any): Tag {
    // @ts-ignore
    super.load(json);
    this.tag_def_index = loadInt(json, "t", -1);
    return this;
  }
}

class TaglineKeyframe extends Keyframe {
  // @ts-ignore
  tag_array: Tag[];
  // @ts-ignore
  load(json: any): TaglineKeyframe {
    super.load(json);
    const tagline_keyframe = this;
    tagline_keyframe.tag_array = [];
    json.tag = makeArray(json.tag);
    json.tag.forEach(function(tag_json) {
      tagline_keyframe.tag_array.push(new Tag().load(tag_json));
    });
    return this;
  }
}

class Tagline extends Element {
  keyframe_array: TaglineKeyframe[] = [];
  load(json: any): Tagline {
    // @ts-ignore
    super.load(json);
    const tagline = this;
    tagline.keyframe_array = [];
    json.key = makeArray(json.key);
    json.key.forEach(function(key_json) {
      tagline.keyframe_array.push(new TaglineKeyframe().load(key_json));
    });
    return this;
  }
}

class VarlineKeyframe extends Keyframe {
  val: number | string;
  // @ts-ignore
  load(json: any): VarlineKeyframe {
    super.load(json);
    const varline_keyframe = this;
    switch (typeof json.val) {
      case "number":
        varline_keyframe.val = loadFloat(json, "val", 0.0);
        break;
      case "string":
        varline_keyframe.val = loadString(json, "val", "");
        break;
    }
    return this;
  }
}

class Varline extends Element {
  var_def_index: number = -1;
  keyframe_array: VarlineKeyframe[];
  load(json: any): Varline {
    // @ts-ignore
    super.load(json);
    const varline = this;
    varline.var_def_index = loadInt(json, "def", -1);
    varline.keyframe_array = [];
    json.key = makeArray(json.key);
    json.key.forEach(function(key_json) {
      varline.keyframe_array.push(new VarlineKeyframe().load(key_json));
    });
    return this;
  }
}

class Meta extends Element {
  tagline: Tagline;
  varline_array: Varline[];
  load(json: any): Meta {
    // @ts-ignore
    super.load(json);
    const meta = this;
    meta.tagline = new Tagline();
    if (json.tagline) {
      meta.tagline.load(json.tagline);
    }
    meta.varline_array = [];
    json.valline = json.valline || null; // HACK
    json.varline = json.varline || json.valline; // HACK
    if (json.varline) {
      json.varline = makeArray(json.varline);
      json.varline.forEach(function(varline_json) {
        meta.varline_array.push(new Varline().load(varline_json));
      });
    }
    return this;
  }
}

class Timeline extends Element {
  type: string = "sprite";
  object_index: number = -1;
  keyframe_array: TimelineKeyframe[];
  meta: Meta;
  load(json: any): Timeline {
    // @ts-ignore
    super.load(json);
    const timeline = this;
    timeline.type = loadString(json, "object_type", "sprite");
    timeline.object_index = loadInt(json, "obj", -1);
    timeline.keyframe_array = [];
    json.key = makeArray(json.key);
    switch (timeline.type) {
      case "sprite":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new SpriteTimelineKeyframe().load(key_json));
        });
        break;
      case "bone":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new BoneTimelineKeyframe().load(key_json));
        });
        break;
      case "box":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new BoxTimelineKeyframe().load(key_json));
        });
        break;
      case "point":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new PointTimelineKeyframe().load(key_json));
        });
        break;
      case "sound":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new SoundTimelineKeyframe().load(key_json));
        });
        break;
      case "entity":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new EntityTimelineKeyframe().load(key_json));
        });
        break;
      case "variable":
        json.key.forEach(function(key_json) {
          timeline.keyframe_array.push(new VariableTimelineKeyframe().load(key_json));
        });
        break;
      default:
        console.log("TODO: Timeline::load", timeline.type, json.key);
        break;
    }
    timeline.keyframe_array.sort(Keyframe.compare);
    if (json.meta) {
      timeline.meta = new Meta().load(json.meta);
    }
    return timeline;
  }
}

class SoundlineKeyframe extends Keyframe {
  // @ts-ignore
  sound: SoundObject;
  // @ts-ignore
  load(json: any): SoundlineKeyframe {
    super.load(json);
    json.object.type = json.object.type || "sound";
    this.sound = new SoundObject().load(json.object);
    return this;
  }
}

class Soundline extends Element {
  keyframe_array: SoundlineKeyframe[];
  load(json: any): Soundline {
    // @ts-ignore
    super.load(json);
    const soundline = this;
    soundline.keyframe_array = [];
    json.key = makeArray(json.key);
    json.key.forEach(function(key_json) {
      soundline.keyframe_array.push(new SoundlineKeyframe().load(key_json));
    });
    soundline.keyframe_array.sort(Keyframe.compare);
    return this;
  }
}

class EventlineKeyframe extends Keyframe {
  /// event: EventObject;
  // @ts-ignore
  load(json: any): EventlineKeyframe {
    super.load(json);
    ///  this.event = new EventObject().load(json.object || {});
    return this;
  }
}

class Eventline extends Element {
  keyframe_array: EventlineKeyframe[];
  load(json: any): Eventline {
    // @ts-ignore
    super.load(json);
    const eventline = this;
    eventline.keyframe_array = [];
    json.key = makeArray(json.key);
    json.key.forEach(function(key_json) {
      eventline.keyframe_array.push(new EventlineKeyframe().load(key_json));
    });
    eventline.keyframe_array.sort(Keyframe.compare);
    return this;
  }
}

class MapInstruction {
  folder_index: number = -1;
  file_index: number = -1;
  target_folder_index: number = -1;
  target_file_index: number = -1;
  load(json: any): MapInstruction {
    const map_instruction = this;
    map_instruction.folder_index = loadInt(json, "folder", -1);
    map_instruction.file_index = loadInt(json, "file", -1);
    map_instruction.target_folder_index = loadInt(json, "target_folder", -1);
    map_instruction.target_file_index = loadInt(json, "target_file", -1);
    return this;
  }
}

class CharacterMap extends Element {
  map_instruction_array: MapInstruction[] = [];
  load(json: any): CharacterMap {
    // @ts-ignore
    super.load(json);
    const character_map = this;
    character_map.map_instruction_array = [];
    json.map = makeArray(json.map);
    json.map.forEach(function(map_json) {
      const map_instruction = new MapInstruction().load(map_json);
      character_map.map_instruction_array.push(map_instruction);
    });
    return this;
  }
}

class VarDef extends Element {
  type: string;
  default_value: number | string;
  value: number | string;
  load(json: any): VarDef {
    // @ts-ignore
    super.load(json);
    this.type = this.default_value = loadString(json, "type", "");
    switch (this.type) {
      case "int":
        this.value = this.default_value = loadInt(json, "default_value", 0);
        break;
      case "float":
        this.value = this.default_value = loadFloat(json, "default_value", 0.0);
        break;
      case "string":
        this.value = this.default_value = loadString(json, "default_value", "");
        break;
    }
    return this;
  }
}

class VarDefs extends Element {
  var_def_array: VarDef[];
  load(json: any): VarDefs {
    // @ts-ignore
    super.load(json);
    const var_defs = this;
    this.var_def_array = [];
    let json_var_def_array = [];
    if (typeof json.i === "object") {
      // in SCML files, json.i is an object or array of objects
      json_var_def_array = makeArray(json.i);
    } else if (typeof json === "object" && typeof json.length === "number") {
      // in SCON files, json is an array
      json_var_def_array = makeArray(json);
    }
    json_var_def_array.forEach(function(var_def_json) {
      var_defs.var_def_array.push(new VarDef().load(var_def_json));
    });
    return this;
  }
}

class ObjInfo extends Element {
  type: string = "unknown";
  var_defs: VarDefs;
  constructor(type: string) {
    super();
    this.type = type;
  }
  load(json: any): ObjInfo {
    // @ts-ignore
    super.load(json);
    // const type = loadString(json, 'type', "unknown");
    // if (this.type !== type) throw new Error();
    this.var_defs = new VarDefs().load(json.var_defs || {});
    return this;
  }
}

class SpriteFrame {
  folder_index: number = -1;
  file_index: number = -1;
  load(json: any): SpriteFrame {
    this.folder_index = loadInt(json, "folder", -1);
    this.file_index = loadInt(json, "file", -1);
    return this;
  }
}

class SpriteObjInfo extends ObjInfo {
  sprite_frame_array: SpriteFrame[];
  constructor() {
    super("sprite");
  }
  load(json: any): SpriteObjInfo {
    super.load(json);
    const obj_info = this;
    obj_info.sprite_frame_array = [];
    json.frames = makeArray(json.frames);
    json.frames.forEach(function(frames_json) {
      obj_info.sprite_frame_array.push(new SpriteFrame().load(frames_json));
    });
    return this;
  }
}

class BoneObjInfo extends ObjInfo {
  w: number = 0;
  h: number = 0;
  constructor() {
    super("bone");
  }
  load(json: any): BoneObjInfo {
    super.load(json);
    this.w = loadInt(json, "w", 0);
    this.h = loadInt(json, "h", 0);
    return this;
  }
}

class BoxObjInfo extends ObjInfo {
  w: number = 0;
  h: number = 0;
  constructor() {
    super("box");
  }
  load(json: any): BoxObjInfo {
    super.load(json);
    this.w = loadInt(json, "w", 0);
    this.h = loadInt(json, "h", 0);
    return this;
  }
}

// @ts-ignore
class Animation extends Element {
  length: number = 0;
  looping: string = "true"; // "true", "false" or "ping_pong"
  loop_to: number = 0;
  mainline: Mainline;
  timeline_array: Timeline[];
  soundline_array: Soundline[];
  eventline_array: Eventline[];
  meta: Meta;
  min_time: number = 0;
  max_time: number = 0;
  load(json: any): Animation {
    // @ts-ignore
    super.load(json);
    const anim = this;
    anim.length = loadInt(json, "length", 0);
    anim.looping = loadString(json, "looping", "true");
    anim.loop_to = loadInt(json, "loop_to", 0);
    anim.mainline = new Mainline().load(json.mainline || {});
    anim.timeline_array = [];
    json.timeline = makeArray(json.timeline);
    json.timeline.forEach(function(timeline_json) {
      anim.timeline_array.push(new Timeline().load(timeline_json));
    });
    anim.soundline_array = [];
    json.soundline = makeArray(json.soundline);
    json.soundline.forEach(function(soundline_json) {
      anim.soundline_array.push(new Soundline().load(soundline_json));
    });
    anim.eventline_array = [];
    json.eventline = makeArray(json.eventline);
    json.eventline.forEach(function(eventline_json) {
      anim.eventline_array.push(new Eventline().load(eventline_json));
    });
    if (json.meta) {
      anim.meta = new Meta().load(json.meta);
    }
    anim.min_time = 0;
    anim.max_time = anim.length;
    // @ts-ignore
    return this;
  }
}

class Entity extends Element {
  character_map_map: { [key: string]: CharacterMap };
  character_map_keys: string[];
  var_defs: VarDefs;
  obj_info_map: { [key: string]: ObjInfo };
  obj_info_keys: string[];
  animation_map: { [key: string]: Animation };
  animation_keys: string[];
  load(json: any): Entity {
    // @ts-ignore
    super.load(json);
    const entity = this;
    entity.character_map_map = {};
    entity.character_map_keys = [];
    json.character_map = makeArray(json.character_map);
    json.character_map.forEach(function(character_map_json) {
      const character_map = new CharacterMap().load(character_map_json);
      // @ts-ignore
      entity.character_map_map[character_map.name] = character_map;
      // @ts-ignore
      entity.character_map_keys.push(character_map.name);
    });
    this.var_defs = new VarDefs().load(json.var_defs || {});
    entity.obj_info_map = {};
    entity.obj_info_keys = [];
    json.obj_info = makeArray(json.obj_info);
    json.obj_info.forEach(function(obj_info_json) {
      let obj_info;
      switch (obj_info_json.type) {
        case "sprite":
          obj_info = new SpriteObjInfo().load(obj_info_json);
          break;
        case "bone":
          obj_info = new BoneObjInfo().load(obj_info_json);
          break;
        case "box":
          obj_info = new BoxObjInfo().load(obj_info_json);
          break;
        case "point":
        case "sound":
        case "entity":
        case "variable":
        default:
          console.log("TODO: Entity.load", obj_info_json.type, obj_info_json);
          obj_info = new ObjInfo(obj_info_json.type).load(obj_info_json);
          break;
      }
      entity.obj_info_map[obj_info.name] = obj_info;
      entity.obj_info_keys.push(obj_info.name);
    });
    entity.animation_map = {};
    entity.animation_keys = [];
    json.animation = makeArray(json.animation);
    json.animation.forEach(function(animation_json) {
      // @ts-ignore
      const animation = new Animation().load(animation_json);
      entity.animation_map[animation.name] = animation;
      entity.animation_keys.push(animation.name);
    });
    return this;
  }
}

class Data {
  folder_array: Folder[] = [];
  tag_def_array: TagDef[] = [];
  entity_map: { [key: string]: Entity } = {};
  entity_keys: string[] = [];
  load(json: any): Data {
    const data = this;
    const scon_version = loadString(json, "scon_version", "");
    const generator = loadString(json, "generator", "");
    const generator_version = loadString(json, "generator_version", "");
    data.folder_array = [];
    json.folder = makeArray(json.folder);
    json.folder.forEach(function(folder_json) {
      data.folder_array.push(new Folder().load(folder_json));
    });
    data.tag_def_array = [];
    json.tag_list = makeArray(json.tag_list);
    json.tag_list.forEach(function(tag_list_json) {
      data.tag_def_array.push(new TagDef().load(tag_list_json));
    });
    data.entity_map = {};
    data.entity_keys = [];
    json.entity = makeArray(json.entity);
    json.entity.forEach(function(entity_json) {
      const entity = new Entity().load(entity_json);
      // @ts-ignore
      data.entity_map[entity.name] = entity;
      // @ts-ignore
      data.entity_keys.push(entity.name);
    });
    // patch SpriteObject::pivot
    data.entity_keys.forEach(function(entity_key) {
      const entity = data.entity_map[entity_key];
      entity.animation_keys.forEach(function(animation_key) {
        const animation = entity.animation_map[animation_key];
        // @ts-ignore
        animation.timeline_array.forEach(function(timeline) {
          timeline.keyframe_array.forEach(function(timeline_keyframe) {
            if (timeline_keyframe instanceof SpriteTimelineKeyframe) {
              const sprite = timeline_keyframe.sprite;
              if (sprite.default_pivot) {
                const folder = data.folder_array[sprite.folder_index];
                const file = folder && folder.file_array[sprite.file_index];
                if (file) {
                  sprite.pivot.copy((file as ImageFile).pivot);
                }
              }
            }
          });
        });
      });
    });
    return this;
  }
  getEntities(): { [key: string]: Entity } {
    return this.entity_map;
  }
  getEntityKeys(): string[] {
    return this.entity_keys;
  }
  getAnims(entity_key: string): { [key: string]: Animation } {
    const entity = this.entity_map && this.entity_map[entity_key];
    if (entity) {
      return entity.animation_map;
    }
    return {};
  }
  getAnimKeys(entity_key: string): string[] {
    const entity = this.entity_map && this.entity_map[entity_key];
    if (entity) {
      return entity.animation_keys;
    }
    return [];
  }
}

class Pose {
  data: Data;
  entity_key: string = "";
  character_map_key_array: string[] = [];
  anim_key: string = "";
  time: number = 0;
  elapsed_time: number = 0;
  dirty: boolean = true;
  bone_array: Bone[] = [];
  object_array: BaseObject[] = [];
  sound_array: any[] = [];
  event_array: string[] = [];
  tag_array: string[] = [];
  var_map: { [key: string]: number | string } = {};
  constructor(data: Data) {
    this.data = data;
  }
  getEntities(): { [key: string]: Entity } {
    if (this.data) {
      return this.data.getEntities();
    }
    return null;
  }
  getEntityKeys(): string[] {
    if (this.data) {
      return this.data.getEntityKeys();
    }
    return null;
  }
  curEntity(): Entity {
    const entity_map = this.data.entity_map;
    return entity_map && entity_map[this.entity_key];
  }
  getEntity(): string {
    return this.entity_key;
  }
  setEntity(entity_key: string): void {
    if (this.entity_key !== entity_key) {
      this.entity_key = entity_key;
      this.anim_key = "";
      this.time = 0;
      this.dirty = true;
      this.bone_array = [];
      this.object_array = [];
    }
  }
  getAnims(): { [key: string]: Animation } {
    if (this.data) {
      return this.data.getAnims(this.entity_key);
    }
    return null;
  }
  getAnimKeys(): string[] {
    if (this.data) {
      return this.data.getAnimKeys(this.entity_key);
    }
    return null;
  }
  curAnim(): Animation {
    const anims = this.getAnims();
    return anims && anims[this.anim_key];
  }
  curAnimLength(): number {
    const pose = this;
    const data = pose.data;
    const entity = data && data.entity_map[pose.entity_key];
    const anim = entity && entity.animation_map[pose.anim_key];
    // @ts-ignore
    return (anim && anim.length) || 0;
  }
  getAnim(): string {
    return this.anim_key;
  }
  setAnim(anim_key: string): void {
    if (this.anim_key !== anim_key) {
      this.anim_key = anim_key;
      const anim = this.curAnim();
      if (anim) {
        // @ts-ignore
        this.time = wrap(this.time, anim.min_time, anim.max_time);
      }
      this.elapsed_time = 0;
      this.dirty = true;
    }
  }
  getTime(): number {
    return this.time;
  }
  setTime(time: number): void {
    const anim = this.curAnim();
    if (anim) {
      // @ts-ignore
      time = wrap(time, anim.min_time, anim.max_time);
    }
    if (this.time !== time) {
      this.time = time;
      this.elapsed_time = 0;
      this.dirty = true;
    }
  }
  update(elapsed_time: number): void {
    const pose = this;
    pose.elapsed_time += elapsed_time;
    pose.dirty = true;
  }
  strike(): void {
    const pose = this;
    if (!pose.dirty) {
      return;
    }
    pose.dirty = false;

    const entity = pose.curEntity();

    pose.var_map = pose.var_map || {};
    entity.var_defs.var_def_array.forEach(function(var_def) {
      // @ts-ignore
      if (!(var_def.name in pose.var_map)) {
        // @ts-ignore
        pose.var_map[var_def.name] = var_def.default_value;
      }
    });

    const anim = pose.curAnim();

    const prev_time = pose.time;
    const elapsed_time = pose.elapsed_time;

    pose.time = pose.time + pose.elapsed_time; // accumulate elapsed time
    pose.elapsed_time = 0; // reset elapsed time for next strike

    let wrapped_min = false;
    let wrapped_max = false;
    if (anim) {
      // @ts-ignore
      wrapped_min = elapsed_time < 0 && pose.time <= anim.min_time;
      // @ts-ignore
      wrapped_max = elapsed_time > 0 && pose.time >= anim.max_time;
      // @ts-ignore
      pose.time = wrap(pose.time, anim.min_time, anim.max_time);
    }

    const time = pose.time;

    if (anim) {
      // @ts-ignore
      const mainline_keyframe_array = anim.mainline.keyframe_array;
      const mainline_keyframe_index1 = Keyframe.find(mainline_keyframe_array, time);
      const mainline_keyframe_index2 = (mainline_keyframe_index1 + 1) % mainline_keyframe_array.length;
      const mainline_keyframe1 = mainline_keyframe_array[mainline_keyframe_index1];
      const mainline_keyframe2 = mainline_keyframe_array[mainline_keyframe_index2];
      const mainline_time1 = mainline_keyframe1.time;
      let mainline_time2 = mainline_keyframe2.time;
      if (mainline_time2 < mainline_time1) {
        // @ts-ignore
        mainline_time2 = anim.length;
      }
      let mainline_time = time;
      if (mainline_time1 !== mainline_time2) {
        let mainline_tween = (time - mainline_time1) / (mainline_time2 - mainline_time1);
        mainline_tween = mainline_keyframe1.curve.evaluate(mainline_tween);
        mainline_time = tween(mainline_time1, mainline_time2, mainline_tween);
      }

      // @ts-ignore
      const timeline_array = anim.timeline_array;

      const data_bone_array = mainline_keyframe1.bone_ref_array;
      const pose_bone_array = pose.bone_array;

      data_bone_array.forEach(function(data_bone, bone_index) {
        const timeline_index = data_bone.timeline_index;
        const timeline = timeline_array[timeline_index];
        const timeline_keyframe_array = timeline.keyframe_array;
        const keyframe_index1 = data_bone.keyframe_index;
        const keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
        const timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
        const timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
        const time1 = timeline_keyframe1.time;
        let time2 = timeline_keyframe2.time;
        if (time2 < time1) {
          // @ts-ignore
          time2 = anim.length;
        }
        let pct = 0.0;
        if (time1 !== time2) {
          pct = (mainline_time - time1) / (time2 - time1);
          pct = timeline_keyframe1.curve.evaluate(pct);
        }

        const pose_bone = <Bone>(pose_bone_array[bone_index] = pose_bone_array[bone_index] || new Bone());
        const bone_timeline_keyframe1 = <BoneTimelineKeyframe>timeline_keyframe1;
        const bone_timeline_keyframe2 = <BoneTimelineKeyframe>timeline_keyframe2;
        pose_bone.copy(bone_timeline_keyframe1.bone).tween(bone_timeline_keyframe2.bone, pct, timeline_keyframe1.spin);
        pose_bone.name = timeline.name; // set name from timeline
        pose_bone.parent_index = data_bone.parent_index; // set parent from bone_ref
      });

      // clamp output bone array
      pose_bone_array.length = data_bone_array.length;

      // compute bone world space
      pose_bone_array.forEach(function(bone) {
        const parent_bone = pose_bone_array[bone.parent_index];
        if (parent_bone) {
          Space.combine(parent_bone.world_space, bone.local_space, bone.world_space);
        } else {
          bone.world_space.copy(bone.local_space);
        }
      });

      const data_object_array = mainline_keyframe1.object_ref_array;
      const pose_object_array = pose.object_array;

      data_object_array.forEach(function(data_object, object_index) {
        const timeline_index = data_object.timeline_index;
        const timeline = timeline_array[timeline_index];
        const timeline_keyframe_array = timeline.keyframe_array;
        const keyframe_index1 = data_object.keyframe_index;
        const keyframe_index2 = (keyframe_index1 + 1) % timeline_keyframe_array.length;
        const timeline_keyframe1 = timeline_keyframe_array[keyframe_index1];
        const timeline_keyframe2 = timeline_keyframe_array[keyframe_index2];
        const time1 = timeline_keyframe1.time;
        let time2 = timeline_keyframe2.time;
        if (time2 < time1) {
          // @ts-ignore
          time2 = anim.length;
        }
        let pct = 0.0;
        if (time1 !== time2) {
          pct = (mainline_time - time1) / (time2 - time1);
          pct = timeline_keyframe1.curve.evaluate(pct);
        }

        switch (timeline.type) {
          case "sprite":
            const pose_sprite = <SpriteObject>(pose_object_array[object_index] = pose_object_array[object_index] || new SpriteObject());
            const sprite_timeline_keyframe1 = <SpriteTimelineKeyframe>timeline_keyframe1;
            const sprite_timeline_keyframe2 = <SpriteTimelineKeyframe>timeline_keyframe2;
            pose_sprite.copy(sprite_timeline_keyframe1.sprite).tween(sprite_timeline_keyframe2.sprite, pct, timeline_keyframe1.spin);
            pose_sprite.name = timeline.name; // set name from timeline
            pose_sprite.parent_index = data_object.parent_index; // set parent from object_ref
            pose_sprite['z_index_secundario'] = data_object.z_index;
            break;
          case "bone":
            const pose_bone = <Bone>(pose_object_array[object_index] = pose_object_array[object_index] || new Bone());
            const bone_timeline_keyframe1 = <BoneTimelineKeyframe>timeline_keyframe1;
            const bone_timeline_keyframe2 = <BoneTimelineKeyframe>timeline_keyframe2;
            pose_bone.copy(bone_timeline_keyframe1.bone).tween(bone_timeline_keyframe2.bone, pct, timeline_keyframe1.spin);
            pose_bone.name = timeline.name; // set name from timeline
            pose_bone.parent_index = data_object.parent_index; // set parent from object_ref
            break;
          case "box":
            const pose_box = <BoxObject>(pose_object_array[object_index] = pose_object_array[object_index] || new BoxObject());
            const box_timeline_keyframe1 = <BoxTimelineKeyframe>timeline_keyframe1;
            const box_timeline_keyframe2 = <BoxTimelineKeyframe>timeline_keyframe2;
            pose_box.copy(box_timeline_keyframe1.box).tween(box_timeline_keyframe2.box, pct, timeline_keyframe1.spin);
            pose_box.name = timeline.name; // set name from timeline
            pose_box.parent_index = data_object.parent_index; // set parent from object_ref
            break;
          case "point":
            const pose_point = <PointObject>(pose_object_array[object_index] = pose_object_array[object_index] || new PointObject());
            const point_timeline_keyframe1 = <PointTimelineKeyframe>timeline_keyframe1;
            const point_timeline_keyframe2 = <PointTimelineKeyframe>timeline_keyframe2;
            pose_point.copy(point_timeline_keyframe1.point).tween(point_timeline_keyframe2.point, pct, timeline_keyframe1.spin);
            pose_point.name = timeline.name;
            pose_point.parent_index = data_object.parent_index; // set parent from object_ref
            break;
          case "sound":
            const pose_sound = <SoundObject>(pose_object_array[object_index] = pose_object_array[object_index] || new SoundObject());
            const sound_timeline_keyframe1 = <SoundTimelineKeyframe>timeline_keyframe1;
            const sound_timeline_keyframe2 = <SoundTimelineKeyframe>timeline_keyframe2;
            pose_sound.copy(sound_timeline_keyframe1.sound).tween(sound_timeline_keyframe2.sound, pct, timeline_keyframe1.spin);
            pose_sound.name = timeline.name;
            break;
          case "entity":
            const pose_entity = <EntityObject>(pose_object_array[object_index] = pose_object_array[object_index] || new EntityObject());
            const entity_timeline_keyframe1 = <EntityTimelineKeyframe>timeline_keyframe1;
            const entity_timeline_keyframe2 = <EntityTimelineKeyframe>timeline_keyframe2;
            pose_entity.copy(entity_timeline_keyframe1.entity).tween(entity_timeline_keyframe2.entity, pct, timeline_keyframe1.spin);
            pose_entity.name = timeline.name;
            pose_entity.parent_index = data_object.parent_index; // set parent from object_ref
            break;
          case "variable":
            const pose_variable = <VariableObject>(pose_object_array[object_index] = pose_object_array[object_index] || new VariableObject());
            const variable_timeline_keyframe1 = <VariableTimelineKeyframe>timeline_keyframe1;
            const variable_timeline_keyframe2 = <VariableTimelineKeyframe>timeline_keyframe2;
            pose_variable.name = timeline.name;
            pose_variable.copy(variable_timeline_keyframe1.variable).tween(variable_timeline_keyframe2.variable, pct, timeline_keyframe1.spin);
            break;
          default:
            throw new Error(timeline.type);
        }
      });

      // clamp output object array
      pose_object_array.length = data_object_array.length;

      // apply character map
      pose.character_map_key_array.forEach(function(character_map_key) {
        const character_map = entity.character_map_map[character_map_key];
        if (character_map) {
          character_map.map_instruction_array.forEach(function(map_instruction) {
            pose_object_array.forEach(function(object) {
              switch (object.type) {
                case "sprite":
                  const sprite_object = <SpriteObject>object;
                  if (sprite_object.folder_index === map_instruction.folder_index && sprite_object.file_index === map_instruction.file_index) {
                    sprite_object.folder_index = map_instruction.target_folder_index;
                    sprite_object.file_index = map_instruction.target_file_index;
                  }
                  break;
                case "bone":
                case "box":
                case "sound":
                case "event":
                case "entity":
                case "variable":
                  break;
                default:
                  throw new Error(object.type);
              }
            });
          });
        }
      });

      // compute object world space
      pose_object_array.forEach(function(object) {
        switch (object.type) {
          case "sprite":
            const sprite_object = <SpriteObject>object;
            const bone = pose_bone_array[sprite_object.parent_index];
            if (bone) {
              Space.combine(bone.world_space, sprite_object.local_space, sprite_object.world_space);
            } else {
              sprite_object.world_space.copy(sprite_object.local_space);
            }
            const folder = pose.data.folder_array[sprite_object.folder_index];
            const file = folder && folder.file_array[sprite_object.file_index];
            if (file) {
              const image_file = <ImageFile>file;
              const pivot = sprite_object.default_pivot ? image_file.pivot : sprite_object.pivot;
              const offset_x = (0.5 - pivot.x) * image_file.width;
              const offset_y = (0.5 - pivot.y) * image_file.height;
              Space.translate(sprite_object.world_space, offset_x, offset_y);
            }
            break;
          case "bone": {
            const bone_object = <Bone>object;
            const bone = pose_bone_array[bone_object.parent_index];
            if (bone) {
              Space.combine(bone.world_space, bone_object.local_space, bone_object.world_space);
            } else {
              bone_object.world_space.copy(bone_object.local_space);
            }
            break;
          }
          case "box": {
            const box_object = <BoxObject>object;
            const bone = pose_bone_array[box_object.parent_index];
            if (bone) {
              Space.combine(bone.world_space, box_object.local_space, box_object.world_space);
            } else {
              box_object.world_space.copy(box_object.local_space);
            }
            const obj_info = entity.obj_info_map[object.name];
            if (obj_info) {
              const box_obj_info = <BoxObjInfo>obj_info;
              const offset_x = (0.5 - box_object.pivot.x) * box_obj_info.w;
              const offset_y = (0.5 - box_object.pivot.y) * box_obj_info.h;
              Space.translate(box_object.world_space, offset_x, offset_y);
            }
            break;
          }
          case "point": {
            const point_object = <PointObject>object;
            const bone = pose_bone_array[point_object.parent_index];
            if (bone) {
              Space.combine(bone.world_space, point_object.local_space, point_object.world_space);
            } else {
              point_object.world_space.copy(point_object.local_space);
            }
            break;
          }
          case "sound":
            break;
          case "entity": {
            const entity_object = <EntityObject>object;
            const bone = pose_bone_array[entity_object.parent_index];
            if (bone) {
              Space.combine(bone.world_space, entity_object.local_space, entity_object.world_space);
            } else {
              entity_object.world_space.copy(entity_object.local_space);
            }
            break;
          }
          case "variable":
            break;
          default:
            throw new Error(object.type);
        }
      });

      // process sub-entities
      pose_object_array.forEach(function(object) {
        switch (object.type) {
          case "entity":
            const entity_object = <EntityObject>object;
            const sub_pose = (entity_object.pose = entity_object.pose || new Pose(pose.data));
            const sub_entity_key = sub_pose.data.entity_keys[entity_object.entity_index];
            if (sub_entity_key !== sub_pose.getEntity()) {
              sub_pose.setEntity(sub_entity_key);
            }
            const sub_entity = sub_pose.curEntity();
            const sub_anim_key = sub_entity.animation_keys[entity_object.animation_index];
            if (sub_anim_key !== sub_pose.getAnim()) {
              sub_pose.setAnim(sub_anim_key);
              const anim_length = sub_pose.curAnimLength();
              const sub_time = entity_object.animation_time * anim_length;
              sub_pose.setTime(sub_time);
            } else {
              const anim_length = sub_pose.curAnimLength();
              const sub_time = entity_object.animation_time * anim_length;
              const sub_dt = sub_time - sub_pose.getTime();
              sub_pose.update(sub_dt);
            }
            sub_pose.strike();
            break;
        }
      });

      // process soundlines
      pose.sound_array = [];
      // @ts-ignore
      anim.soundline_array.forEach(function(soundline) {
        function add_sound(sound_keyframe: SoundlineKeyframe): void {
          const folder = pose.data.folder_array[sound_keyframe.sound.folder_index];
          const file = folder && folder.file_array[sound_keyframe.sound.file_index];
          // console.log(prev_time, sound_keyframe.time, time, "sound", file.name);
          pose.sound_array.push({ name: file.name, volume: sound_keyframe.sound.volume, panning: sound_keyframe.sound.panning });
        }

        if (elapsed_time < 0) {
          if (wrapped_min) {
            // min    prev_time           time      max
            //  |         |                |         |
            //  ----------x                o<---------
            // all events between min_time and prev_time, not including prev_time
            // all events between max_time and time
            soundline.keyframe_array.forEach(function(sound_keyframe: SoundlineKeyframe) {
              // @ts-ignore
              if ((anim.min_time <= sound_keyframe.time && sound_keyframe.time < prev_time) || (time <= sound_keyframe.time && sound_keyframe.time <= anim.max_time)) {
                add_sound(sound_keyframe);
              }
            });
          } else {
            // min       time          prev_time    max
            //  |         |                |         |
            //            o<---------------x
            // all events between time and prev_time, not including prev_time
            soundline.keyframe_array.forEach(function(sound_keyframe: SoundlineKeyframe) {
              if (time <= sound_keyframe.time && sound_keyframe.time < prev_time) {
                add_sound(sound_keyframe);
              }
            });
          }
        } else {
          if (wrapped_max) {
            // min       time          prev_time    max
            //  |         |                |         |
            //  --------->o                x----------
            // all events between prev_time and max_time, not including prev_time
            // all events between min_time and time
            soundline.keyframe_array.forEach(function(sound_keyframe: SoundlineKeyframe) {
              // @ts-ignore
              if ((anim.min_time <= sound_keyframe.time && sound_keyframe.time <= time) || (prev_time < sound_keyframe.time && sound_keyframe.time <= anim.max_time)) {
                add_sound(sound_keyframe);
              }
            });
          } else {
            // min    prev_time           time      max
            //  |         |                |         |
            //            x--------------->o
            // all events between prev_time and time, not including prev_time
            soundline.keyframe_array.forEach(function(sound_keyframe: SoundlineKeyframe) {
              if (prev_time < sound_keyframe.time && sound_keyframe.time <= time) {
                add_sound(sound_keyframe);
              }
            });
          }
        }
      });

      // process eventlines
      pose.event_array = [];
      // @ts-ignore
      anim.eventline_array.forEach(function(eventline) {
        function add_event(event_keyframe: EventlineKeyframe) {
          // console.log(prev_time, keyframe.time, time, "event", eventline.name);
          pose.event_array.push(eventline.name);
        }

        if (elapsed_time < 0) {
          if (wrapped_min) {
            // min    prev_time           time      max
            //  |         |                |         |
            //  ----------x                o<---------
            // all events between min_time and prev_time, not including prev_time
            // all events between max_time and time
            eventline.keyframe_array.forEach(function(event_keyframe: EventlineKeyframe) {
              // @ts-ignore
              if ((anim.min_time <= event_keyframe.time && event_keyframe.time < prev_time) || (time <= event_keyframe.time && event_keyframe.time <= anim.max_time)) {
                add_event(event_keyframe);
              }
            });
          } else {
            // min       time          prev_time    max
            //  |         |                |         |
            //            o<---------------x
            // all events between time and prev_time, not including prev_time
            eventline.keyframe_array.forEach(function(event_keyframe: EventlineKeyframe) {
              if (time <= event_keyframe.time && event_keyframe.time < prev_time) {
                add_event(event_keyframe);
              }
            });
          }
        } else {
          if (wrapped_max) {
            // min       time          prev_time    max
            //  |         |                |         |
            //  --------->o                x----------
            // all events between prev_time and max_time, not including prev_time
            // all events between min_time and time
            eventline.keyframe_array.forEach(function(event_keyframe: EventlineKeyframe) {
              // @ts-ignore
              if ((anim.min_time <= event_keyframe.time && event_keyframe.time <= time) || (prev_time < event_keyframe.time && event_keyframe.time <= anim.max_time)) {
                add_event(event_keyframe);
              }
            });
          } else {
            // min    prev_time           time      max
            //  |         |                |         |
            //            x--------------->o
            // all events between prev_time and time, not including prev_time
            eventline.keyframe_array.forEach(function(event_keyframe: EventlineKeyframe) {
              if (prev_time < event_keyframe.time && event_keyframe.time <= time) {
                add_event(event_keyframe);
              }
            });
          }
        }
      });

      // @ts-ignore
      if (anim.meta) {
        // process tagline
        // @ts-ignore
        if (anim.meta.tagline) {
          const add_tag = function(tag_keyframe) {
            pose.tag_array = [];
            tag_keyframe.tag_array.forEach(function(tag) {
              const tag_def = pose.data.tag_def_array[tag.tag_def_index];
              // @ts-ignore
              pose.tag_array.push(tag_def.name);
            });
            pose.tag_array.sort();
            // console.log(prev_time, tag_keyframe.time, time, "tag", pose.tag_array);
          };

          if (elapsed_time < 0) {
            if (wrapped_min) {
              // min    prev_time           time      max
              //  |         |                |         |
              //  ----------x                o<---------
              // all events between min_time and prev_time, not including prev_time
              // all events between max_time and time
              // @ts-ignore
              anim.meta.tagline.keyframe_array.forEach(function(tag_keyframe) {
                // @ts-ignore
                if ((anim.min_time <= tag_keyframe.time && tag_keyframe.time < prev_time) || (time <= tag_keyframe.time && tag_keyframe.time <= anim.max_time)) {
                  add_tag(tag_keyframe);
                }
              });
            } else {
              // min       time          prev_time    max
              //  |         |                |         |
              //            o<---------------x
              // all events between time and prev_time, not including prev_time
              // @ts-ignore
              anim.meta.tagline.keyframe_array.forEach(function(tag_keyframe) {
                if (time <= tag_keyframe.time && tag_keyframe.time < prev_time) {
                  add_tag(tag_keyframe);
                }
              });
            }
          } else {
            if (wrapped_max) {
              // min       time          prev_time    max
              //  |         |                |         |
              //  --------->o                x----------
              // all events between prev_time and max_time, not including prev_time
              // all events between min_time and time
              // @ts-ignore
              anim.meta.tagline.keyframe_array.forEach(function(tag_keyframe) {
                // @ts-ignore
                if ((anim.min_time <= tag_keyframe.time && tag_keyframe.time <= time) || (prev_time < tag_keyframe.time && tag_keyframe.time <= anim.max_time)) {
                  add_tag(tag_keyframe);
                }
              });
            } else {
              // min    prev_time           time      max
              //  |         |                |         |
              //            x--------------->o
              // all events between prev_time and time, not including prev_time
              // @ts-ignore
              anim.meta.tagline.keyframe_array.forEach(function(tag_keyframe) {
                if (prev_time < tag_keyframe.time && tag_keyframe.time <= time) {
                  add_tag(tag_keyframe);
                }
              });
            }
          }
        }

        // process varlines
        pose.var_map = pose.var_map || {};
        // @ts-ignore
        anim.meta.varline_array.forEach(function(varline) {
          const keyframe_array = varline.keyframe_array;
          const keyframe_index1 = Keyframe.find(keyframe_array, time);
          if (keyframe_index1 !== -1) {
            const keyframe_index2 = (keyframe_index1 + 1) % keyframe_array.length;
            const keyframe1 = keyframe_array[keyframe_index1];
            const keyframe2 = keyframe_array[keyframe_index2];
            const time1 = keyframe1.time;
            let time2 = keyframe2.time;
            if (time2 < time1) {
              // @ts-ignore
              time2 = anim.length;
            }
            let pct = 0.0;
            if (time1 !== time2) {
              pct = (time - time1) / (time2 - time1);
              // TODO: pct = keyframe1.curve.evaluate(pct);
            }
            const var_def = entity.var_defs.var_def_array[varline.var_def_index];
            let val: number | string = 0;
            switch (var_def.type) {
              case "int":
                val = 0 | tween(+keyframe1.val, +keyframe2.val, pct);
                break;
              case "float":
                val = tween(+keyframe1.val, +keyframe2.val, pct);
                break;
              case "string":
                val = keyframe1.val;
            }
            // console.log(prev_time, keyframe.time, time, "const", var_def.name, val, var_def.default_value);
            // @ts-ignore
            pose.var_map[var_def.name] = val;
          }
        });
      }
    }
  }
}
