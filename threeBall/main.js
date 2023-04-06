// https://youtu.be/pUgWfqWZWmM
// https://threejs.org/docs/index.html
// https://github.com/designcourse/threejs-webpack-starter
// https://cpetry.github.io/NormalMap-Online/


import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//Loading
const textureLoader = new THREE.TextureLoader();
const NormalMap = textureLoader.load('./NormalMap.png');


// Debug
// import * as dat from 'dat.gui'
// const gui = new dat.GUI();


// Canvas
const canvas = document.querySelector('canvas.webgl');


// Scene
const scene = new THREE.Scene();


// Objects
const geometry = new THREE.SphereGeometry(.5, 64, 64);


// Materials
const material = new THREE.MeshStandardMaterial( { color: 0x292929 } );
// material.color = new THREE.Color(0x292929);
material.roughness = .2;
material.metalness = .7;
material.normalMap = NormalMap;


// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLightRed = new THREE.PointLight(0xff0000, 2); // 2 = intensity
pointLightRed.position.set(-1.86, 1, -1.65);
pointLightRed.intensity = 10;
scene.add(pointLightRed);

const pointLightBlue = new THREE.PointLight(0xe1ff, 6.8); //old color: 0x0096ff
pointLightBlue.position.set(1.6, -1.52, -1.6);
pointLightBlue.intensity = 10;
scene.add(pointLightBlue);


/**
 * Sizes
*/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


/**
 * Camera
*/

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);


// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;


/**
 * Renderer
*/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


/**
 * Animate
*/

document.addEventListener('mousemove', onMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth/2;
const windowY = window.innerHeight/2;

function onMouseMove(event)  {
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);
};

const clock = new THREE.Clock();

const tick = () => {
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    sphere.position.z += -.05 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();