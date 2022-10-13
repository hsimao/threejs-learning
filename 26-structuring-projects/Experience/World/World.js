import Experience from "../Experience";
import Floor from "./Floor";
import Fox from "./Fox";
import Environment from "./Environment";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // 資源加載完才設置環境
    this.resources.on("ready", () => {
      console.warn("resources are ready");

      // Setup
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
