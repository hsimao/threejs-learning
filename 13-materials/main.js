import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { resize } from "../utils";

// dat.GUI
const gui = new dat.GUI({ width: 400 });

// canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
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

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

// Objects
// Base material
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;

// // material.wireframe = true;
// // material.color.set("#ff00ff");

// // 透明
// // material.opacity = 0.5;
// material.transparent = true;

// material.alphaMap = doorAlphaTexture;

// material.side = THREE.DoubleSide;

// MeshNormalMaterial: 法線網格材質 一種把法向量映射到RGB顏色的材質。
// const material = new THREE.MeshNormalMaterial();
// // 平面著色
// material.side = THREE.DoubleSide;

// MeshMatcapMaterial 由一個材質捕捉（MatCap，或光照球（Lit Sphere））紋理所定義，其編碼了材質的顏色與明暗。
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// 深度網格材質(MeshDepthMaterial)一種按深度繪製幾何體的材質。深度基於相機遠近平面。白色最近，黑色最遠。
// 適用於遠近、或有霧的場景
// const material = new THREE.MeshDepthMaterial();

// Lambert網格材質(MeshLambertMaterial) 一種非光澤表面的材質，沒有鏡面高光。
// const material = new THREE.MeshLambertMaterial();

//  Phong網格材質(MeshPhongMaterial) 一種用於具有鏡面高光的光澤表面的材質。
// const material = new THREE.MeshPhongMaterial();
// // 高亮的程度，越高的值越閃亮。默認值為 30。
// material.shininess = 100;
// // 反光的顏色
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial 實現卡通著色的材料。
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

// 標準網格材質(MeshStandardMaterial), 一種基於物理的標準材質，使用Metallic-Roughness工作流程。
// 該材質提供了比MeshLambertMaterial 或MeshPhongMaterial 更精確和逼真的結果，代價是計算成本更高
// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;

// // 陰影紋理, 該紋理的紅色通道用作環境遮擋貼圖。默認值為null。 aoMap需要第二組UV。
// material.aoMap = doorAmbientOcclusionTexture;
// // 環境遮擋效果的強度。默認值為1。零是不遮擋效果。
// material.aoMapIntensity = 1;

// // 距離紋理：位移貼圖會影響網格頂點的位置，與僅影響材質的光照和陰影的其他貼圖不同，移位的頂點可以投射陰影，阻擋其他對象， 以及充當真實的幾何體。位移紋理是指：網格的所有頂點被映射為圖像中每個像素的值（白色是最高的），並且被重定位。
// material.displacementMap = doorHeightTexture;
// // 位移貼圖對網格的影響程度（黑色是無位移，白色是最大位移）。默認值為1。
// material.displacementScale = 0.05;

// // 使用紋理圖片來設定材質的金屬感。
// material.metalnessMap = doorMetalnessTexture;
// // 材質與金屬的相似度。非金屬材質，如木材或石材，使用0.0，金屬使用1.0，通常沒有中間值。默認值為0.0。0.0到1.0之間的值可用於生鏽金屬的外觀。
// material.metalness = 0;

// // 使用紋理圖片來設定材質的粗糙度。
// material.roughnessMap = doorRoughnessTexture;
// // 材質的粗糙程度。 0.0表示平滑的鏡面反射，1.0表示完全漫反射。默認值為1.0
// material.roughness = 1;

// // 使用紋理圖片來更改顏色照亮的方式。法線貼圖不會改變曲面的實際形狀，只會改變光照
// material.normalMap = doorNormalTexture;
// // 法線貼圖對材質的影響程度。典型範圍是0-1。默認值是Vector2設置為（1,1）
// material.normalScale.set(0.5, 0.5);

// material.alphaMap = doorAlphaTexture;
// material.transparent = true;

// 環境材質
const material = new THREE.MeshStandardMaterial();
// 方塊紋理
const cubeTextureLoader = new THREE.CubeTextureLoader();
// 載入環境照片
const envMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/0/px.jpg",
  "./textures/environmentMaps/0/nx.jpg",
  "./textures/environmentMaps/0/py.jpg",
  "./textures/environmentMaps/0/ny.jpg",
  "./textures/environmentMaps/0/pz.jpg",
  "./textures/environmentMaps/0/nz.jpg"
]);

// 加入材質
material.envMap = envMapTexture;

material.metalness = 1;
material.roughness = 0;

gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.001);
gui.add(material, "displacementScale").min(0).max(1).step(0.001);

// 燈光 Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// 球體
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

// 平面幾何
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

// 甜甜圈
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 62, 128),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// 參考線
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Resize
resize(camera, renderer);

const clock = new THREE.Clock();
// Animations
const tick = () => {
  window.requestAnimationFrame(tick);

  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
};
tick();
