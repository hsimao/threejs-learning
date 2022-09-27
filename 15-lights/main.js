import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import * as dat from "dat.gui";
import { resize } from "../utils";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 * 性能比較, 效能消耗如下
 * 高: SpotLight、RectAreaLight
 * 中: DirectionalLight、PointLight
 * 低: AmbientLight、HemisphereLight
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

// 平行光（DirectionalLight
// 平行光是沿著特定方向發射的光。這種光的表現像是無限遠,從它發出的光線都是平行的。常常用平行光來模擬太陽光 的效果; 太陽足夠遠，因此我們可以認為太陽的位置是無限遠，所以我們認為從太陽發出的光線也都是平行的。
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// directionalLight.position.x = -3;
// directionalLight.position.z = 1;
// directionalLight.position.y = 1;

// 半球光（HemisphereLight）
// 光源直接放置於場景之上，光照顏色從天空光線顏色漸變到地面光線顏色。
// 上方紅色, 下方藍色
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);
scene.add(hemisphereLight);

// 點光源（PointLight）
// 從一個點向各個方向發射的光源。一個常見的例子是模擬一個燈泡發出的光。
const pointLight = new THREE.PointLight(
  0xff9000,
  0.5, // 光照強度
  2, // 這個距離表示從光源到光照強度為0的位置。當設置為0時，光永遠不會消失(距離無窮大)
  2 // 沿著光照距離的衰退量。預設值 1。在 physically correct 模式中，decay = 2。
);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// 平面光光源（RectAreaLight）, 類似室內打燈器
// 平面光光源從一個矩形平面上均勻地發射光線。這種光源可以用來模擬像明亮的窗戶或者條狀燈光光源。
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
// 照著中間
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// 聚光燈（SpotLight）, 類似手電筒
// 光線從一個點沿一個方向射出，隨著光線照射的變遠，光線圓錐體的尺寸也逐漸增大。
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1, //  光線散射角度，最大為Math.PI/2。
  1, // 周圍暈開效果, 聚光錐的半影衰減百分比。在0和1之間的值。默認為0。
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

// 必須要先把 target 加進去, 才可以控制 target
scene.add(spotLight.target);
spotLight.target.position.x = -0.25;
spotLight.target.position.y = -0.25;
// spotLight.target.position.z = 3;

// Helpers
scene.add(new THREE.SpotLightHelper(spotLight));
scene.add(new RectAreaLightHelper(rectAreaLight));
scene.add(new THREE.PointLightHelper(pointLight, 0.2));
scene.add(new THREE.DirectionalLightHelper(directionalLight, 0.5));
scene.add(new THREE.HemisphereLightHelper(hemisphereLight, 0.5));

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
// 球體
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

// 方塊
const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

// 甜甜圈
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

// 地板
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

// Resize
resize(camera, renderer);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
