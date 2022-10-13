import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFloader.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    // 已經加載數量
    this.loaded = 0;
    // 需要加載的數量
    this.toLoad = this.sources.length;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (let source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (file) =>
            this.sourceLoaded(source, file)
          );
          return;
        case "texture":
          this.loaders.textureLoader.load(source.path, (file) =>
            this.sourceLoaded(source, file)
          );
          return;
        case "cubeTexture":
          this.loaders.cubeTextureLoader.load(source.path, (file) =>
            this.sourceLoaded(source, file)
          );
          return;
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    // emit event
    if (this.loaded === this.toLoad) this.trigger("ready");
  }
}
