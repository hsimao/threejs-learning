import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 360 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * 銀河系
 */
const parameters = {
  // 粒子數量
  count: 100000,
  // 粒子尺寸
  size: 0.01,
  // 半徑
  radius: 5,
  // 波浪支線數量
  branches: 3,
  // 分支旋轉幅度
  spin: 1,
  // 隨機性
  randomness: 0.2,
  // 來控制距離分支中心越遠, 粒子數量越少的值
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b2984"
};

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  // 銷毀前一次創建
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    // 每個粒子的起始座標 x 軸
    const i3 = i * 3;

    /**
     * Position
     */
    // 半徑
    const radius = Math.random() * parameters.radius;

    // 分支位置
    const branchIndex = i % parameters.branches;
    // 百分比
    const branchPercentage = branchIndex / parameters.branches;
    // 分支角度
    const branchAngle = branchPercentage * Math.PI * 2;

    // 分支旋轉角度
    const spinAngle = radius * parameters.spin;

    // 隨機偏移距離
    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    // x
    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    // y
    positions[i3 + 1] = randomY;
    // z
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    /**
     * Color
     */
    // inside 跟 outside 混合顏色, 先 clone 在修改, 避免改到原始顏色
    const mixedColor = colorInside.clone();
    // 依據距離來調整混合顏色的透明度
    const mixedAlpha = radius / parameters.radius;
    mixedColor.lerp(colorOutside, mixedAlpha);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Material
   */
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    // 解決粒子邊緣蓋到問題
    depthWrite: false,
    // 材質可以混合, 顏色交疊會疊加
    blending: THREE.AdditiveBlending,
    // 啟用頂點著色
    vertexColors: true
  });

  /**
   * Points
   */
  points = new THREE.Points(geometry, material);
  scene.add(points);
};
generateGalaxy();

// prettier-ignore
gui.add(parameters, "count").min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "size").min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "radius").min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "branches").min(2).max(20).step(1).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "spin").min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "randomness").min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
// prettier-ignore
gui.add(parameters, "randomnessPower").min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
// prettier-ignore
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
// prettier-ignore
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
