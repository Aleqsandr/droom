import React, { Component } from 'react';

var prevTime = null, toCheck = true;

// App component - represents the whole app
export default class Score extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success:null,
      failure:null,
      val:null,
      streak: 0,
      prevTiming:null,
      score: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(prevTime) {
      if(nextProps.timingNote != prevTime){
        if(nextProps.timingNote>0 && nextProps.timingNote <= 300)
          this.setState({streak:this.state.streak+1, score:this.state.score+10})
        else
          this.setState({streak:0, score:this.state.score-2})
      } else {

      }
      prevTime = nextProps.timingNote;
    } else {
      prevTime = nextProps.timingNote;
      if(nextProps.timingNote>0 && nextProps.timingNote <= 300)
        this.setState({streak:this.state.streak+1, score:this.state.score+10})
      else
        this.setState({streak:0})
    }
  }

  render() {
    return (
      <div className="score">
        <div className="score__real">{this.state.score}</div>
        <div className="score__streak">{this.state.streak} streak notes</div>
      </div>
    );
  }
}
