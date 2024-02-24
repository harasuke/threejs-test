import * as THREE from "../node_modules/three/build/three.module.min.js";
import { World } from "./world.js";
import { Entity } from "./classes/entity.js";
import { Commands } from "./classes/commands.js";

window.objects = [];
window.cameras = [];
window.currentCamera = 0;

const world = new World("#game-screen", true);
window.onresize = world.onResize();
window.worldContext = world;

const player = new Entity({ coords: { x: 0, y: 0, z: -2 }, size: {width: 1, height: 1, depth: 2}, movable: true, attachTo: world.scene, camera: true });
player.add(world.createAxes());
objects.push(player);

const box = new Entity({ coords: { x: 5, y: 5, z: -15 }, attachTo: world.scene });
const box1 = new Entity({ coords: { x: 10, y: 0, z: -7 }, attachTo: world.scene });
const box2 = new Entity({ coords: { x: -5, y: 0, z: -15 }, attachTo: world.scene });
const box3 = new Entity({ coords: { x: 5, y: 0, z: -15 }, attachTo: world.scene });
const wrap = new THREE.Object3D();
wrap.add(box);
wrap.add(box1);
wrap.add(box2);
wrap.add(box3);
world.scene.add(wrap);

function animate() {
  requestAnimationFrame((tickTime) => {
    tickTime *= 0.00001; // convert time to seconds

    player.update(tickTime);

    handleKeypress();

    // world.camera.updateProjectionMatrix();
    world.render(cameras[window.currentCamera]);
    world.controls.update();
    animate();
  });
}
animate();

window.currentlyPressedKeys = new Map();
function handleKeypress() {
  for (let key of  window.currentlyPressedKeys.keys()) {
    player.onKeyPress(key)
  }
}

world.canvas.addEventListener("keydown", (e) => {
  window.currentlyPressedKeys.set(e.keyCode, 0);
});
world.canvas.addEventListener("keyup", (e) => {
  objects.forEach(q => q.onKeyPress(window.currentlyPressedKeys, false))
  window.currentlyPressedKeys.delete(e.keyCode)
});
