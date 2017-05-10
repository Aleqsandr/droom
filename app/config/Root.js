import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

import '../assets/scss/main.scss';

import Home from '../components/pages/Home.jsx';
import Music from '../components/interfaces/Music.jsx';
import GameHandler from '../components/interfaces/GameHandler.jsx';
import NotFound from '../components/notFound/NotFound.jsx';
import About from '../components/pages/About.jsx';
import Menu from '../components/pages/Menu.jsx';
import Freemode from '../components/pages/Freemode.jsx';
import Practice from '../components/pages/Practice.jsx';
import PracticeMusic from '../components/interfaces/PracticeMusic.jsx';

export default class Root extends Component {
    render() {
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
