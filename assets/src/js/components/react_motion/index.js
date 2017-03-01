import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import range from 'lodash.range';
import clone from 'clone';

const springConfig = { stiffness: 200, damping: 6 };
const itemsCount = 4;

export default class ReactMotion extends Component {
  constructor(props) {
    super(props);

    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      selectValue: [
        {
          index: 0,
          txt: 'a',
        },
        {
          index: 1,
          txt: 'b',
        },
        {
          index: 2,
          txt: 'c',
        },
        {
          index: 3,
          txt: 'd',
        },
      ],
      orders: range(4),
    };
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
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
    const { isPressed, delta, orders, lastPressed } = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = this.clamp(Math.round(mouse / 100), 0, itemsCount - 1);
      const newOrder = this.reinsert(orders, orders.indexOf(lastPressed), row);
      //const newOrder = clone(orders);
      this.setState({
				mouse,
				orders: newOrder,
      });
    }
  }

  handleMouseUp() {
    this.setState({ isPressed: false, delta: 0 });
  }
  reinsert(arr, from, to) {
    const newArr = arr.slice(0);
    const val = newArr[from];
    newArr.splice(from, 1);
    newArr.splice(to, 0, val);
    return newArr;
  }

  clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  render() {
    const { mouse, isPressed, lastPressed, orders, selectValue } = this.state;
    return (<div className="rq-rub-image-uploads-wrap">

        {orders.map((order, index) => {
          const style = lastPressed === index && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouse,
            }
          : {
            scale: spring(1, springConfig),
            shadow: spring(1, springConfig),
            y: spring(orders.indexOf(index) * 100, springConfig),
          };
          return (
            <Motion style={style} key={index}>
              {({ scale, shadow, y }) => {
                console.log({ scale, shadow, y });
                return (<div
                  onMouseDown={this.handleMouseDown.bind(this, index, y)}
                  onTouchStart={this.handleTouchStart.bind(this, index, y)}
                  className="rq-rub-upload-preview"
                  style={{
                	  border: '1px dashed gray',
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: index === lastPressed ? 1 : 0,
                    width: 100,
                  }}>
                  {selectValue[order].txt}
                </div>);
              }}
            </Motion>
          );
        })}
      </div>
    );
  }
}
