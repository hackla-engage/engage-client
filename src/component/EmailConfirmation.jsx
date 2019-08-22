import React, { Component } from 'react';
import qs from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verify } from '../actions/verify';
import styles from './EmailConfirmation.scss';

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSet: false,
      type: null,
      email: null,
      id: null,
      code: null,
    };
  }
  componentWillMount() {
    // get the parameters
    const parsed = qs.parse(this.props.location.search);
    if (
      parsed &&
      parsed.type &&
      parsed.email &&
      parsed.id &&
      parsed.code &&
      !this.state.codeSet
    ) {
      console.log(parsed);
      this.props.verify(parsed.email, parsed.id, parsed.code, parsed.type);
    }
  }
  render() {
    return (
      <div>
        <h1 id="heading">ENGAGE: Santa Monica, California </h1>
        <div className="box">
          <h2 className="emailbox"> Thank You </h2>
          <h4 className="emailbox">
            {' '}
            Your email is confirmed and your post has been submitted{' '}
          </h4>
          <br />
          <a id="engagefeedlink" href="#">
            <h1> Go to the Engage Feed </h1>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { verify } = state;
  if (verify) {
    return {
      success: verify.success,
    };
  }
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      verify,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(EmailConfirmation);
