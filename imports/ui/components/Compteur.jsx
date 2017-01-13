import React, { Component } from 'react';

// App component - represents the whole app
export default class Compteur extends Component {
  interval:null

  constructor(props) {
    super(props);

    this.state = {
      compteur:3,
    };
  }

  componentDidMount() {
    var self = this;
    this.interval = setInterval(function() {
      self.setState({
        compteur: self.state.compteur - 1
      })
    }, 1000)
  }

  componentDidUpdate() {
    if(this.state.compteur === 0) {
      clearInterval(this.interval)
      this.setState({compteur:""});
      this.props.finish();
    }
  }

  render() {
    return (
      <div className="compteur">
        {this.state.compteur}
      </div>
    );
  }
}
