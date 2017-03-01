import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { Motion, spring } from 'react-motion';

const springConfig = { stiffness: 200, damping: 6 };
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  // cursor: 'move',
  // left: '10px',
  // float: 'left',
  // display: 'inline-block',
  top: '100px',
  width: '30px',
  scale: spring(1.1, springConfig),
  shadow: spring(16, springConfig),
};
const styleSelected = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  // position: 'absolute',
  left: '10px',
  float: 'left',
  display: 'inline-block',
  top: '100px',
  width: '30px',
  boxShadow: '10px 10px 5px #888888',
  transform: 'scale(1.1)',
  shadow: '0 2px 2px -2px rgba(0, 0, 0, 0.2), 0 -2px 2px -2px rgba(0, 0, 0, 0.2)',
  // scale: spring(1, springConfig),
  // shadow: spring(1, springConfig),
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    if (isDragging) {
        return connectDragSource(connectDropTarget(
        <div style={styleSelected}>
          {text}
        </div>
      ));
    }
    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
      </div>
    ));
  }
}
