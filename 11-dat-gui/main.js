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
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true
});
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

// 參考線
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

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
