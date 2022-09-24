import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 參考線
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

gsap.to(cube.position, {
  duration: 1,
  delay: 1,
  x: 2
});

gsap.to(cube.position, {
  duration: 1,
  delay: 2,
  x: 0
});

// Animations
const tick = () => {
  // 取得跟上次的差異時間
  const elapsedTime = clock.getElapsedTime();

  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // sin + cos 圈圈繞行效果
  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);

  // 鏡頭看著 cube 元素
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
