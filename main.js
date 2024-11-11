import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, orbitControls, targetPosition;

//const orbitControls = new OrbitControls( camera, renderer.domElement );

init();

function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, .17);
    scene.background = new THREE.Color(0x000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    const ambientLight = new THREE.AmbientLight(0xffffff, 8); // soft white light
    scene.add(ambientLight);

    loader.load('scene.gltf', function (gltf) {

        let mesh = gltf.scene;
        mesh.position.set(0, -1.4, 0);
        scene.add(mesh);

    }, undefined, function (error) {

        console.error(error);

    });

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 0.2;
    orbitControls.maxDistance = 1.5;
    orbitControls.enableDamping = true;

    camera.position.set( 0, 20, 100 );
    orbitControls.update();
}

function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
}