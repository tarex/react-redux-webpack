import React, { Component } from 'react';
import SortableSimple from 'components/sorting';
// import SortableComponent from 'components/sortable_hoc';
import ReactMotion from 'components/react_motion';
import ModalMotion from 'components/modal-with-react-motion';
import KeenOutput from 'components/keenoutput';
import ReactMotionMenu from 'components/react-motion-menu';
import TestGraph from 'components/testGraph';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  left: '10px',
  float: 'left',
  display: 'inline-block',
  top: '100px',
  width: '150px',
};
const styleSlected = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#ff0',
  cursor: 'move',
  left: '10px',
  float: 'left',
  display: 'inline-block',
  top: '100px',
  width: '150px',
};

class Router extends Component {
  constructor(props) {
    super(props);
    this.changestate = this.changestate.bind(this);
    this.state = {
      isLoading: true,
      spinner: document.querySelector('.loader'),
      container: document.querySelector('.root'),
      ComponentName: 'TestGraph',
      components: ['SortableSimple', 'SortableComponent', 'ReactMotion', 'ModalMotion',
      'keenOutput', 'ReactMotionMenu', 'TestGraph'],
    };
  }
  changestate(event) {
    this.setState({
      ComponentName: event.target.id,
    });
  }
  render() {
    let ComponentName = 'ModalMotion';
    const { components, isLoading, spinner, container } = this.state;
    console.log(this.state);
    if (isLoading) {
      console.log('load', spinner, container);
      //spinner.setAttribute('hidden', true);
      container.removeAttribute('hidden');
      this.setState({ isLoading: false });
    }
    switch (this.state.ComponentName) {
      case components[0]:
        ComponentName = SortableSimple;
        break;
      // case components[1]:
      //   ComponentName = SortableComponent;
      //   break;
      case components[2]:
        ComponentName = ReactMotion;
        break;
      case components[3]:
        ComponentName = ModalMotion;
        break;
      case components[4]:
        ComponentName = KeenOutput;
        break;
      case components[5]:
        ComponentName = ReactMotionMenu;
        break;
      case components[6]:
        ComponentName = TestGraph;
        break;
      default:
        break;
    }
    const routerStyle = {
      width: '800px',
    };
    return (<div style={routerStyle}>
      {components.map((component) => {
        let styleSingle = style;
        if (this.state.ComponentName === component) {
          styleSingle = styleSlected;
        }
        return (<div
          style={styleSingle}
          key={component}
          id={component}
          onClick={this.changestate}
        >
          {component}
        </div>);
      })}
      <div
        style={{
          height: '100px',
        }}
      />
      <ComponentName />
    </div>);
  }
}

export default Router;
