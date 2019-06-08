import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, history } from './store/configureStore';
import 'babel-polyfill';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';

const store = configureStore();

//SW initializer
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(reg => {
        console.log('service worker registered', reg);

        const registeredSw = reg;
      })
      .catch(err => {
        console.error(err);
      });
  });
} else {
  console.warn('Service workers not supported');
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
