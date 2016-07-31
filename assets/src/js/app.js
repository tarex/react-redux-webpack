import React, { Component } from 'react';
import { render } from 'react-dom';
const documentRoot = document.getElementById('root');

class App extends Component {
  render() {
    return (<div>
      Hi there
    </div>);
  }
}
render(<App/>, documentRoot);
