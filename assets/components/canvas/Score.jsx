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
      score:0,
      multiplier:1,
      fails:255
    };
  }

  componentWillReceiveProps(nextProps) {
    if(prevTime) {
      if(nextProps.timingNote != prevTime){
        if(nextProps.timingNote>0 && nextProps.timingNote <= 300){
          switch(this.state.streak) {
            case 3:
                this.setState({multiplier:2});
                break;
            case 5:
                this.setState({multiplier:3});
                break;
            case 7:
                this.setState({multiplier:4});
                break;
            case 10:
                this.setState({multiplier:5});
                break;
          }

          this.setState({streak:this.state.streak+1, score:this.state.score+10*this.state.multiplier});
        } 
        else
          this.setState({streak:0, score:this.state.score-5, multiplier:1})
      }
      prevTime = nextProps.timingNote;
    } 
    else {
      prevTime = nextProps.timingNote;
      if(nextProps.timingNote>0 && nextProps.timingNote <= 300){
        switch(this.state.streak) {
          case 3:
              this.setState({multiplier:2});
              break;
          case 5:
              this.setState({multiplier:3});
              break;
          case 7:
              this.setState({multiplier:4});
              break;
          case 10:
              this.setState({multiplier:5});
              break;
        }

        this.setState({streak:this.state.streak+1, score:this.state.score+10*this.state.multiplier})
      }
      else
        this.setState({streak:0, multiplier:1})
    }
  }

  render() {
    return (
      <div className="score">
        <div className="score__real">{this.state.score}</div>
        <div className="score__streak">{this.state.streak} streak notes</div>
        <div className="score__multiplier">multiplier : X {this.state.multiplier}</div>
        <div className="score__bar">Failure Bar : {this.state.fails}</div>
      </div>
    );
  }
}
