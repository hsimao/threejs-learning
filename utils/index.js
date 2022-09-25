export const resize = (camera, renderer) => {
  // Resize
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(width, height);

    // 處理有雙螢幕切換時, 也可同步更新到
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};
