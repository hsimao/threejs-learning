import Sizes from "./Utils/Sizes";

export default class Experience {
  constructor(canvas) {
    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;
    console.warn("Here starts a great experience");

    // Setup
    this.sizes = new Sizes();

    this.sizes.on("resize", () => this.resize());
  }

  resize() {
    console.warn("thissizes", this.sizes);

    console.warn("resiseze");
  }
}
