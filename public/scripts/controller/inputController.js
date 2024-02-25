import * as THREE from "../../../node_modules/three/build/three.module.min.js"; 

window.currentlyPressedKeys = new Map();
window.handleKeypress = () => {
  for (let key of  window.currentlyPressedKeys.keys()) {
    window.player.onKeyPress(key)
  }
}

export class MovementController {

  /**
   * PitchUp based on input key or gamepad axis
   * @param {Object3D} context Context of the Object which I'm interacting with
   * @param {string} type "keydown"||"keyup" based on button status
   * @param {number?} amount Optional in case input is from keyboard. Must be specified if using controller. 
   * @returns 
   */
  static pitchUp(context, type, amount=0.03) {
    context.pitchUp = type == 'keydown' ? true : false;
    context.pitchDown = false;
    if (type == "keyup") return;
    else this.rotateX(context, 1, amount);
  }
  static pitchDown(context, type, amount=0.03) {
    context.pitchUp = false;
    context.pitchDown = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateX(context, 0, amount);
  }
  static rollLeft(context, type, amount=0.07) {
    context.rollLeft = type == 'keydown' ? true : false;
    context.rollRight = false;
    if (type == "keyup") return;
    else this.rotateZ(context, 1, amount);
  }
  static rollRight(context, type, amount=0.07){
    context.rollLeft = false;
    context.rollRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateZ(context, 0, amount);
  }
  static yawLeft(context, type, amount=0.005) {
    context.yawLeft = type == 'keydown' ? true : false;
    context.yawRight = false;
    if (type == "keyup") return;
    else this.rotateY(context, 1, amount);
  }
  static yawRight(context, type, amount=0.005){
    context.yawLeft = false;
    context.yawRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateY(context, 0, amount);
  }
  static increaseSpeed(context) {
    if (context.speed + context.acceleration > context.maxSpeed) return context.speed = context.maxSpeed;
    context.speed += context.acceleration;
  }
  static decreaseSpeed(context) {
    if (context.speed - 0.02 <= 0) return context.speed = 0;
    context.speed -= 0.02;
  }

  static pitchUpVector = new THREE.Vector3(1,0,0).normalize();
  static pitchDownVector = new THREE.Vector3(-1,0,0).normalize();
  static rollLeftVector = new THREE.Vector3(0,0,1).normalize();
  static rollRightVector = new THREE.Vector3(0,0,-1).normalize();
  static yawLeftVector = new THREE.Vector3(0,1,0).normalize();
  static yawRightVector = new THREE.Vector3(0,-1,0).normalize();

  static rotateX(context, type, amount) {
    if (type) context.rotateOnAxis(this.pitchUpVector, amount);
    else context.rotateOnAxis(this.pitchDownVector, amount);
  }
  static rotateY(context, type, amount) {
    if (type) {
      context.rotateOnAxis(this.yawLeftVector, amount);
    }
    else {
      context.rotateOnAxis(this.yawRightVector, amount);
    }
  }
  static rotateZ(context, type, amount) {
    if (type) context.rotateOnAxis(this.rollLeftVector, amount);
    else context.rotateOnAxis(this.rollRightVector, amount)
  }

}

export class GamepadController extends MovementController {

  static pitch(context, amount) {
    this.rotateX(context, true, amount)
  }

  static roll(context, amount) {
    this.rotateZ(context, true, amount)
  }

  static yaw(context, amount) {
    this.rotateY(context, true, amount)
  }
}

export const Commands = {
  TOP_ARROW: 38,
  LEFT_ARROW: 37,
  BOTTOM_ARROW: 40,
  RIGHT_ARROW: 39,
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  SPACEBAR: 32,
  H: 72,
  L: 76,
  '0': 48,
  '1': 49,
  SHIFT: 16,
  LEFT_CTRL: 17,
  GAMEPAD_LEFT_AXIS_X: -10,
  GAMEPAD_LEFT_AXIS_Y: -11,
  GAMEPAD_RIGHT_AXIS_X: -12,
  GAMEPAD_RIGHT_AXIS_Y: -13,
  16: 'SHIFT',
  17: 'LEFT_CTRL',
  32: 'SPACEBAR',
  37: 'LEFT_ARROW',
  38: 'TOP_ARROW',
  39: 'RIGHT_ARROW',
  40: 'BOTTOM_ARROW',
  48: '0',
  49: '1',
  65: 'A',
  68: 'D',
  72: 'H',
  76: 'L',
  83: 'S',
  87: 'W',
};