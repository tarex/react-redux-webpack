import React, { Component } from 'react';
import { render } from 'react-dom';
const documentRoot = document.getElementById('root');

class App extends Component {
  render() {
    return (<div>
      hello there, how are you? i'm fine
    </div>);
  }
}
render(<App/>, documentRoot);
