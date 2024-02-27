
import * as CANNON from "../../../node_modules/cannon-es/dist/cannon-es.js";
import { Entity } from "./entity.js"

export class PhysicsEntity {
    
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
        this.applyPhysicsTo = new Entity(opts);
        this.physicsBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(
              opts.coords.x,
              opts.coords.y,
              opts.coords.z
            ),
            shape: new CANNON.Box(new CANNON.Vec3(1,1,1)),
          })
        window.world.phWorld.addBody(this.physicsBody)
    }

    commandAction(context, keyCode, type){
        this.applyPhysicsTo.commandAction(this.applyPhysicsTo, keyCode, type)
    }

    update() {
        // this.applyPhysicsTo.position.copy(this.physicsBody.position);
        // this.applyPhysicsTo.quaternion.copy(this.physicsBody.quaternion);
    }
}