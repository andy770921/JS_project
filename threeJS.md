# Three.js 觀念

## 1. Webpack 安裝
輸入```npm install three --save```
輸入```npm install react-three --save```
Ref: https://github.com/Izzimach/react-three  
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
## 3.

