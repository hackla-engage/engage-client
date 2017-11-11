import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Landing from './component/Landing.jsx'
import CounterContainer from './container/CounterContainer.jsx'
import { configureStore, history} from './store/configureStore'
import 'babel-polyfill';

const store = configureStore()

render(
  <Provider store={store}>
    <Landing />
  </Provider>,
  document.getElementById('app')
)