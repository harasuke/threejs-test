import * as THREE from "../../node_modules/three/build/three.module.min.js"; 
import { Commands } from "./commands.js";

// export class KeyController {

//   constructor(parentPosition = new THREE.Vector3(0,0,0)) {
//     this.speed = 2;
//     this.xrot = 0;
//     this.yrot = 0;

//     this.headingVector = new THREE.Vector3(0,0,-1);
//     let headingPoints = [];
//     console.log(parentPosition, this.headingVector)
//     headingPoints.push(parentPosition);
//     headingPoints.push(this.headingVector);
//     this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
//     this.headingLine = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xff00ff, depthTest: false }));
//     this.headingLine.renderOrder = 1;


//     // Line rappresenta la linea dell'heading dopo aver applicato la rotazione sugli assi

//     this.newHeading = this.headingVector.clone();
//     this.quaternion = new THREE.Quaternion();
//     this.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), -Math.PI/4);
//     this.newHeading.applyQuaternion(this.quaternion);
//     headingPoints = [];
//     headingPoints.push(parentPosition);
//     headingPoints.push(this.newHeading);
//     this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
//     this.line = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xffff00, depthTest: false }));
//   }

//   onKeyPress(keyCode) {
//     console.log('handling keypresses');
//     switch (keyCode) {
//       case Commands.W:
//         break;
//       case Commands.A: break;
//       case Commands.S: break;
//       case Commands.D: break;
//     }
//   }
// }

export class MovementController {

  static pitchUp(context, type) {
    context.pitchUp = type == 'keydown' ? true : false;
    context.pitchDown = false;
    if (type == "keyup") return;
    else this.rotateX(context, 1);
  }
  static pitchDown(context, type) {
    context.pitchUp = false;
    context.pitchDown = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateX(context, 0);
  }
  static rollLeft(context, type) {
    context.rollLeft = type == 'keydown' ? true : false;
    context.rollRight = false;
    if (type == "keyup") return;
    else this.rotateZ(context, 1);
  }
  static rollRight(context, type){
    context.rollLeft = false;
    context.rollRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateZ(context, 0);
  }
  static yawLeft(context, type) {
    context.yawLeft = type == 'keydown' ? true : false;
    context.yawRight = false;
    if (type == "keyup") return;
    else this.rotateY(context, 1);
  }
  static yawRight(context, type){
    context.yawLeft = false;
    context.yawRight = type == 'keydown' ? true : false;
    if (type == "keyup") return;
    else this.rotateY(context, 0);
  }
  static increaseSpeed(context) {
    if (context.speed + 0.02 > context.maxSpeed) return context.speed = context.maxSpeed;
    context.speed += 0.02;
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
    if (type) context.rotateOnAxis(this.pitchUpVector, .1);
    else context.rotateOnAxis(this.pitchDownVector, .1)
    // if (type) context.applyQuaternion(this.quaternionX_p);
    // else context.applyQuaternion(this.quaternionX_m);
  }
  static rotateY(context, type, amount=0.1) {
    if (type) {
      context.rotateOnAxis(this.yawLeftVector, .1)
      // context.applyQuaternion(this.quaternionY_p);
      // context.heading.applyQuaternion(this.quaternionY_p);
    }
    else {
      context.rotateOnAxis(this.yawRightVector, .1)
      // context.applyQuaternion(this.quaternionY_m);
      // context.heading.applyQuaternion(this.quaternionY_m);
    }
  }
  static rotateZ(context, type, amount=0.1) {
    // if (type) context.rotation.z += 0.1;
    // else context.rotation.z -= 0.1;
    // if (type) context.applyQuaternion(this.quaternionZ_p);
    // else context.applyQuaternion(this.quaternionZ_m);
    if (type) context.rotateOnAxis(this.rollLeftVector, .1);
    else context.rotateOnAxis(this.rollRightVector, .1)
  }

}