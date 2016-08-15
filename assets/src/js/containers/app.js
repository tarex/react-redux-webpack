import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from 'modules/menu';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <pre> {JSON.stringify(this.props.todos, 2)} </pre>

      <a href="#" onClick={this.props.addTodo}>Click</a>
    </div>);
  }
}

// function mapStateToProps(state) {
//   return {
//     tarex: state.Menu.mobileMenu
//   };
// }


// function mapActionToProps() {
//   return {
//     doRoman
//   };
// }

// // export default connect(mapStateToProps, mapActionToProps)(App);

export default connect(state => ({
  tarex: state.Menu.mobileMenu,
  todos: state.Menu.todos,
}), { addTodo })(App);


// action(dispatch) -> connect() -> { type: 'AI_TYPE' , data} -> reducer(state) -> connect(state)
