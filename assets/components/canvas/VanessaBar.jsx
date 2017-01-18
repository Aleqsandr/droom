import React, { Component } from 'react';

// App component - represents the whole app
export default class VanessaBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			i:0
		}
	}

	updateColor()
	{
		this.setState({
			i:this.state.i + 10
		})

		var red = this.state.i;
		var green = 255 - this.state.i;

		if (red > 255)
		{
			red = 255;
			alert('ET TA DARONNE Y BOIVENT DU SPRITE SA MÈRE')
		}


		var vanessabar = document.body.querySelector(".vanessabar");
		vanessabar.style.background = "rgba(" + red + ", " + green + ", 0, 1)";
	};

  	render() {

		return (
	      <div className="vanessabar" onClick={this.updateColor.bind(this)}></div>
	    );
  }
}
