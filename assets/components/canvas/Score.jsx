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
      streak:true,
      prevTiming:null,
    };
  }

  componentDidMount() {

    var self = this;
    self.setState({val: 0});
  }

  componentWillReceiveProps(nextProps) {
    if(prevTime) {
      if(nextProps.timingNote != prevTime){
        if(nextProps.timingNote>0 && nextProps.timingNote <= 300)
          this.setState({streak:this.state.streak+1})
        else
          this.setState({streak:0})
      } else {

      }
      prevTime = nextProps.timingNote;
    } else {
      prevTime = nextProps.timingNote;
      if(nextProps.timingNote>0 && nextProps.timingNote <= 300)
        this.setState({streak:this.state.streak+1})
      else
        this.setState({streak:0})
    }
  }

  checkStreak() {
    if(nextProps.timingNote>0 && nextProps.timingNote <= 300)
      this.setState({streak:this.state.streak+1})
    else
      this.setState({streak:0})
  }

  render() {
    return (
      <div className="score">
        <div className="score__real">Score : {this.state.val}</div>
        <div className="score__streak">Streak : {this.state.streak}</div>
      </div>
    );
  }
}
