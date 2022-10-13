import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setSunLight();
    this.setEnvironmentMap();
    this.setDebug();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.updateAllMaterials();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");

      // environment map intensity
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("Env map itensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(() => this.updateAllMaterials());

      // light helper
      const lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.5);
      this.scene.add(lightHelper);
      this.debugFolder.add(lightHelper, "visible").name("Sun light helper");

      // sun light intensity
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("Sun light intensity")
        .min(0)
        .max(10)
        .step(0.001);

      // sun light position x
      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("Sun light X")
        .min(-5)
        .max(5)
        .step(0.001);

      // sun light position y
      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("Sun light Y")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  updateAllMaterials() {
    this.scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMap = this.environmentMap.texture;
        child.material.envMapIntensity = this.environmentMap.intensity;
        child.material.needsUpdate = true;

        // 陰影
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
    });
  }
}
