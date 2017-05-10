import React, { Component } from 'react';
import utils from "../../assets/modules/useful.js";

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

  	render(){
  		var style = {
  			backgroundColor : 'rgb(' + utils.checkColor(255-this.props.fail) + ", " + utils.checkColor(this.props.fail) + ', 0)'
  		}

		return (
			<div className="bars">
		      <div className="vanessabar" style={style}/>
		    </div>
	    );
  	}
}
