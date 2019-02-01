import React from 'react';
// 1. 下行export前要加 class
export class Button extends React.Component {
	render() {
		return (
			<button 
				className={ this.props.light ? 'light-button' : 'dark-button' }
  			onClick = {this.props.onClick}>
//2. button內，加入attribute並用.props即可使用其他.js檔中的函數，如上一行 onClick = {this.props.onClick}
				Refresh
			</button>
		);
	}
}
