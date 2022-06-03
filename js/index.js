import * as THREE from './libs/three.module.js';
import { STLLoader } from './libs/STLLoader.js';
import { OrbitControls } from './libs/OrbitControls.js';

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', onWindowResize);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents( window );

//loader
const loader = new STLLoader();
loader.load( './assets/test.stl', function ( geometry ) {
  // model
  const mesh = new THREE.Mesh(geometry);
  mesh.scale.set(0.005, 0.005, 0.005);
  
  // line
  const material = new THREE.LineBasicMaterial({ color: 0xFF0000 });
  const points = [];
  points.push(new THREE.Vector3(2, -1.2, 3));
  points.push(new THREE.Vector3(2, -1.2, 0));
  points.push(new THREE.Vector3(1.7, -1.2, 0.3));
  points.push(new THREE.Vector3(2.3, -1.2, 0.3));
  points.push(new THREE.Vector3(2, -1.2, 0));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeometry, material);

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x72645b);
  scene.add(mesh);
  scene.add(line);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
}, undefined, function (error) {
	console.error(error);
} );




