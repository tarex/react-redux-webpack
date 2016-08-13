import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddForm from './containers/form/addform';
import SingleItem from './containers/form/single';
class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const showItem = (item) => {
      return (<SingleItem item = {item} ToggleEdit={this.props.ToggleEdit} DeleteItem={this.props.DeleteItem} EditItem={this.props.EditItem}/>);
    }
    return (<div>
      <AddForm add = {this.props.AddItem}/>
      <ul>
        {this.props.item.map(showItem)}
      </ul>
    </div>);
  }
}

function AddItem(data) {
  let convertedData = {};
  convertedData.data = data;
  convertedData.uid= new Date().getTime();
  convertedData.open = false;
  return ({
      type: 'AddItem',
      data: convertedData}
    );
}

function DeleteItem (id) {
    return ({
      type: 'DeleteItem',
      id: id
    });
}

function ToggleEdit (id) {
  return ({
    type: 'ToggleItem',
    id: id,
  })
}

function EditItem (id, value) {
  return ({
    type: 'EditItem',
    data: value,
    id: id,
  })
}

export default connect(state => ({
	item: state.todo.allItem,
}), { AddItem , DeleteItem, ToggleEdit, EditItem })(Router);
