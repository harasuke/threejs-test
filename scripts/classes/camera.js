import * as THREE from "../../node_modules/three/build/three.module.min.js"; 

export class Camera extends THREE.PerspectiveCamera {
// export class Camera {

  // #fov;
  // #aspect;
  // #near;
  // #far;
  // #cameraObj;

  constructor(fov, aspect, near, far, attachTo = undefined) {
    super(fov, aspect, near, far);
    // this.#fov = fov;
    // this.#aspect = aspect;
    // this.#near = near;
    // this.#far = far;

    // this.#cameraObj = new THREE.PerspectiveCamera(this.#fov, this.#aspect, this.#near, this.#far);


    if (!!attachTo) {
      this.position.set(0,0,0)
      this.lookAt(attachTo.position);
    }

    // return this.#cameraObj;
  }

  moveTo(x=0,y=0,z=0) {
    // this.#cameraObj.position.set(x,y,z);
    this.position.set(x,y,z);
  }
}
