import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.init();
    window.addEventListener("resize", this.init.bind(this));
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // emit event
    this.trigger("resize");
  }

  destroy() {
    window.removeEventListener("resize", this.init);
  }
}
