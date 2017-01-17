import React, { Component } from 'react';

// App component - represents the whole app
export default class Score extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success:null,
      failure:null,
      score:null,
      streak:true
    };
  }

  componentWillReceiveProps(nextProps) {
    
    console.log(nextProps)
    if(nextProps.timingNote>0 && nextProps.timingNote < 300)
      this.setState({streak:this.state.streak+1, score:this.state.score+10})
    else
      this.setState({streak:0, score:this.state.score-2})

  }

  render() {
    return (
      <div className="score">
        <div className="score__real">{this.state.score}</div>
        <div className="score__streak">{this.state.streak}</div>
      </div>
    );
  }
}
