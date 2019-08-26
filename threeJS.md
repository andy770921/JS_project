# Three.js 觀念


## 1. Webpack 安裝
輸入```npm install three --save```  
輸入```npm install react-three --save```  
輸入```npm install three-orbitcontrols```  
Ref: https://github.com/Izzimach/react-three  
Ref: https://www.npmjs.com/package/three-orbitcontrols  
## 2. index.js 修改如下，及 新增 three_scene.js
index.js
```js
import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import ThreeScene from "./three_scene";

class App extends React.Component {
    render () {
        return (
            <div>
                <ThreeScene />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```
three_scene.js
```js
import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component {
    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 4
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
        this.start()
    }
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }
    animate = () => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    render() {
        return (
            <div
                style={{ width: '400px', height: '400px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
export default ThreeScene;
```
Ref: https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4  
## 3. [不用於 React] 起始步驟: 初始化場景，設定場景、燈、相機視角、渲染迴圈 ( 或名稱是動畫迴圈 )
Three 原始檔的 JS 引入 Ref: https://github.com/mrdoob/three.js/tree/master
Ref: https://github.com/kriscfoster/threejs-import-from-blender/blob/master/public/index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/100/three.js"></script>
  <script src="./threejs-loader/OBJLoader.js"></script>
  <script src="./threejs-loader/MTLLoader.js"></script>
  <style type="text/css">
    body {
      margin: 0px;
    }
  </style>
</head>
<body>
  <script>
    let cube;
    const scene = new THREE.Scene();
    const light = new THREE.DirectionalLight('#ffffff', 0.9);
    light.position.set(-20, 0, 100);
    scene.add(light);
    const camera = new THREE.PerspectiveCamera(75,
      window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
</body>
</html>
```
載入 3D 物件及 外觀材料
```
 const objLoader = new THREE.OBJLoader();
    objLoader.setPath('/blender-files/');
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('/blender-files/');
    new Promise((resolve) => {
      mtlLoader.load('cube.mtl', (materials) => {
        resolve(materials);
      });
    })
    .then((materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('cube.obj', (object) => {
        scene.add(object);
      });
    });
```
設定 載入到畫面中的 obj 旋轉
```
    let cube;
    new Promise((resolve) => {
      mtlLoader.load('cube.mtl', (materials) => {
        resolve(materials);
      });
    })
    .then((materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('cube.obj', (object) => {
        cube = object;
        scene.add(object);
      });
    });
    function render() {
      if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
```

初始化 js -2
```js
let camera, scene, renderer, cube;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.BoxGeometry(3, 3, 3);

	// Create material with color
	const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

	// Add texture - 
	// const texture = new THREE.TextureLoader().load('textures/crate.gif');

	// Create material with texture
	// const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material
	cube = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(cube);

	// Position camera
	camera.position.z = 5;
}

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate cube (Change values to change speed)
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
```
Ref: https://codepen.io/bradtraversy/pen/VOpZvp?fbclid=IwAR2MhQ4rXKEmETgA_r-I-6m3Lj2guS9YDib1upxjA9iH9alJL1eXLHwOWtU
