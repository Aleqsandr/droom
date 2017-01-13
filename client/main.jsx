import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from '../imports/ui/pages/Home.jsx';
import Music from '../imports/ui/Music.jsx';
import Menu from '../imports/ui/pages/Menu.jsx';

Meteor.startup(() => {
  render((
  	<Router history={hashHistory}>
      	<Route path="/" component={Home} />
        <Route path="/app" component={Music}/>
        <Route path="/menu" component={Menu}/>
    </Router>
  ), document.getElementById('App'));
});
