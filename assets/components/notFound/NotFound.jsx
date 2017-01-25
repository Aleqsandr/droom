import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <section className="content404">
        <h2 className="404content__title" ref="title404">OOPS. ERROR 404.<br/> The page you're looking for doesn't exist.</h2>
        <Link to="/"><div className="button"><p>BACK HOME</p></div></Link>
      </section>
    );
  }
}
