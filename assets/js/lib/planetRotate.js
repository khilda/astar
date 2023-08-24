let renderer, scene, camera, circle, particle, luminor, halo, galaxy;
const lights = [];
const colors = [
  new THREE.Color(0x4fffea), // main
  new THREE.Color(0xffb94f), // about
  new THREE.Color(0xfd720e), // business
  new THREE.Color(0xe18fe8), // company
];
const $target = document.querySelector(".v-crnt .img-plant");
export const planetRotate = function () {
  init();
  animate();
};

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(5);
  // renderer.setSize($target.clientWidth, $target.clientHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  $target.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(95, 1, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  circle = new THREE.Object3D();
  halo = new THREE.Object3D();
  luminor = new THREE.Object3D();

  scene.add(circle);
  scene.add(halo);
  scene.add(luminor);

  const geo_planet = new THREE.SphereGeometry(10, 64, 32);
  const geom3 = new THREE.SphereGeometry(16, 32, 16);

  const mat = new THREE.MeshPhongMaterial({
    color: 0x4fffea,
    emissive: 0x000000,
    shading: THREE.SmoothShading,
    map: THREE.ImageUtils.loadTexture(
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Generic_Celestia_asteroid_texture.jpg"
    ),
    bumpMap: THREE.ImageUtils.loadTexture(
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Generic_Celestia_asteroid_texture.jpg"
    ),
    bumpScale: 0.025,
    specularMap: THREE.ImageUtils.loadTexture(
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Generic_Celestia_asteroid_texture.jpg"
    ),
    specular: new THREE.Color("grey"),
  });

  const mat3 = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color("violet") } },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  const planet = new THREE.Mesh(geo_planet, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 15;
  circle.add(planet);

  const ball = new THREE.Mesh(geom3, mat3);
  ball.scale.x = ball.scale.y = ball.scale.z = 16;
  halo.add(ball);

  const ball2 = new THREE.Mesh(geom3, mat3);
  ball2.scale.x = ball2.scale.y = ball2.scale.z = 12;
  ball2.position.set(25, 5, 1);
  halo.add(ball2);

  const ambientLight = new THREE.AmbientLight(0x37d9c5);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x000000, 0x111111, 20);
  hemiLight.position.set(-1, -1, 2);
  luminor.add(hemiLight);

  lights[1] = new THREE.DirectionalLight(0x000000, 7);
  lights[1].position.set(-1, 0, 0.5);
  lights[2] = new THREE.DirectionalLight(0x000000, 7);
  lights[2].position.set(1, 0, 0.5);

  scene.add(lights[1]);
  scene.add(lights[2]);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = 1 / 1;
  camera.updateProjectionMatrix();
  // renderer.setSize($target.clientWidth, $target.clientHeight);
}

function animate() {
  const timer = 0.0001 * Date.now();
  requestAnimationFrame(animate);

  circle.rotation.x -= 0.001;
  circle.rotation.y -= 0.001;

  halo.rotation.z -= 0.001;
  luminor.rotation.z -= 0.001;
  // halo.scale.x = Math.sin( timer * 3) * 0.09 + 1;
  // halo.scale.y = Math.sin( timer * 7 ) * 0.09 + 1;

  renderer.clear();
  renderer.render(scene, camera);
}
