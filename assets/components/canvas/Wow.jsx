import React, { Component } from 'react';

export default class Wow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "text":null,
    };
  }

  componentDidUpdate(el,il) {
    if(!this.props.isPlaying || !this.props.shouldCheck)return;
    let wow = document.body.querySelector(".wow__text");
    wow.classList.remove("wow__text--wowin");
    setTimeout(function(){
    wow.classList.add("wow__text--wowin");
    },2)

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isPlaying == false)return;
    let time = nextProps.timingNote;
    let wow = document.body.querySelector(".wow__text");
    if(time===0) return;
    if(time<0)
    {
      this.setState({text:"really ?! -_-"});
      wow.style.color = '#FFC733';
    }
    else if(time<50)
    {
      this.setState({text:"wow"});
      wow.style.color = '#FF0FF6';
    }
    else if(time<100)
    {
      this.setState({text:"good"});
      wow.style.color = '#0D871E';
    }
    else if(time<200)
    {
      this.setState({text:"ok"});
      wow.style.color = '#36B2D6';
    }
    else
    {
      this.setState({text:"bad"});
      wow.style.color = 'orange';
    }
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
