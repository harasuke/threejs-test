import * as THREE from "../../node_modules/three/build/three.module.min.js"; 

export class Camera extends THREE.PerspectiveCamera {

  #attachedTo = null;

  constructor(fov, aspect, near, far, attachTo = undefined) {
    super(fov, aspect, near, far);

    if (!!attachTo) {
      this.#attachedTo = attachTo;
      this.position.set(0,2,attachTo.position.z + 2)
      this.lookAt(attachTo.position.x, attachTo.position.y, attachTo.position.z - 3);
    }
  }

  moveTo(x=0,y=0,z=0) {
    // this.#cameraObj.position.set(x,y,z);
    this.position.set(x,y,z);
  }

  updateView() {
    // this.position.set(0,2,this.#attachedTo.position.z + 2);
    // this.lookAt(this.#attachedTo.position.x, this.#attachedTo.position.y, this.#attachedTo.position.z - 3);
    // let x = this.#attachedTo.localToWorld(this.#attachedTo.position);
    // console.log(this.#attachedTo.localToWorld(this.#attachedTo.position))
    // this.position.set(x.x, x.y+2, x.z-2);
    // this.lookAt(x.x, x.y, x.z - 3);
  }
}
