import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button_color';
// 要使用其他.js檔的class: 1. import 其他.js檔，如上行


class Random extends React.Component {
//------ 2. 建立constructor，在class一開始即執行裡面的內容，設定初始state
	constructor(props) {
  super(props);
  this.state = {
    color: [92, 132, 163]
 	 };
//------3.  在constructor中，將會呼叫到的handleEvent函數，也綁進來
    this.handleClick = this.handleClick.bind(this);
	}

//------4. 會用到的handleEvent函數寫如下
  handleClick(){
    this.setState({
      color: this.chooseColor()      
    });
    
  }
  
  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }

  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>
				Your color is {this.formatColor(this.state.color)}.
        </h1>
	//------5. 實際呈現在UI，寫<Button/>如下。並加入觸發事件及如何觸發，加在attribute
				<Button light={this.isLight()}
        onClick={this.handleClick}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Random />, 
  document.getElementById('app')
);
