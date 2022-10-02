import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("./textures/particles/2.png");

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32);
const count = 20000;

// [x, y, z, x, y, z, ...]
const positions = new Float32Array(count * 3);

// [R, G, B, R, G, B, ...]
const colors = new Float32Array(count * 3);

// 隨機座標
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color("#ff88cc");

// 使用 alphaMap 才能創建透明背景效果
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.transparent = true;

// 修復粒子之間還是會圖片多餘的邊緣像素遮到問題
// 方法1. alphaTest：此方法邊緣還是會看到些微遮蔽像素, 調整不渲染黑色像素的判斷值, 設置運行alphaTest時要使用的alpha值。如果不透明度低於此值，則不會渲染材質。默認值為0。
// particlesMaterial.alphaTest = 0.001;

// 方法1. depthTest：關閉深度測試, 只是用同一顏色的粒子, 以及場景中沒有別的元素
// particlesMaterial.depthTest = false;

// 方法3. depthWrite：渲染此材質是否對深度緩衝區有任何影響
particlesMaterial.depthWrite = false;

// 材質可以混合, 顏色交疊會疊加
particlesMaterial.blending = THREE.AdditiveBlending;

// 啟用頂點著色
particlesMaterial.vertexColors = true;

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 參考線
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update particles 波浪效果
  for (let i = 0; i < count; i++) {
    const x = i * 3;
    const y = x + 1;
    const z = x + 2;

    // 取出 x 值
    const xValue = particlesGeometry.attributes.position.array[x];

    // 更改每個粒子的 y 軸
    particlesGeometry.attributes.position.array[y] = Math.sin(
      elapsedTime + xValue
    );
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
