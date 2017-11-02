import React, { Component } from 'react';
import Example from '../component/Example.jsx'

class ExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTitle: false,
    };
  }
  render() {
    return (
      <div>
        hello world
      </div>
    );
  }
}

export default ExampleContainer;
