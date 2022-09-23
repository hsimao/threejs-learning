import "./style.css";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 位置移動 Position
// x 軸增加會往右移動
mesh.position.x = 0.7;
// y 軸增加會往上移動
mesh.position.y = -0.6;
// z 軸增加會往相機移動
mesh.position.z = 1;

// 可用 set 一次設定三個座標, x y z
mesh.position.set(0.7, -0.6, 1);

// 縮放 Scale
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// 旋轉 Rotation
// PI 等於旋轉 180 度

// 當旋轉多個軸時, 會發生預期結果不同
// 因為當旋轉 x 軸時, 也會影響到 y、z 軸的方向, 會導致旋轉結果和預期不同
// 這時候可以用 reorder 來更正旋轉順序
mesh.rotation.reorder("YXZ");

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// 參考軸線
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
// Sizes
const sizes = {
  width: 800,
  height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// 更改相機視角, 指定相機看著哪個座標
camera.lookAt(mesh.position);

// 取出跟相機的距離
console.log(mesh.position.distanceTo(camera.position));

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
