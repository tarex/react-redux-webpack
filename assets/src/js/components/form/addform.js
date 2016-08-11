import React, { Component } from 'react';
import { AddTodo } from 'modules';
import { connect } from 'react-redux';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	value: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
  	console.log(e.target.value);
  	this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
    console.log('called');
    console.log(this.props);
  	e.preventDefault();
  }
  render() {
    return (<div>
    	<input value={this.state.value} onChange={this.handleChange}/>
    	<button onClick={this.handleSubmit}>Submit</button>
      {this.props.todos ? <p>this.props.todos</p>: null}
    </div>);
  }
}
function mapStateToProps(state) {
   console.log(state);
  return { todos: state.item }
}

export default connect(mapStateToProps, AddTodo)(AddItem);
// export default AddItem;
