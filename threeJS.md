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


## 4. [可用於 React] 加入物體等速移動、等速旋轉，或是加速度移動 (重力)
Ref: https://stackoverflow.com/questions/48130461/how-to-make-my-character-jump-with-gravity  
```js
import React, { Component } from 'react';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from 'three-orbitcontrols';

let jumpInfo = {
    x: 12,
    y: 17.2,
    z: 12,
    r: 0,
    dx: 0, // delta x and y
    dy: 0,
    onGround: true,
    triggerJump: false,
    jumpPower: -1,  // power of jump smaller jumps higher eg -10 smaller than -5
    moveSpeed: 0.72, // moveSpeed: 0.252, 0.501, 0.72 
    rotationSpeed: -0.063,
    world: {
        gravity: 0.08, // strength per frame of gravity
        drag: 1, // 0.999 play with this value to change drag
        // groundDrag: 0.9, // play with this value to change ground movement
        ground: 17.2 //17.2, 18.6
    }
};



class ThreeScene extends Component {
    state = {
        camels: [],
        run: false,
        step: 0,
        level: 0,
        boardPosLevelOne: [
            { x: 12, y: 17.2, z: 12 }, { x: 6, y: 17.2, z: 12 }, { x: 0, y: 17.2, z: 12 }, { x: -6, y: 17.2, z: 12 }, { x: -12, y: 17.2, z: 12 }, 
            { x: -12, y: 17.2, z: 6 }, { x: -12, y: 17.2, z: 0 }, { x: -12, y: 17.2, z: -6 }, { x: -12, y: 17.2, z: -12 }, { x: -6, y: 17.2, z: -12 }, 
            { x: 0, y: 17.2, z: -12 }, { x: 6, y: 17.2, z: -12 }, { x: 12, y: 17.2, z: -12 }, { x: 12, y: 17.2, z: -6 }, { x: 12, y: 17.2, z: 0 },
            { x: 12, y: 17.2, z: 6 } ],
        levelHeight: 1.4,
        jumpPara: { oneStepSpeed: 0.252, twoStepSpeed: 0.501, threeStepSpeed: 0.72 }
    }
    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        // ADD SCENE
        this.scene = new THREE.Scene();
        const color = new THREE.Color(0xd5f3fe);
        this.scene.background = color;
        // ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );

        // FIRST PERSPECTIVE
        // this.camera.position.set( 0.025, 32.272, 16.959 );

        // SECOND PERSPECTIVE
        this.camera.position.set(12.224269097110634, 28.06120661987065, 20.449256738974572);

        // THIRD PERSPECTIVE
        // this.camera.position.set( -10.498, 28.194, -20.637 );

        // ADD LIGHT
        this.light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(this.light);

        // ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        // ADD CUBE
        const cubedlength = 6;
        const cubeDepth = 15.5;
        const geometry = new THREE.BoxGeometry(cubedlength, 1.5, cubedlength);
        // const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('asset/sand/sand15.jpg'), side: THREE.DoubleSide });
        const materialTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('asset/sand/sand12.jpg'), side: THREE.DoubleSide });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(12, cubeDepth, 12);
        this.scene.add(this.cube);

        this.cube3 = new THREE.Mesh(geometry, material);
        this.cube3.position.set(12 - 2 * cubedlength, cubeDepth, 12);
        this.scene.add(this.cube3);

        this.cube5 = new THREE.Mesh(geometry, material);
        this.cube5.position.set(12 - 4 * cubedlength, cubeDepth, 12);
        this.scene.add(this.cube5);

        // ADD CUBE2
        this.cube2 = new THREE.Mesh(geometry, materialTex);
        this.cube2.position.set(12 - cubedlength, cubeDepth, 12);
        this.scene.add(this.cube2);

        this.cube4 = new THREE.Mesh(geometry, materialTex);
        this.cube4.position.set(12 - 3 * cubedlength, cubeDepth, 12);
        this.scene.add(this.cube4);

        // ADD BACKGROUND
        this.objLoader = new OBJLoader();
        this.objLoader.setPath('asset/background_obj/');
        this.mtlLoader = new MTLLoader();
        this.mtlLoader.setPath('asset/background_obj/');
        new Promise((resolve) => {
            this.mtlLoader.load('B.mtl', (materials) => {
                resolve(materials);
            });
        })
            .then((materials) => {
                materials.preload();
                this.objLoader.setMaterials(materials);
                this.objLoader.load('B.obj', (object) => {
                    this.scene.add(object);
                });
            });

        // ADD CAMEL
        this.objLoader3 = new OBJLoader();
        this.objLoader3.setPath('asset/camel_obj/');
        this.mtlLoader3 = new MTLLoader();
        this.mtlLoader3.setPath('asset/camel_obj/');
        new Promise((resolve) => {
            this.mtlLoader3.load('orange.mtl', (materials) => {
                resolve(materials);
            });
        })
            .then((materials) => {
                materials.preload();
                this.objLoader3.setMaterials(materials);
                this.objLoader3.load('camel_4.obj', (object) => {
                    object.scale.set(0.7, 0.5, 0.7);
                    //object.rotation.y = 180;
                    object.position.set(12, 17.2, 12);
                    const newObj = { camel: object, id: 0, position: { x: 12, y: 17.2, z: 12 }, boxNum: 0, level: 1, rotation: 0 };
                    this.setState(prevState => ({
                        ...prevState,
                        camels: [...prevState.camels, newObj]
                    }));

                    this.scene.add(object);
                });
            });

        // ADD CAMEL2
        this.objLoader4 = new OBJLoader();
        this.objLoader4.setPath('asset/camel_obj/');
        this.mtlLoader4 = new MTLLoader();
        this.mtlLoader4.setPath('asset/camel_obj/');
        new Promise((resolve) => {
            this.mtlLoader4.load('green.mtl', (materials) => {
                resolve(materials);
            });
        })
            .then((materials) => {
                materials.preload();
                this.objLoader4.setMaterials(materials);
                this.objLoader4.load('camel_4.obj', (object) => {
                    object.scale.set(0.7, 0.5, 0.7);
                    //object.rotation.y = 180;
                    object.position.set(12, 18.6, 12);
                    const newObj = { camel: object, id: 1, position: { x: 12, y: 18.6, z: 12 }, boxNum: 0, level: 1, rotation: 0 };
                    this.setState(prevState => ({
                        ...prevState,
                        camels: [...prevState.camels, newObj]
                    }));

                    this.scene.add(object);
                });
            });


        // ADD MOUSE CTRL
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.update();

        this.start();

        document.body.addEventListener("keydown", e => {
            // 在此指定: a. 要跳到第幾層  b. 按哪個鈕要跳幾步
            let targetLevel = 1;
            switch (e.keyCode) {
                case 73: // press i
                //targetLevel = 3;
                    jumpInfo.triggerJump = true;
                    jumpInfo.onGround = false;
                    jumpInfo.moveSpeed = this.state.jumpPara.oneStepSpeed;
                    this.setState(prevState => ({
                        ...prevState,
                        run: true,
                        step: 1,
                        level: targetLevel
                    }));
                    break;
                case 74: // press j
                    console.log("key B");
                    //targetLevel = 1;
                    jumpInfo.triggerJump = true;
                    jumpInfo.onGround = false;
                    jumpInfo.moveSpeed = this.state.jumpPara.twoStepSpeed;
                    this.setState(prevState => ({
                        ...prevState,
                        run: true,
                        step: 2,
                        level: targetLevel
                    }));
                    break;
                case 75: // press k
                //targetLevel = 4;
                    console.log("key C");
                    jumpInfo.triggerJump = true;
                    jumpInfo.onGround = false;
                    jumpInfo.moveSpeed = this.state.jumpPara.threeStepSpeed;
                    this.setState(prevState => ({
                        ...prevState,
                        run: true,
                        step: 3,
                        level: targetLevel
                    }));
                    break;
            }
        });
    }
    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId);
    }
    animate = () => {
        this.renderScene();
        this.move();
        this.frameId = window.requestAnimationFrame(this.animate);
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    moveAction = (camelObj, camelId, newBoxNum, newLevel, rotation, endXyz, isLinearMove) => {

        let updateXyz = () => {

            // react to keyboard state
            if (jumpInfo.triggerJump) {
                let camelIndex = this.state.camels.indexOf(this.state.camels.find(element => (element.id === camelId)));
                jumpInfo.x = this.state.camels[camelIndex].position.x;
                jumpInfo.z = this.state.camels[camelIndex].position.z;
                jumpInfo.y = this.state.camels[camelIndex].position.y;
                jumpInfo.world.ground = endXyz.y;
                jumpInfo.dy = jumpInfo.jumpPower;
                jumpInfo.dx = -jumpInfo.moveSpeed;
                jumpInfo.triggerJump = false;
            }

            // apply gravity drag and move player
            jumpInfo.dy += jumpInfo.world.gravity;
            jumpInfo.dy *= jumpInfo.world.drag;
            jumpInfo.dx *= jumpInfo.onGround ? 0 : jumpInfo.world.drag;
            jumpInfo.x += jumpInfo.dx;
            jumpInfo.y -= jumpInfo.dy;

            // test ground contact and left and right limits
            if (jumpInfo.dy > 0 && jumpInfo.y <= jumpInfo.world.ground) {
                jumpInfo.y = jumpInfo.world.ground;
                jumpInfo.dy = 0;
                jumpInfo.onGround = true;
                const refreshedObj = { camel: camelObj, id: camelId, position: endXyz, boxNum: newBoxNum, level: newLevel, rotation: (isLinearMove)? (rotation + 90):(rotation)};
                const newArray = [...this.state.camels.filter(element => (camelId !== element.id)), refreshedObj];
                this.setState(prevState => ({
                    ...prevState,
                    camels: newArray,
                    run: false,
                    step: 0
                }));
            } else {
                jumpInfo.onGround = false;
            }

            return { afterX: jumpInfo.x, afterY: jumpInfo.y };
        }

        let { afterX, afterY } = updateXyz();
        camelObj.position.x = afterX;
        camelObj.position.y = afterY;

        if (!isLinearMove) {
            jumpInfo.r += jumpInfo.rotationSpeed;
            camelObj.rotation.y = jumpInfo.r;
        } 
    }
    assignMove = () => {
        // const beforeXyz = { x: camelObj.position.x, y: camelObj.position.y, z: camelObj.position.z };
        // 在此指定: a. 哪一隻駱駝跳  b. 是否轉向
        const targetCameld = 0;
        const isLinear = false;

        const targetCamelIndex = this.state.camels.indexOf(this.state.camels.find(element => (element.id === targetCameld)));
        const camelObj = this.state.camels[targetCamelIndex].camel;
        const rotation = this.state.camels[targetCamelIndex].rotation;
        const step = this.state.step;
        const level = this.state.level;
        let newBoxNum = 0;
        let findXyz = (level, boxNum) => {
            const yLevel = this.state.levelHeight * ( parseInt(level) - 1 );
            return { x: this.state.boardPosLevelOne[boxNum].x, y: this.state.boardPosLevelOne[boxNum].y + yLevel , z: this.state.boardPosLevelOne[boxNum].z };
        }

        switch (parseInt(step)) {
            case 1:
                newBoxNum = this.state.camels[targetCamelIndex].boxNum + 1;
                this.moveAction(camelObj, targetCameld, newBoxNum, level, rotation, findXyz(level, newBoxNum), isLinear);
                break;
            case 2:
                newBoxNum = this.state.camels[targetCamelIndex].boxNum + 2;
                this.moveAction(camelObj, targetCameld, newBoxNum, level, rotation, findXyz(level, newBoxNum), isLinear);
                break;
            case 3:
                newBoxNum = this.state.camels[targetCamelIndex].boxNum + 3;
                this.moveAction(camelObj, targetCameld, newBoxNum, level, rotation, findXyz(level, newBoxNum), isLinear);
                break;
            default:
                return;
        }
        return;

    }
    move = () => {
        if (this.state.camels != 0) {
            if (this.state.run) {
                this.assignMove();
            }
        }
    }
    render() {
        return (
            <div
                style={{ width: '90vw', height: '60vh', marginLeft: '5vw' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
export default ThreeScene;
```
