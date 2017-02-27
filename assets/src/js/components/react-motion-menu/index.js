import React, { Component } from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import { constant, range } from 'lodash';

const DEG_TO_RAD = Math.PI / 180;
const MAIN_BUTTON_DIAM = 100;
const CHILD_BUTTON_DIAM = 50;
const CHILDREN_ICONS = [
  'at', 'linkedin', 'facebook', 'github', 'twitter'
];

const M_X = 500;
const M_Y = 450;

const FLYOUT_RADIUS = 120;
const SEPARATION_ANGLE = 40;
const FAN_ANGLE = (CHILDREN_ICONS.length - 1) * SEPARATION_ANGLE;
const BASE_ANGLE = (180 - FAN_ANGLE) / 2;

const toRadians = (deg) => deg * DEG_TO_RAD;

const deltaPosition = (idx, percent) => {
  const angle = BASE_ANGLE + idx * SEPARATION_ANGLE;
  const dX = FLYOUT_RADIUS * Math.cos(toRadians(angle)) * percent;
  const dY = FLYOUT_RADIUS * Math.sin(toRadians(angle)) * percent;
  return {
    dX: dX + CHILD_BUTTON_DIAM / 2,
    dY: dY + CHILD_BUTTON_DIAM / 2
  };
};

export default class ReactMotionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  mainButtonStyles(percent) {
    const deg = 135 * percent;
    return {
      width: MAIN_BUTTON_DIAM,
      height: MAIN_BUTTON_DIAM,
      top: M_Y - MAIN_BUTTON_DIAM / 2,
      left: M_X - MAIN_BUTTON_DIAM / 2,
      transform: `rotate(${deg}deg)`,
    };
  }

  childButtonStyle(idx, percent) {
    const { dX, dY } = deltaPosition(idx, percent);
    const deg = 360 * percent;

    return {
      width: CHILD_BUTTON_DIAM,
      height: CHILD_BUTTON_DIAM,
      top: M_Y - dY,
      left: M_X - dX,
      transform: `rotate(${deg}deg)`,
    };
  }
  toggleMenu(e) {
    e.preventDefault();
    this.setState(s => ({ isOpen: !s.isOpen }));
  }
  render() {
    const { isOpen } = this.state;
    const goalPercent = isOpen ? 1.0 : 0.0;

    const springParams = [210, 20];
    const defaultStyles = range(CHILDREN_ICONS.length).map(constant({ percent: 0.0 }));
    const nextStyles = (previousStyles) => {
      return previousStyles.map((prev, i) => {
        if (i === 0) {
          return { percent: spring(goalPercent, springParams) };
        }
        const lastButtonPreviousPercent = previousStyles[i - 1].percent;
        const thisButtonPreviousPercent = previousStyles[i].percent;
        const shouldThisAnimate = isOpen ?
          lastButtonPreviousPercent > 0.2 :
          lastButtonPreviousPercent < 0.8;
        return { percent: shouldThisAnimate ? spring(goalPercent, springParams) : thisButtonPreviousPercent };
      });
    };
    console.log(this.state);
    const routerStyle = {
      background: '#f0f',
    };
    return (
      <div style={routerStyle}>
        <StaggeredMotion defaultStyles={defaultStyles} styles={nextStyles}>
          {(interpolatedStyles) => {
            const leaderPercent = interpolatedStyles[0].percent;
            return (<div>
              {interpolatedStyles.map(({ percent }, idx) => {
                const style = this.childButtonStyle(idx, percent);
                return (
                  <div className={'child-button'} style={style} key={idx}>
                    <i className={`fa fa-${CHILDREN_ICONS[idx]}`} />
                  </div>
                );
              })}
              <div className={'main-button'} style={this.mainButtonStyles(leaderPercent)} onClick={this.toggleMenu}>
                <i className={'fa fa-plus'} />
              </div>
            </div>);
          }}
        </StaggeredMotion>
      </div>
    );
  }
}
