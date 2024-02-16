import * as THREE from "../node_modules/three/build/three.module.min.js";
import { Camera } from "./classes/camera.js";

export class Game {
  #useAxes;

  constructor(useAxes) {
    this.#setupWorld();

    if (useAxes) {
      this.scene.add(this.createAxes(5));
    }
  }

  #setupWorld() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.#setCamera();
  }

  #setCamera() {
    this.camera = new Camera(75, 2, 0.1, 100);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
  }

  #setScene() {
    this.scene = new THREE.Scene();
    this.scene.add(this.light);


    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
  }

  #setLight() {
    this.light = this.createLight();

  }

  createLight(opts) {
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(opts?.coords?.x || 100, opts?.coords?.y || 100, opts?.coords?.z || 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.1;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 1.0;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = 200;
    light.shadow.camera.right = -200;
    light.shadow.camera.top = 200;
    light.shadow.camera.bottom = -200;
    return light;
  }

  #createAxes(size = 1) {
    const axes = new THREE.AxesHelper(size);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    return axes;
  }
}
