import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Motion, spring } from 'react-motion';
import range from 'lodash.range';
import clone from 'clone';

const springConfig = { stiffness: 300,
  damping: 50,
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'aaa'
      }, {
        id: 2,
        text: 'bbb'
      }, {
        id: 3,
        text: 'ccc'
      }, {
        id: 4,
        text: 'ddd'
      }, {
        id: 5,
        text: 'eee'
      }, {
        id: 6,
        text: 'fff'
      }, {
        id: 7,
        text: 'ggg'
      }],
      orders: range(7),
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
    };
  }

  reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  }

  clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }
  moveCard(dragIndex, hoverIndex) {
    const { cards, orders } = this.state;
    const newCards = this.reinsert(cards, dragIndex, hoverIndex);
    this.setState({
      delta: 0,
      isPressed: false,
      cards: newCards,
      orders: clone(orders),
    });
  }
  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseDown(pos, pressY, { pageY }) {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  }

  handleMouseMove({ pageY }) {
    const { isPressed, delta, lastPressed, order } = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = this.clamp(Math.round(mouse / 100), 0, order.length() - 1);
      const newOrder = this.reinsert(order, order.indexOf(lastPressed), row);
      console.log(mouse);
      this.setState({
        mouse: mouse,
        //order: newOrder,
      });
    }
  }

  handleMouseUp() {
  }
  render() {
    const { mouse, isPressed, lastPressed, cards, orders } = this.state;
    console.log(this.state);
    return (
      <div>
        {orders.map((order, index) => {
          const card = cards[index];
          const style = lastPressed === index && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouse,
            }
          : {
            scale: spring(1, springConfig),
            shadow: spring(1, springConfig),
            y: spring(orders.indexOf(index) * 50, springConfig),
          };
             // console.log(scale,shadow,y);
          return (
            <Motion style={style} key={index}>
              {({ scale, shadow, y }) =>
                <Card
                  key={card.id}
                  index={index}
                  id={card.id}
                  text={card.text}
                  onMouseDown={this.handleMouseDown.bind(null, index, y)}
                  onTouchStart={this.handleTouchStart.bind(null, index, y)}
                  moveCard={this.moveCard}
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: index === lastPressed ? 49 : index,
                    backgroundColor: '#ff0',
                  }}
                />
              }
            </Motion>
          );
        })}
      </div>
    );
  }
}
