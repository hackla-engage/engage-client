import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { configureStore, history} from './store/configureStore'
import 'babel-polyfill';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';

const store = configureStore()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)