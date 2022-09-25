import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";

// GUI Debug
const gui = new dat.GUI({ closed: true, width: 400 });

// 隱藏, 或鍵盤按 h
// gui.hide();

// gui 控制參數
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + 10 });
  }
};

// color
gui
  .addColor(parameters, "color")
  .onChange((color) => material.color.set(color));

// function
gui.add(parameters, "spin");

// Textures
// loadingManager 可監控多個 TextureLoader 事件
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("onStart");
};

loadingManager.onLoad = () => {
  console.log("onLoad");
};

loadingManager.onProgress = (url, index, total) => {
  // console.log("onProgress url", url);
  // console.log("onProgress index", index);
  // console.log("onProgress total", total);
};

loadingManager.onError = () => {
  console.log("onError");
};

// const colorTexture = new THREE.TextureLoader(loadingManager).load(
//   "./static/textures/door/color.jpg"
// );
// const colorTexture = new THREE.TextureLoader(loadingManager).load(
//   "./static/textures/checkerboard-1024x1024.png"
// );

// const colorTexture = new THREE.TextureLoader(loadingManager).load(
//   "./static/textures/checkerboard-8x8.png"
// );

const colorTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/minecraft.png"
);

// 重複紋理
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// 鏡像
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// colorTexture.rotation = Math.PI / 4;

// 旋轉中心置中
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// 是否為紋理生成mipmap（如果可用）。默認為true。如果你手動生成mipmap，請將其設為false。
colorTexture.generateMipmaps = false;
// 當紋理縮小時, 可讓紋理不模糊更清晰
colorTexture.minFilter = THREE.NearestFilter;
// 當紋理放大看時, 不因放大導致模糊, 變清晰
colorTexture.magFilter = THREE.NearestFilter;

const alphaTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/alpha.jpg"
);

const heightTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/height.jpg"
);

const normalTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/normal.jpg"
);

const ambientOcclusionTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/ambientOcclusion.jpg"
);

const metalnessTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/metalness.jpg"
);

const roughnessTexture = new THREE.TextureLoader(loadingManager).load(
  "./static/textures/door/roughness.jpg"
);

// canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);

  // 處理有雙螢幕切換時, 也可同步更新到
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;

scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
console.log("geometry uv", geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 數字區間
gui.add(cube.position, "x").min(-3).max(3).step(0.01).name("elevation");

// true or false
gui.add(cube, "visible");
gui.add(cube.material, "wireframe");

// color
gui.add;

// 鏡頭看著 triangle 元素
camera.lookAt(cube);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 同步螢幕支持的像素比, 避免斜角度有小數點 px 出現時看到鋸齒
// 限制最大像素比, 太大效能會太差
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animations
const tick = () => {
  window.requestAnimationFrame(tick);

  controls.update();
  renderer.render(scene, camera);
};
tick();
