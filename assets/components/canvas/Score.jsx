import React, { Component } from 'react';

// App component - represents the whole app
export default class Score extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success:null,
      failure:null,
      score:0
    };
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps !== 'undefined')
      this.setState({score:nextProps.scoreUpdate});
  }

  render() {
    return (
      <div className="score">
        {this.state.score}
      </div>
    );
  }
}
