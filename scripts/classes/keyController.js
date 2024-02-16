import * as THREE from "../../node_modules/three/build/three.module.min.js"; 
import { Commands } from "./commands.js";

export class KeyController {

  constructor(parentPosition = new THREE.Vector3(0,0,0)) {
    this.speed = 2;
    this.xrot = 0;
    this.yrot = 0;

    this.headingVector = new THREE.Vector3(0,0,-1);
    let headingPoints = [];
    console.log(parentPosition, this.headingVector)
    headingPoints.push(parentPosition);
    headingPoints.push(this.headingVector);
    this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
    this.headingLine = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xff00ff, depthTest: false }));
    this.headingLine.renderOrder = 1;


    // Line rappresenta la linea dell'heading dopo aver applicato la rotazione sugli assi

    this.newHeading = this.headingVector.clone();
    this.quaternion = new THREE.Quaternion();
    this.quaternion.setFromAxisAngle(new THREE.Vector3(1,-1,0).normalize(), Math.PI/4);
    this.newHeading.applyQuaternion(this.quaternion);
    headingPoints = [];
    headingPoints.push(parentPosition);
    headingPoints.push(this.newHeading);
    this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
    this.line = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xffff00, depthTest: false }));
    

    // this.headingVector = this.newHeading.clone();
    // headingPoints = [];
    // console.log(parentPosition, this.headingVector)
    // headingPoints.push(parentPosition);
    // headingPoints.push(this.headingVector);
    // this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
    // this.headingLine = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xff00ff, depthTest: false }));
    // this.headingLine.renderOrder = 1;

    // this.headingLine.applyQuaternion(this.quaternion);
    // headingPoints = [];
    // console.log(parentPosition, this.headingVector)
    // headingPoints.push(parentPosition);
    // headingPoints.push(this.headingVector);
    // this.headingLineGeometry = new THREE.BufferGeometry().setFromPoints(headingPoints);
    // this.headingLine = new THREE.Line(this.headingLineGeometry, new THREE.LineBasicMaterial({ color: 0xff0000, depthTest: false }));
    // this.headingLine.renderOrder = 1;



    // const vector = new THREE.Vector3(0,1,0);
    // // const vector = this.headingLine;
    // vector.applyQuaternion(this.quaternion);

    // console.log(vector);

    // const points = [];
    // points.push(parentPosition);
    // points.push(vector);
    // const vectorgeometry = new THREE.BufferGeometry().setFromPoints(points);
    // this.line = new THREE.Line(vectorgeometry, new THREE.LineBasicMaterial({ color: 0xff0000, depthTest: false }));
    // this.line.renderOrder = 1;

    // this.quaternion = new THREE.Quaternion();
    // this.quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1), Math.PI/2);
    // const vector = new THREE.Vector3(1,0,0);
    // vector.applyQuaternion(this.quaternion);

    // console.log(vector);

    // const points = [];
    // points.push(parentPosition);
    // points.push(vector);
    // const vectorgeometry = new THREE.BufferGeometry().setFromPoints(points);
    // this.line = new THREE.Line(vectorgeometry, new THREE.LineBasicMaterial({ color: 0xff0000, depthTest: false }));
    // this.line.renderOrder = 1;
    
   

  }

  onKeyPress(keyCode) {
    console.log('handling keypresses');
    switch (keyCode) {
      case Commands.W:
        
        break;
      case Commands.A: break;
      case Commands.S: break;
      case Commands.D: break;
    }
  }
}