import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setCamera();
    this.setOrbitControls();
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width,
      this.sizes.height,
      0.1,
      100
    );

    this.camera.position.set(6, 4, 8);
    this.scene.add(this.camera);
  }

  setOrbitControls() {
    // 用 Three 內建控制器來操作相機
    this.controls = new OrbitControls(this.camera, this.canvas);

    // 啟用慣性阻力, loop render 內需要調用 controls.update()
    this.controls.enableDamping = true;
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
