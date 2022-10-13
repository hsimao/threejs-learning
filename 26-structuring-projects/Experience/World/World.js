import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";

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
      this.environment = new Environment();
    });
  }
}
