import React, { Component } from 'react';

export default class Wow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "text":null
    };
  }

  componentWillReceiveProps(nextProps) {
    let time = nextProps.timingNote;

    if(time===0) return;

    if(time<0)
      this.setState({text:"really ?!"})
    else if(time<50)
      this.setState({text:"wow"})
    else if(time<100)
      this.setState({text:"good"})
    else if(time<200)
      this.setState({text:"ok"})
    else
      this.setState({text:"bad"})
  }

  render()
  {
    return (
      <div className="hud__wow">
        <div className="wow__text">
          {this.state.text}
        </div>
      </div>
    );
  }
}
