import * as THREE from "../../node_modules/three/build/three.module.min.js"; 
import { Commands } from "./commands.js";

export class MovementController {

  static pitchUp(context, type) {
    context.pitchUp = type == 'keydown' ? true : false;
    context.pitchDown = false;
    if (type == "keyup") return;
    else this.rotateX(context, 1, 0.008);
  }
  static pitchDown(context, type) {
    context.pitchUp = false;
    context.pitchDown = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateX(context, 0, 0.008);
  }
  static rollLeft(context, type) {
    context.rollLeft = type == 'keydown' ? true : false;
    context.rollRight = false;
    if (type == "keyup") return;
    else this.rotateZ(context, 1, 0.07);
  }
  static rollRight(context, type){
    context.rollLeft = false;
    context.rollRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateZ(context, 0, 0.07);
  }
  static yawLeft(context, type) {
    context.yawLeft = type == 'keydown' ? true : false;
    context.yawRight = false;
    if (type == "keyup") return;
    else this.rotateY(context, 1, 0.005);
  }
  static yawRight(context, type){
    context.yawLeft = false;
    context.yawRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateY(context, 0, 0.005);
  }
  static increaseSpeed(context) {
    if (context.speed + context.accelleration > context.maxSpeed) return context.speed = context.maxSpeed;
    context.speed += context.accelleration;
  }
  static decreaseSpeed(context) {
    if (context.speed - 0.02 <= 0) return context.speed = 0;
    context.speed -= 0.02;
  }

  static quaternionX_p = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0).normalize(), 0.1);
  static quaternionX_m = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-1,0,0).normalize(), 0.1);
  static quaternionY_p = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), 0.1);
  static quaternionY_m = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,-1,0).normalize(), 0.1);
  static quaternionZ_p = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1).normalize(), 0.1);
  static quaternionZ_m = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,-1).normalize(), 0.1);
  // quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), -Math.PI/4);
  static pitchUpVector = new THREE.Vector3(1,0,0).normalize();
  static pitchDownVector = new THREE.Vector3(-1,0,0).normalize();
  static rollLeftVector = new THREE.Vector3(0,0,1).normalize();
  static rollRightVector = new THREE.Vector3(0,0,-1).normalize();
  static yawLeftVector = new THREE.Vector3(0,1,0).normalize();
  static yawRightVector = new THREE.Vector3(0,-1,0).normalize();


  static rotateX(context, type, amount=0.1) {
    if (type) context.rotateOnAxis(this.pitchUpVector, amount);
    else context.rotateOnAxis(this.pitchDownVector, amount);
  }
  static rotateY(context, type, amount=0.1) {
    if (type) {
      context.rotateOnAxis(this.yawLeftVector, amount);
    }
    else {
      context.rotateOnAxis(this.yawRightVector, amount);
    }
  }
  static rotateZ(context, type, amount=0.1) {
    if (type) context.rotateOnAxis(this.rollLeftVector, amount);
    else context.rotateOnAxis(this.rollRightVector, amount)
  }

}