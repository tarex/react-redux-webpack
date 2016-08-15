import React, { Component } from 'react';
import { App } from 'containers';

class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <App />
    </div>);
  }
}

export default Router;
