import React, { Component } from 'react';
import { AddTodo } from 'modules';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
  	this.setState({ value: e.target.value });
  }
  handleSubmit(e) {
  	e.preventDefault();
    this.props.add(this.state.value);
    this.setState({ value:'' });
  }
  render() {
    return (<div>
    	<input value={this.state.value} onChange={this.handleChange}/>
    	<button onClick={this.handleSubmit}>Submit</button>
      {this.props.todos ? <p>this.props.todos</p>: null}
    </div>);
  }
}
export default AddItem;
