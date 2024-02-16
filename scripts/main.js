import * as THREE from "../node_modules/three/build/three.module.min.js";
import { Entity } from "./classes/entity.js";
import { Commands } from "./classes/commands.js";
import { Camera } from "./classes/camera.js";
// import { OrbitControls } from "../node_modules/three-full/sources/controls/OrbitControls.js";
import { OrbitControls } from "./classes/OrbitControls.js";

const canvas = document.querySelector("#game-screen");
var objects = [];

let controls;

let x = 0;
canvas.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  if (e.keyCode == Commands.LEFT_ARROW) {
    objects.forEach((q) => q.moveTo(0, x, 0));
    x += 1;
  }
  if (e.keyCode == Commands.RIGHT_ARROW) {
    objects.forEach((q) => q.moveTo(0, x, 0));
    x -= 1;
  }
});

function main() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const camera = new Camera(75, 2, 0.1, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  //   scene.add(axes);

  const scene = new THREE.Scene();
  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(100, 100, 100);
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
  scene.add(light);

  light = new THREE.AmbientLight(0x404040);
  scene.add(light);


  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "../assets/skybox/xpos.png",
    "../assets/skybox/xneg.png",
    "../assets/skybox/ypos.png",
    "../assets/skybox/yneg.png",
    "../assets/skybox/zpos.png",
    "../assets/skybox/zneg.png",
  ]);
  scene.background = texture;

  // const globalspace = new THREE.Object3D();
  const globalaxes = new THREE.AxesHelper();
  globalaxes.material.depthTest = true;
  globalaxes.renderOrder = 1;
  // globalspace.add(axes);

  // scene.add(globalspace);
  //   {
  //     const color = 0xffffff;
  //     const intensity = 3;
  //     const light = new THREE.DirectionalLight(color, intensity);
  //     light.position.set(-1, 2, 4);
  //     scene.add(light);
  //   }

  const player = new Entity({ coords: { x: -5, y: 0, z: -3 }, attachTo: scene, camera: true });
  //   player.camera.lookAt(0, 0, 0);
  objects.push(player);

    controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents( window ); // optional
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

  const box = new Entity({ coords: { x: 5, y: 5, z: -15 }, attachTo: scene });
  const box1 = new Entity({ coords: { x: 10, y: 0, z: -7 }, attachTo: scene });
  const box2 = new Entity({ coords: { x: -5, y: 0, z: -15 }, attachTo: scene });
  const box3 = new Entity({ coords: { x: 5, y: 0, z: -15 }, attachTo: scene });

  player.add(axes);

  const wrap = new THREE.Object3D();
  wrap.add(box);
  wrap.add(box1);
  wrap.add(box2);
  wrap.add(box3);
  wrap.add(globalaxes);
  scene.add(wrap);


  renderer.setPixelRatio(window.devicePixelRatio);
  function animate() {
    requestAnimationFrame((tickTime) => {
      tickTime *= 0.001; // convert time to seconds
      player.rotation.x = tickTime;
      player.moveTo(tickTime, 0, 0);

      player.camera.updateProjectionMatrix();
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      controls.update();
      animate();
    });
  }
  animate();

}

main();


