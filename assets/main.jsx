import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

import Home from 'components/pages/Home';
import Music from 'components/interfaces/Music';
import NotFound from 'components/notFound/NotFound';
import About from 'components/pages/About';
import Menu from 'components/pages/Menu';

render(
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/app" component={Music} />
    <Route path="/menu" component={Menu} />
    <Route path="/about" component={About} />
  </Router>, document.getElementById('app')
);
