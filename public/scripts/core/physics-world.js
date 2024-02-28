// AmmoJS library is declared as a standalone module directly in the HEAD tag of HTML.
// To access it, i just need to be sure that is loaded and i can create the Physic World.
export class PhysicsWorld {
  constructor() {
    Ammo().then(() => {
        window.tmpTrans = new Ammo.btTransform();
        this.#setUpPhysicsWorld();
    });
  }

  #setUpPhysicsWorld() {
    this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.overlappingPairCache = new Ammo.btDbvtBroadphase();
    this.solver = new Ammo.btSequentialImpulseConstraintSolver();

    this.world = new Ammo.btDiscreteDynamicsWorld(
      this.dispatcher,
      this.overlappingPairCache,
      this.solver,
      this.collisionConfiguration
    );
    this.world.setGravity(new Ammo.btVector3(0, -9.81, 0));
  }

  update(deltaTime) {
    this.world.stepSimulation(deltaTime, 10);
    for (let i=0; i<window.rigidBodies.length; i++) {
        let visualObjReference = rigidBodies[i];
        let physiscalObjReference = visualObjReference.userData.physicsBody;
        let ms = physiscalObjReference.getMotionState();
        if (ms) {
            ms.getWorldTransform(tmpTrans);
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            visualObjReference.position.set(p.x(), p.y(), p.z())
            visualObjReference.quaternion.set(q.x(), q.y(), q.z())
        }
    }
  }
}
