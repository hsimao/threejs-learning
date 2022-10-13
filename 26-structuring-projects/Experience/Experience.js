import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Debug from "./Utils/Debug";
import sources from "./sources";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // 監聽 emit event
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
