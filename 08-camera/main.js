import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 滑鼠
const cursor = {
  x: 0,
  y: 0
};
window.addEventListener("mousemove", (event) => {
  // 滑鼠左到右 - 0.5 ~ 0.5
  cursor.x = event.clientX / sizes.width - 0.5;
  // 滑鼠上到下 - 0.5 ~ 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera - 透視相機 PerspectiveCamera 3D 視野
// https://threejs.org/docs/#api/zh/cameras/PerspectiveCamera
const camera = new THREE.PerspectiveCamera(
  75, // 攝像機視錐體垂直視野角度，從視圖的底部到頂部，以角度來表示。默認值是50
  sizes.width / sizes.height, // 攝像機視錐體長寬比
  0.1, // 攝像機視錐體近端面，默認值是0.1。
  100 // 攝像機視錐體遠端面，默認值是2000。該值必須大於 near plane（攝像機視錐體近端面）的值。
);
camera.position.z = 3;

// Camera - 正交相機 OrthographicCamera, 2D 視野
// threejs.org/docs/#api/zh/cameras/OrthographicCamera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, // left
//   1 * aspectRatio, // right
//   1, // top
//   -1, // bottom
//   0.1, // near
//   100 // far
// );

// camera.position.x = 2;
// camera.position.y = 2;
// camera.position.z = 2;

scene.add(camera);

// Controls 用 Three 內建控制器來操作相機
const controls = new OrbitControls(camera, canvas);
// 啟用慣性阻力, loop render 內需要調用 controls.update()
controls.enableDamping = true;

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 鏡頭看著 cube 元素
camera.lookAt(cube.position);

// 參考線
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animations
const tick = () => {
  // update camera position
  // 只能移動到前面, 看不到背面
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;

  // 用 sin、cos 數學方法算出背後值
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(cube.position);

  window.requestAnimationFrame(tick);

  controls.update();
  renderer.render(scene, camera);
};
tick();
