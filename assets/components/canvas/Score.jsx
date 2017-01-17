import React, { Component } from 'react';

// App component - represents the whole app
export default class Score extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success:null,
      failure:null,
      val:null
    };
  }

  componentDidMount() {

    var self = this;
    self.setState({val: 0});
  }

  render() {
    return (
      <div className="score">
        {this.state.val}
      </div>
    );
  }
}
