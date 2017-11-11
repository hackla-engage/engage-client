// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Landing from './component/Landing.jsx'
// import 'babel-polyfill';

// ReactDOM.render(<Landing />, document.getElementById('app'));

// const App = () => {
//   return
// }

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import App from './components/App'
import reducer from './reducers'

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Landing from './component/Landing.jsx'
import CounterContainer from './container/CounterContainer.jsx'
import 'babel-polyfill';

// ReactDOM.render(<Landing />, document.getElementById('app'));

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Landing />
  </Provider>,
  document.getElementById('app')
)