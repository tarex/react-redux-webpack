// 'use strict';

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.arrayMove = exports.SortableHandle = exports.SortableElement = exports.SortableContainer = undefined;

// var _utils = require('./utils');

// Object.defineProperty(exports, 'arrayMove', {
//   enumerable: true,
//   get: function get() {
//     return _utils.arrayMove;
//   }
// });

// var _SortableContainer2 = require('./SortableContainer');

// var _SortableContainer3 = _interopRequireDefault(_SortableContainer2);

// var _SortableElement2 = require('./SortableElement');

// var _SortableElement3 = _interopRequireDefault(_SortableElement2);

// var _SortableHandle2 = require('./SortableHandle');

// var _SortableHandle3 = _interopRequireDefault(_SortableHandle2);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports.SortableContainer = _SortableContainer3.default;
// exports.SortableElement = _SortableElement3.default;
// exports.SortableHandle = _SortableHandle3.default;



import React, { Component } from 'react';
import { SortableContainer } from './SortableContainer';
import { SortableElement } from './SortableElement';
import { arrayMove } from './arrayMove';

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
			{items.map((value, index) =>
        <SortableItem key={`item-${index}`} index={index} value={value} />
      )}
    </ul>
	);
});

export default class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };

  render() {
    return (<div>
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
    </div>);
  }
}
