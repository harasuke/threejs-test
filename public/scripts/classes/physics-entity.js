import { Entity } from "./entity.js";

export class PhysicsEntity extends Entity {
    /**
     * 
     * aircraftModel should be the static class of the respective selected model
     * @typedef {{
     *  coords: {x:number, y:number, z:number},
     *  quaternion: {x: number, y: number, z: number, w: number}
     *  size: {width: number, height: number, depth: number}
     *  mass: number,
     *  aircarftModel: Joshdog_H14 | Hummingbird_H16
     *  attachTo: THREE.Scene|THREE.Node,
     *  camera: boolean,
     *  movementData: {pitchSpeed: number, rollSpeed: number, yawSpeed: number}
     * }} Options
     *
     * @param {Options} opts - {@linkcode Options}
     */
    constructor(opts) {
      super(opts);

    //   this.quaternion = {
    //     x: opts.quaternion?.x ?? 0,
    //     y: opts.quaternion?.y ?? 0,
    //     z: opts.quaternion?.z ?? 0,
    //     w: opts.quaternion?.w ?? 1
    //   };
      this.size = { x: opts.size.x, y: opts.size.y, z: opts.size.z };
      this.mass = opts.mass ?? 0;
  
      this.transform = this[`${opts.aircarftModel}`];
      this.aircarftModel = opts.aircarftModel
    }
  
    // set quaternion(newQuaternion) {
    //     this.quaternion = newQuaternion;
    // }
    
    static jetFalcon() {
      let tra;
    }
  }
  

export class Aircraft {
    static init() {
        this.transform = new Ammo.btTransform();
        this.motionState = new Ammo.btDefaultMotionState(this.transform);
    }

  static setTransformInfo(opts) {
    this.transform.setIdentity();
    this.transform.setOrigin(new Ammo.btVector3(opts.coords.x, opts.coords.y, opts.coords.z));
    this.transform.setRotation(new Ammo.btQuaternion(opts.quaternion.x, opts.quaternion.y, opts.quaternion.z));
  }
}

export class Joshdog_H14 extends Aircraft {
    // TODO: dovró impostare dei dati predefiniti.
    static init() {
        this.colShape = new Ammo.btBoxShape(new Ammo.btVector3(1,1,2));
        this.colShape.setMargin(0.05);
        
        this.mass = 150;
        this.localInertia = new Ammo.btVector3(0, 0, 0);
        this.colShape.calculateLocalInertia(this.mass, this.localInertia);
        
        this.rigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(this.mass, Aircraft.motionState, Aircraft.colShape, Aircraft.localInertia);
        this.body = new Ammo.btRigidBody(this.rigidBodyInfo);

        console.log(this.rigidBodyInfo)
        this.body.setActivationState(4); // STATE.DISABLE_DEACTIVATION
        this.body.setCollisionFlags(2); // FLAGS.CF_KINEMATIC_OBJECT
        window.physicsWorld.world.addRigidBody(this.body);
        // TODO devo fare il push su rigidBodies del player e fare l'assegnazione userData.physicsBody
    }

    static mass() { return console.log(this.mass) }

    static impulse(amount) {
        new Ammo.btVector(0,0, amount);
    }

    static hello(){ console.log('hello from joshdog')}
}

class Hummingbird_H16 extends Aircraft {

}
