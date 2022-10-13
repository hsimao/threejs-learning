import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.init();

    this._init = this.init.bind(this);
    window.addEventListener("resize", this._init);
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // emit event
    this.trigger("resize");
  }

  destroy() {
    window.removeEventListener("resize", this._init);
  }
}
