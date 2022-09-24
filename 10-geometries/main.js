import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

// 手動創建一個幾何
const customGeometry = new THREE.BufferGeometry();

// 三角形
const vertex1 = new THREE.Vector3(0, 0, 0);
const vertex2 = new THREE.Vector3(0, 1, 0);
const vertex3 = new THREE.Vector3(1, 0, 0);
const vertex4 = new THREE.Vector3(0, 0, 0);
const points1 = [vertex1, vertex2, vertex3, vertex4];

// 隨機 50 個三角形
const points2 = [];
const getRandom = () => (Math.random() - 0.5) * 2;
for (let i = 0; i < 50; i++) {
  let startVector = new THREE.Vector3(getRandom(), getRandom(), getRandom());
  points2.push(startVector);
  points2.push(new THREE.Vector3(getRandom(), getRandom(), getRandom()));
  points2.push(new THREE.Vector3(getRandom(), getRandom(), getRandom()));
  points2.push(startVector);
}

customGeometry.setFromPoints(points2);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const customTriangle = new THREE.Line(customGeometry, lineMaterial);
scene.add(customTriangle);

// 鏡頭看著 customTriangle 元素
camera.lookAt(customTriangle);

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
