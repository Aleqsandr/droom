import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import Home from '../imports/ui/pages/Home.jsx';
import App from '../imports/ui/App.jsx';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

Meteor.startup(() => {
  render((
  	<Router history={appHistory}>
      	<Route path="/" component={Home} />
        <Route path="/app" component={App}/>
    </Router>
  ), document.getElementById('App'));
});
