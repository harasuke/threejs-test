import * as THREE from "../node_modules/three/build/three.module.min.js";
import { World } from "./world.js";
import { Entity } from "./classes/entity.js";

const world = new World("#game-screen", true);
window.onresize = world.onResize();
var objects = [];

const player = new Entity({ coords: { x: 0, y: 0, z: -1 }, movable: true, attachTo: world.scene, camera: true });
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
    tickTime *= 0.001; // convert time to seconds

    world.camera.updateProjectionMatrix();
    world.render();
    world.controls.update();
    animate();
  });
}
animate();

let x = 0;
world.canvas.addEventListener("keydown", (e) => {
  objects.forEach(q => q.onKeyPress(e))
});
