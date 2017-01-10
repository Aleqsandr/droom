import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Home from '../imports/ui/pages/Home.jsx';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render((
  	<Router history={hashHistory}>
      	<Route path="/" component={Home} />
        <Route path="/app" component={App}/>
    </Router>
  ), document.getElementById('App'));
});
