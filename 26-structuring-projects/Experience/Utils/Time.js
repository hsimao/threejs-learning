import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    // NOTE: 每幀的時間：一秒 60 幀, 每幀平均 16 毫秒, 1000 / 60 = 16.666
    this.delta = Math.floor(1000 / 60);

    // NOTE: 第一次執行使用 requestAnimationFrame 來調用 tick, 等待第一幀時才執行, 才可避免 delta 第一次會是 0, 導致異常情況發生
    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    // update delta、current
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;

    // emit event
    this.trigger("tick");

    // next tick
    window.requestAnimationFrame(() => this.tick());
  }
}
