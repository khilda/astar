let renderer, scene, camera, circle, particle, luminor, halo, galaxy;
const lights = [];
const colors = [
  { name: "main", color: 0x4fffea, shadow: "0.314,1.,0.922" }, // main
  { name: "about", color: 0xffb94f, shadow: "0.941,0.62,0.282" }, // about
  { name: "business", color: 0xfd720e, shadow: "0.827,0.404,0.094" }, // business
  { name: "company", color: 0xe18fe8, shadow: "0.965,0.502,1." }, // company
];
let currentColor = null;
const $target = document.querySelector(".v-crnt .img-plant");
export const planetRotate = function () {
  appendShader();
  init();
  animate();
};
function appendShader() {
  // page
  const _cls = document.querySelector(".container").classList[1];
  const _prev = document.querySelector(".v-prev");
  const _next = document.querySelector(".v-next");
  colors.forEach((color, idx) => {
    if (color.name === _cls) {
      currentColor = color;
      let nextIdx = idx + 1 > colors.length ? 0 : idx + 1;
      _next.classList.add(colors[nextIdx].name);
      let prevIdx = idx - 1 < 0 ? colors.length - 1 : idx - 1;
      _prev.classList.add(colors[prevIdx].name);
    }
  });

  // append script
  const _script = document.createElement("script");
  _script.setAttribute("type", "x-shader/x-vertex");
  const _vertex = _script.cloneNode();
  _vertex.setAttribute("id", "vertexShader");
  _vertex.textContent = `varying vec3 vNormal; void main() { vNormal = normalize( normalMatrix * normal ); gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`;
  document.body.appendChild(_vertex);
  const _fragment = _script.cloneNode();
  _fragment.setAttribute("id", "fragmentShader");
  _fragment.textContent = `varying vec3 vNormal; void main() { float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 0.5 ) ), 4.0 ); gl_FragColor = vec4(${currentColor.shadow}, 0.5) * intensity; }`;
  document.body.append(_fragment);
}
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
    color: currentColor.color,
    emissive: 0x000000,
    shading: THREE.SmoothShading,
    map: THREE.ImageUtils.loadTexture("./../../assets/images/bg_planet.png"),
    bumpMap: THREE.ImageUtils.loadTexture("./../../assets/images/bg_planet.png"),
    bumpScale: 0.025,
    specularMap: THREE.ImageUtils.loadTexture("./../../assets/images/bg_planet.png"),
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

  const ambientLight = new THREE.AmbientLight(currentColor.color);
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
