import React, { Component } from 'react';

export default class PauseMenu extends Component {

  handlePause() {
    this.props.finishPause();
  }

  render() {
    if(this.props.isPlaying || !this.props.finishStarter)
      return(<div/>)
    return (
        <div className="pause-container">
          <div className="pause-wrapper" onClick={this.handlePause.bind(this)}/>
          <div className="pause">
            <div className="pause__content">
              <div className="pause__title">Pause</div>
              <div className="button" onClick={this.handlePause.bind(this)}><p>RESUME</p></div><br/>
            </div>
          </div>
        </div>
    )
  }
}
