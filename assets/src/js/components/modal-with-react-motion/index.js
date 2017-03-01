import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import Modal from 'react-modal';
import { TransitionSpring, presets } from 'react-motion';

const style = {
  fontSize: '40px',
  textAlign: 'center',
  borderRadius: '5px',
  background: '#f00',
  padding: '15px',
};

export default class ModalMotion extends Component {
  constructor(props) {
    super(props);
    this.id = 3;
    this.state = {
      openModal: false,
      modalWidth: 420,
      modalHeight: 120,
      letters: {
        "#A": true,
        "#N": true,
        "#T": true,
      },
      list: [
        <Pane
          id={1}
          key={1}
          width={420}
          height={120}
          minWidth={100}
          maxWidth={500}
          minHeight={100}
          maxHeight={200}
          style={style}
          className="item"
        >
          <span>Yo</span>
        </Pane>
      ],
    };
    this.modalOnOff = this.modalOnOff.bind(this);
    this.onResize = ::this.onResize;
    // setInterval(() => this.setState({ order: this.state.order.map(order => (order + 1) % 3) }), 1000);
  }

  onResize(event) {
   const size = { event };
   this.setState({
     modalHeight: size.height,
     modalWidth: size.width,
   });
  }
  modalOnOff() {
    const openModal = !this.state.openModal;
    this.setState({ openModal });
  }
  getEndValue() {
    if (!this.state.openModal) return {};
    return {
      modal: {
        scale: { val: 1, config: presets.wobbly },
        opacity: { val: 1, config: presets.stiff }
      }
    };
  }
  willEnter() {
    return {
      scale: { val: 0.9 },
      opacity: { val: 0.5 }
    };
  }

  willLeave(key, value, endValue, currentValue, currentSpeed) {
    return {
      scale: { val: 0.9 },
      opacity: { val: 0 }
    };
  }

  renderModal() {
    return (<div>
      <SortablePane
        onResize={this.onResize}
        isSortable={false}
      >
        {this.state.list}
      </SortablePane>
    </div>);
  }
        // onRequestClose={props.sendToModalHide}
  render() {
    const { openModal, modalWidth, modalHeight, letters } = this.state;
    const padding = 90; // adjust this to your needs
    const height = (modalHeight + padding);
    const width = (modalWidth + padding);
    const heightPx = height + 'px';
    const widthPx = width + 'px';
    const heightOffset = height / 2;
    const offsetPx = heightOffset + 'px';

    const modalStyle = {
      content: {
        border: '0',
        borderRadius: '4px',
        bottom: 'auto',
        height: heightPx,  // set height
        left: '50%',
        padding: '2rem',
        position: 'fixed',
        right: 'auto',
        top: '50%', // start from center
        transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
        width: widthPx,
      }
    };
    const renderModal = (<div>
      <SortablePane
        onResize={this.onResize}
      >{this.state.list}
      </SortablePane>
    </div>);
    return (<div>
      <button
        type="button"
        onClick={this.modalOnOff}
      ><i></i> Modal
      </button>
      <Modal
        isOpen={openModal}
        style={modalStyle}
      >
      	{renderModal}
      </Modal>
    </div>);
  }
}

// <TransitionSpring endValue={this.getEndValue} willEnter={this.willEnter} willLeave={this.willLeave}>
// 					{values =>
//           <div className="letters">
//             {Object.keys(values).map(letter => {
//               const {scale,width,margin} = values[letter];
//               const widthValue = Math.ceil(width.val-0.5);
//               const marginValue = Math.ceil(margin.val-0.5);
//               let styles = {
//                 transform: `scale(${scale.val})`,
//                 height: widthValue,
//                 width: widthValue,
//                 margin: marginValue,
//                 borderRadius: widthValue,
//               };
//               return (
//                 <span
//                   key={letter}
//                   className="letter"
//                   style={styles}
//                   onClick={this.toggle.bind(this,letter)}>
//                   {letter.substring(1)}
//                 </span>
//               )
//             })}
//           </div>
//         }

// 				</TransitionSpring>
