import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hellothere } from 'modules/auth';
import { ShowLoading, Toggle } from 'components';

// // console.log(ShowLoading);

class Router extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(e) {
  	e.preventDefault();
  	this.props.changeSomething();
  }
  render() {
    const { loading } = this.props;
    return (<div>
      <ShowLoading name={loading} />
      <Toggle press={this.props.hellothere} />
    </div>);
  }
}

export default connect(state => ({
	loading: state.auth.loading,
}), { hellothere })(Router);
