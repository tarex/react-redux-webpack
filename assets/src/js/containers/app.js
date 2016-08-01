import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<AppBar fixed flat>
      <a href="/home">React redux-starter</a>
    </AppBar>);
  }
}

export default App;
