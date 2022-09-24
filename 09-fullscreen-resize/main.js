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

// 雙擊事件
window.addEventListener("dblclick", () => {
  toggleFullScreen(canvas);
});

// FullScreen 兼容各瀏覽器
function toggleFullScreen(target = document.documentElement) {
  const fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;

  if (!fullscreenElement) {
    if (target.requestFullscreen) {
      target.requestFullscreen();
    } else if (target.msRequestFullscreen) {
      target.msRequestFullscreen();
    } else if (target.mozRequestFullScreen) {
      target.mozRequestFullScreen();
    } else if (target.webkitRequestFullscreen) {
      target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

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
