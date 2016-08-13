import React, { Component } from 'react';
import { AddTodo } from 'modules';
import clone from 'clone';
class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
    	value: '',
    };
  }
  handleDelete(id, e) {
    this.props.DeleteItem(id);
    e.preventDefault();
  }
  handleEdit(id, e) {
    this.props.ToggleEdit(id);
    e.preventDefault();
  }
  handleSubmit(id, e) {
    e.preventDefault();
    this.props.EditItem(id, this.state.value);
    this.setState({ value: '' });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const item = clone(this.props.item);
    return (<li>
      <li>
        <div>{item.data}<i className="glyphicon glyphicon-remove" onClick={this.handleDelete.bind(this, item.uid)}></i><i className="glyphicon glyphicon-pencil" onClick={this.handleEdit.bind(this, item.uid)}></i></div>
        <div>
          {item.open ?<div> <input onChange={this.handleChange} value={this.state.value}/> <button onClick={this.handleSubmit.bind(this, item.uid)}>Save</button> </div>: null}
        </div>
      </li>      
    </li>
    );
  }
}
export default SingleItem;
