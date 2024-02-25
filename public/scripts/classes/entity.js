import * as THREE from "../../../node_modules/three/build/three.module.min.js";
import { Camera } from "./camera.js";
import { MovableEntity } from "./movable-entity.js";

/**
 * A class for generating an entity and attach it to the Node provided
 */
export class Entity extends THREE.Object3D {
  /**
   * @type {Camera}
   * @description Camera object that follows the entity
   */
  #myCamera = null;

  #geometry;
  #material;
  #mesh;

  /**
   * @typedef {{
   *  coords: {x:number, y:number, z:number},
   *  size: {width: number, height: number, depth: number}
   *  attachTo: THREE.Scene|THREE.Node,
   *  camera: boolean,
   *  movementData: {pitchSpeed: number, rollSpeed: number, yawSpeed: number}
   * }} Options
   *
   * @param {Options} opts - {@linkcode Options}
   */
  constructor(opts) {
    super();
    this.position.x = opts.coords.x;
    this.position.y = opts.coords.y;
    this.position.z = opts.coords.z;

    this.#geometry = new THREE.BoxGeometry(
      opts.size?.width || 1,
      opts.coords.height || 1,
      opts.size?.depth || 1
    );
    this.#material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue
    this.#mesh = new THREE.Mesh(this.#geometry, this.#material);
    this.add(this.#mesh);

    if (opts.movementData) {
      this.pitchSpeed = opts?.movementData?.pitchSpeed || 0.01;
      this.rollSpeed = opts?.movementData?.rollSpeed || 0.01;
      this.yawSpeed = opts?.movementData?.yawSpeed || 0.01;
    }

    if (opts.movable) {
      Object.assign(this, MovableEntity);
    }

    if (!!opts.attachTo) opts.attachTo.add(this);
    if (opts.camera) {
      this.camera = new Camera(75, 2, 0.1, 100, this);
      this.camera.position.set(0,2.4,3);
      this.add(this.camera)
      window.cameras.push(this.camera);
    }
  }

  get position() {
    return this.position;
  }

  get mesh() {
    return this.#mesh;
  }

  /**
   * Handle the key pressed only if it's movable
   * @param {KeyboardEvent.keyCode} keyCode Code of the pressed key
   * @param {boolean} type true when keydown fires; false when keyup fires
   */
  onKeyPress(keyCode, type=true) {
    if (!this.isMovable) return;
    this.commandAction(this, keyCode, type);
  }

  moveTo(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    // this.camera.moveTo(this.position.x, this.position.y + 2, this.position.z + 3)
  }

  update(tickTime) {
    // this.heading.z -= tickTime;
    // this.moveTo(this.heading.x, this.heading.y, this.heading.z);
    this.translateZ(-this.speed)

    // console.log(this.heading)
    // console.log(this.newHeading)
    // this.moveTo(this.heading)
    // console.log(this.localToWorld(this.position))
  }

  get refToGlobalSpace() {
    console.log("hey", this.position);
    return this.position;
  }
}
