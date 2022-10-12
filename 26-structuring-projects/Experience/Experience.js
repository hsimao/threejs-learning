import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class Experience {
  constructor(canvas) {
    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;
    console.warn("Here starts a great experience");

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();

    this.sizes.on("resize", () => this.resize());

    this.time.on("tick", () => this.update());
  }

  resize() {}

  update() {
    // console.warn("update");
  }
}
