import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as firebase from "firebase";

import Root from './config/Root';

/* let config = {
 *     apiKey: "AIzaSyDtxBHh5p5jLvEfP_O0iuDxMh32hubEnpk",
 *     authDomain: "droom-c7526.firebaseapp.com",
 *     databaseURL: "https://droom-c7526.firebaseio.com",
 *     projectId: "droom-c7526",
 *     storageBucket: "droom-c7526.appspot.com",
 *     messagingSenderId: "622797889787"
 * };
 * firebase.initializeApp(config);
 * */

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
