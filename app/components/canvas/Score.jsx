import React, { Component } from 'react';
import VanessaBar from '../canvas/VanessaBar.jsx';
import utils from "../../assets/modules/useful.js";

var prevTime = null, toCheck = true;

let bestStreak = 0;

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
    if(!this.props.shouldCheck)return;
    if(this.state.streak > bestStreak)
      bestStreak = this.state.streak;

    let scores = {
      "score":this.state.score,
      "streak":bestStreak,
      "vanessabar":utils.checkColor(this.state.fails)
    }
    this.props.scoreUpdate(scores);
  }

  handleEndMusic() {
    if(!this.props.isPractice && !this.props.isLive)
      this.props.onEndMusic(this.state.score);
  }

  componentWillReceiveProps(nextProps) {
    let savePrev = prevTime;
    if(!nextProps.shouldCheck)return;
    if(!nextProps.isPlaying)return;
    const INTERVAL = (this.props.velocity / 60 * 1000 * 200 ) / 2000;
    if(prevTime) {
      if(nextProps.timingNote != prevTime || nextProps.timingNote == utils.pxToTime(utils.bpmToMs(this.props.velocity),70)){
        if(nextProps.timingNote>0 && nextProps.timingNote <= INTERVAL && nextProps.timingNote != utils.pxToTime(utils.bpmToMs(this.props.velocity),70)){
          switch(this.state.streak) {
            case 9:
                this.setState({multiplier:2});
                break;
            case 19:
                this.setState({multiplier:4});
                break;
            case 29:
                this.setState({multiplier:6});
                break;
            case 49:
                this.setState({multiplier:10});
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
            fails:this.state.fails-5
          })

          if(this.state.fails - 5 <= 0) {
            this.handleEndMusic();
          }
        }
      }
      prevTime = nextProps.timingNote;
    } else {
      prevTime = nextProps.timingNote;
      if(nextProps.timingNote>0 && nextProps.timingNote <= INTERVAL && nextProps.timingNote != utils.pxToTime(utils.bpmToMs(this.props.velocity),70)){
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
      }else {
        this.setState({
          streak:0,
          multiplier:1,
        })

        if(nextProps.timingNote !== 0) {
          this.setState({fails:this.state.fails-5})
        }
      }
    }
  }

  render() {
    return (
      <div className="score">
        {!this.props.isPractice ? (
          <div>
            <div className="score__real">{this.state.score}</div>
            <div className="score__streak">{this.state.streak} streak notes</div>
            <div className="score__multiplier">x{this.state.multiplier} MULTIPLIER</div>
          </div>
        ):(
          <div className="score__real">{this.state.streak} streaks</div>
        )}

        {!this.props.isPractice ? (
          <VanessaBar fail={this.state.fails}/>
        ) : (<div/>)}
      </div>
    );
  }
}
