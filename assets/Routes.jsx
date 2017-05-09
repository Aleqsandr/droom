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
import Freemode from 'components/pages/Freemode';
import Practice from 'components/pages/Practice';
import PracticeMusic from 'components/interfaces/PracticeMusic';

export default class Routes extends Component{

    render(){
        return (
            <Router history={browserHistory}>
              <Route path="/" component={GameHandler}>
                <IndexRoute component={Home}/>
                <Route path="/app/:id/:type" component={Music} />
                <Route path="/menu" component={Menu} />
                <Route path="/practice" component={Practice} />
                <Route path="/about" component={About} />
                <Route path="/freemode" component={Freemode} />
                <Route path='*' component={NotFound} />
              </Route>
            </Router>
        );
    }
}
