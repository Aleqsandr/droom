import 'styles/main.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

import Home from 'components/pages/Home';
import Music from 'components/interfaces/Music';
import GameHandler from 'components/interfaces/GameHandler';
import NotFound from 'components/notFound/NotFound';
import About from 'components/pages/About';
import Menu from 'components/pages/Menu';

export default class Routes extends Component{

    render(){
        return (
            <Router history={browserHistory}>
              <Route path="/" component={GameHandler}>
                <IndexRoute component={Home}/>
                <Route path="/app/:id/:type" component={Music} />
                <Route path="/menu" component={Menu} />
                <Route path="/about" component={About} />
                <Route path='*' component={NotFound} />
              </Route>
            </Router>
        );
    }
}
