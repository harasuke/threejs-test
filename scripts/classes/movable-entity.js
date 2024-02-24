import * as THREE from "../../node_modules/three/build/three.module.min.js"; 
import { MovementController } from "./keyController.js";
import { Commands } from "./commands.js";

export const MovableEntity = {
  isMovable: true,

  movingLeft: false,
  movingRight: false,
  movingUp: false,
  movingDown: false,

  pitchUp: false,
  pitchDown: false,

  rollRight: false,
  rollLeft: false,

  yawLeft: false,
  yawRight: true,

  speed: 0,
  maxSpeed: 1.5,
  heading: new THREE.Vector3(0,0,-1),

  /**
   * Handle user keypress and make things happends on the object.
   * @param {Object3D} context Context of the item which I'm interacting with
   * @param {KeyboardEvent.keyCode} keyCode Code of the pressed key
   * @param {boolean} type true when keydown fires; false when keyup fires
   */
  commandAction: (context, keyCode, type) => {
    switch (keyCode) {
      case Commands.W:
        MovementController.pitchDown(context, type);
        break;
      case Commands.A:
        MovementController.rollLeft(context, type);
        break;
      case Commands.S:
        MovementController.pitchUp(context, type);
        break;
      case Commands.D:
        MovementController.rollRight(context, type);
        break;
      case Commands.H:
        MovementController.yawLeft(context, type);
        break;
      case Commands.L:
        MovementController.yawRight(context, type);
        break;
      case Commands.SHIFT:
        MovementController.increaseSpeed(context, type);
        break;
      case Commands.LEFT_CTRL:
        MovementController.decreaseSpeed(context, type);
        break;
    }
  },
};
