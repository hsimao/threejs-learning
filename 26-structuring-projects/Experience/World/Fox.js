import * as THREE from "three";
import Experience from "../Experience";

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Setup
    this.resource = this.resources.items.foxModel;
    this.setModel();
    this.setAnimation();
    this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.scene.add(this.model);
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {
      idle: this.animation.mixer.clipAction(this.resource.animations[0]),
      walking: this.animation.mixer.clipAction(this.resource.animations[1]),
      running: this.animation.mixer.clipAction(this.resource.animations[2]),
    };

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      // 從舊動畫轉換到新動畫
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fox");

      const debugObject = {
        playIdle: () => this.animation.play("idle"),
        playWalking: () => this.animation.play("walking"),
        playRunning: () => this.animation.play("running"),
      };

      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playWalking");
      this.debugFolder.add(debugObject, "playRunning");
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
