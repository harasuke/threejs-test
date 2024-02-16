import * as THREE from "../../node_modules/three/build/three.module.min.js"; 
import { Camera } from "./camera.js";
import { KeyController } from "./keyController.js";

/**
 * A class for generating an entity and attach it to the Node provided
 */
export class Entity extends THREE.Object3D {
  /**
   * @type {Camera}
   * @description Camera object that follows the entity
   */
  #myCamera = null;

  #keyController = null;

  #material;
  #mesh;

  /**
   * @typedef {{
   *  coords: {x:number, y:number, z:number},
   *  size: {width: number, height: number, depth: number}
   *  attachTo: THREE.Scene|THREE.Node,
   *  camera: boolean
   * }} Options
   * 
   * @param {Options} opts - {@linkcode Options}
   */
  constructor(opts) {
    super();
    this.position.x = opts.coords.x;
    this.position.y = opts.coords.y;
    this.position.z = opts.coords.z;

    this.geometry = new THREE.BoxGeometry(
        opts.size?.width || 1,
        opts.coords.height || 1,
        opts.size?.depth || 1
    );
    this.#material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue
    this.#mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.#mesh);

    if (opts.movable) {
      this.keyController = new KeyController(this.#mesh.position);

      this.rotation.x = this.keyController.newHeading.x;
      this.rotation.y = this.keyController.newHeading.y;
      this.rotation.z = this.keyController.newHeading.z;
      
      if (!!opts.attachTo) {
        this.add(this.keyController.line)
        this.add(this.keyController.headingLine)
        // opts.attachTo.add(this.keyController.line)
        // opts.attachTo.add(this.keyController.headingLine1)

      }
    }

    if (!!opts.attachTo)
        opts.attachTo.add(this);
    if (opts.camera)
        this.#myCamera = new Camera(75, 2, 0.1, 100, this.#mesh);
  }

  get camera() {
    return this.#myCamera;
  }

  get position() {
    return this.position;
  }

  onKeyPress(e) {
    if (!!!this.#keyController) return;
    this.#keyController.onKeyPress(e);
  }

  moveTo(x,y,z) {
    // this.#mesh.position.x = x;
    // this.#mesh.position.y = y;
    // this.#mesh.position.z = z;
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;

    if (!!this.#myCamera) {
      this.#myCamera.moveTo(x-10,y-10,z-10);
      this.#myCamera.lookAt(this.position);
    }
  }

}
