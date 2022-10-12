import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;
    console.warn("Here starts a great experience");

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // 監聽 emit event
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
  }

  update() {
    this.camera.update();
  }
}
