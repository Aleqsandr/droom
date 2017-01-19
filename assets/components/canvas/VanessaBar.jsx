import React, { Component } from 'react';

// App component - represents the whole app
export default class VanessaBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			i : 0,
			red : 0,
			green : 255
		}
	}

	updateColor(){
		// this.setState({
		// 	i : this.state.i + 1,
		// 	red : this.state.i * 10,
		// 	green : 255 - this.state.i * 10
		// });

		// if (this.state.red > 255) this.setState({red : 255});
		// if (this.state.green < 0) this.setState({green : 0});
		// if (this.state.green == 0 && this.state.red == 255) alert('HE VOS DARONNES Y BOIVENT DU SPRITE SA MÈRE');
		// console.log(this.state.i, this.state.red, this.state.green);
	};

	checkFail(val) {
		if(val<0)
			return 0;
		else if(val>255)
			return 255;
		return val;
	}

  	render(){
  		var style = {
  			backgroundColor : 'rgb(' + this.checkFail(255-this.props.fail) + ", " + this.checkFail(this.props.fail) + ', 0)'
  		}

		return (
			<div className="bars">
		      <div className="vanessabar" style={style} onClick={this.updateColor.bind(this)}></div>
		    </div>
	    );
  	}
}
