import React, { Component } from 'react';

// App component - represents the whole app
export default class Score extends Component {

  constructor(props) {
    super(props);

    this.state = {
      success:null,
      failure:null,
      val:null,
      streak:true,
    };
  }

  componentDidMount() {

    var self = this;
    self.setState({val: 0});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.timingNote>0 && nextProps.timingNote < 300)
      this.setState({streak:this.state.streak+1})
    else
      this.setState({streak:0})
  }

  render() {
    return (
      <div className="score">
        <div className="score__real">{this.state.val}</div>
        <div className="score__streak">{this.state.streak}</div>
      </div>
    );
  }
}
