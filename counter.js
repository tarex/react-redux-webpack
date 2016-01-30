import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'REMOVE':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

class App extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  click(e) {
    e.preventDefault();
    store.dispatch({ type: 'ADD' });
  }
  render() {
    const count = store.getState();
    console.log(count);
    return (<div>
      <h3>{count}</h3>
      <button onClick={this.click}>Click</button>
    </div>);
  }
}

render(<App/>, document.getElementById('root'));
