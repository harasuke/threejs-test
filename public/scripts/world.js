import * as THREE from "../../node_modules/three/build/three.module.min.js";
// import * as LOADER from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
// import { LoadingManager } from "../node_modules/three/src/loaders/LoadingManager.js";
import { OrbitControls } from "./core/OrbitControls.js";
// import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { Camera } from "./classes/camera.js";

export class World {

  constructor(targetCanvasId, useAxes) {
    this.canvas = document.querySelector(targetCanvasId);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
    this.renderer.setSize(this.canvas.getBoundingClientRect().width, this.canvas.getBoundingClientRect().height);
    this.#setCamera();
    this.#setScene();
    this.#setSkybox();
    this.#setControls();
    // this.#setTerrain();

    if (useAxes) {
      this.scene.add(this.createAxes(5));
    }
  }

  #setCamera() {
    this.camera = new Camera(75, 2, 0.1, 100);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    window.cameras.push(this.camera);
  }

  #setScene() {
    this.scene = new THREE.Scene();
    this.scene.add(this.createLight({coords:{x: -1, y: 5, z: 0}}));
    const light = new THREE.AmbientLight(0x404040);
    this.scene.add(light);
  }

  #setSkybox() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "./assets/skybox/xpos.png",
      "./assets/skybox/xneg.png",
      "./assets/skybox/ypos.png",
      "./assets/skybox/yneg.png",
      "./assets/skybox/zpos.png",
      "./assets/skybox/zneg.png",
    ]);
    this.scene.background = texture;
  }

  #setControls() {
    this.controls = new OrbitControls( this.camera, this.canvas );
    this.controls.listenToKeyEvents( window ); // optional
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  async #setTerrain() {
    const loader = new GLTFLoader();
    this.terrain = await loader.loadAsync('/assets');


  }

  onResize() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', 0.5625*window.innerWidth); // mantengo sempre i  16/9.

  // document.getElementById("game-screen").setAttribute('width', window.innerWidth);
  // document.getElementById("game-screen").setAttribute('height', 0.5625*window.innerWidth); // mantengo sempre i  16/9.
    this.canvas.style = "";
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    window.cameras.forEach(camera => {
      camera.updateProjectionMatrix();
    });
    // world.renderer.setSize(window.innerWidth, 0.5625*window.innerWidth, false);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
  }

  createAxes(size = 1) {
    const axes = new THREE.AxesHelper(size);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    return axes;
  }

  createLight(opts) {
    let intensity = 3;
    let light = new THREE.DirectionalLight(0xFFFFFF, intensity);
    light.position.set(opts?.coords?.x || 10, opts?.coords?.y || 10, opts?.coords?.z || 10);
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

  render(camera=this.camera) {
    this.renderer.render(this.scene, camera);
  }

}
