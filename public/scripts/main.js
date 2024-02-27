import * as THREE from "../../node_modules/three/build/three.module.min.js";
import * as CANNON from "../../node_modules/cannon-es/dist/cannon-es.js";
import { World } from "./world.js";
import { Entity } from "./classes/entity.js";
import { Commands } from "./controller/inputController.js";
import { PhysicsEntity } from "./classes/physics-entity.js";

/**
 * All 3d entity in the scene
 * @type {Array.<Entity>} */
var objects = window.objects = [];

/** 
 * All available cameras
 * @type {Array.<Camera>} */
var cameras = window.cameras = [];

/** 
 * Current camera index for the array of _Camera_
 * @type {number} */
var currentCamera = window.currentCamera = 0;

var world = window.world = new World("#game-screen", true);
window.onresize = world.onResize();
window.worldContext = world;

/** 
 * The Entity controlled by the player.
 * @type {Entity} */
const player = window.player = new Entity({
  coords: { x: 0, y: 0, z: -2 },
  size: {width: 1, height: 1, depth: 2},
  movable: true,
  attachTo: world.scene,
  camera: true
});
// player.add(world.createAxes());
// player.mesh.add(world.createAxes());

objects.push(player);
window.player = player;

const wrap = new THREE.Object3D();
const box = new Entity({ coords: { x: 5, y: 5, z: -15 }, attachTo: wrap });
const box1 = new Entity({ coords: { x: 10, y: 0, z: -7 }, attachTo: wrap });
const box2 = new Entity({ coords: { x: -5, y: 0, z: -15 }, attachTo: wrap });
const box3 = new Entity({ coords: { x: 5, y: 0, z: -15 }, attachTo: wrap });
world.scene.add(wrap);

function animate() {
  document.getElementById('object-data').innerHTML = window.player.speed;
  requestAnimationFrame((tickTime) => {
    tickTime *= 0.00001; // convert time to seconds

    player.update(tickTime);

    handleKeypress(); // Keyboard input

    /** Probably slows down app, must check */
    gamepadEvent(); // Gamepad Input
    

    // world.camera.updateProjectionMatrix();
    world.update();
    // world.phWorld.step(world.phWorld.phTimeStep);

    world.render(cameras[window.currentCamera]);
    world.controls.update();
    animate();
  });
}
animate();

/** 
 * Reference to all the current keys pressed.
 * @type {Map} */
var currentlyPressedKeys = window.currentlyPressedKeys = new Map();

/** Handle the different key pressed and fires the Action for the key. */
handleKeypress = window.handleKeypress = () => {
  for (let key of  currentlyPressedKeys.keys()) {
    player.commandAction(player, key, true)
  }
}

/**
 * Listen when the key is pressed and update the currently pressed key Map.
 */
world.canvas.addEventListener("keydown", (e) => {
  window.currentlyPressedKeys.set(e.keyCode, 0);

  if (e.keyCode == Commands[1]) window.currentCamera = 1;
  if (e.keyCode == Commands[0]) window.currentCamera = 0;
});

/**
 * Listen when the key is released.  
 * Sends different value to the movable-entity function.
 */
world.canvas.addEventListener("keyup", (e) => {

  player.commandAction(player, window.currentlyPressedKeys, false)
  window.currentlyPressedKeys.delete(e.keyCode)
});
