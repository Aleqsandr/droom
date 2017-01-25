import React, { Component } from 'react';
import VanessaBar from '../canvas/VanessaBar.jsx';
import utils from "../../modules/useful.js";

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

  componentDidUpdate(nextProps) {
    this.props.scoreUpdate(this.state.score);
  }

  handleEndMusic() {
    this.props.onEndMusic(this.state.score);
  }

  componentWillReceiveProps(nextProps) {
    const INTERVAL = (this.props.velocity / 60 * 1000 * 200 ) / 2000;
    if(prevTime) {
      if(nextProps.timingNote != prevTime || nextProps.timingNote === utils.pxToTime(utils.bpmToMs(this.props.velocity),70)){
        if(nextProps.timingNote>0 && nextProps.timingNote <= INTERVAL){
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

          this.setState({
            streak:this.state.streak+1,
            score:this.state.score+10*this.state.multiplier,
            fails:this.state.fails+2
          });
        } else{
          this.setState({
            streak:0,
            score:this.state.score-5,
            multiplier:1,
            fails:this.state.fails-10
          })

          if(this.state.fails - 10 <= 0) {
            this.handleEndMusic();
          }
        }
      }
      prevTime = nextProps.timingNote;
    } else {
      prevTime = nextProps.timingNote;
      if(nextProps.timingNote>0 && nextProps.timingNote <= INTERVAL){
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

        this.setState({
          streak:this.state.streak+1,
          score:this.state.score+10*this.state.multiplier,
          fails:this.state.fails+2
        })
      }
      else {
        this.setState({
          streak:0,
          multiplier:1,
        })

        if(nextProps.timingNote !== 0) {
          this.setState({fails:this.state.fails-10})
        }
      }
    }
  }

  render() {
    return (
      <div className="score">
        <div className="score__real">{this.state.score}</div>
        <div className="score__streak">{this.state.streak} streak notes</div>
        <div className="score__multiplier">x{this.state.multiplier} MULTIPLIER</div>
        <VanessaBar fail={this.state.fails}/>
      </div>
    );
  }
}
