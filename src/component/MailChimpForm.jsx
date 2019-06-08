import React, { Component } from 'react';
import { Button, Checkbox, Form, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getResponse } from '../reducers/MailChimpSubReducer';
import { MailChimpSubscribe } from '../actions/MailChimpPost';
import PropTypes from 'prop-types';
import './mailChimpForm.scss';

class MailChimpForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    first_nameError: false,
    last_nameError: false,
    emailError: false,
    formError: false,
    formSuccess: false,
    serverRequestError: false,
    serverRequestMessage: '',
    formLoading: false,
  };
  static defaultProps = {
    maxWidth: '500px',
  };
  handleChange = (e, { name, value }) =>
    this.setState({
      [name]: value,
    });

  componentDidMount() {}
  handleSubmit = e => {
    let error = false;
    let success = false;
    this.setState({ formLoading: true });

    if (this.state.first_name === '') {
      this.setState({ first_nameError: true });
      error = true;
    } else {
      this.setState({ first_nameError: false });
    }

    if (this.state.last_name === '') {
      this.setState({ last_nameError: true });
      error = true;
    } else {
      this.setState({ last_nameError: false });
    }

    if (this.state.email === '') {
      this.setState({ emailError: true });
      error = true;
    } else {
      this.setState({ emailError: false });
    }

    if (error) {
      this.setState({
        formError: true,
        serverRequestError: false,
        formSuccess: false,
        formLoading: false,
      });
    }

    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
    };

    if (error) {
      return null;
    } else {
      this.props.fetchResp(data).then(r => {
        console.log(!r.payload.status);
        if (!r.payload.status) {
          this.setState({
            formError: false,
            serverRequestError: false,
            formSuccess: true,
            formLoading: false,
          });
        } else {
          this.setState({
            formSuccess: false,
            formError: false,
            serverRequestError: true,
            formLoading: false,
            serverRequestMessage: r.payload.response,
          });
        }
      });
    }
    e.preventDefault();
  };

  verticalConditional(child) {
    if (this.props.vertical) {
      return child;
    } else {
      return <Form.Group>{child}</Form.Group>;
    }
  }

  render() {
    const { first_name, last_name, email } = this.state;
    const { vertical, maxWidth } = this.props;
    if (vertical) {
    }
    return (
      <div
        id={vertical ? 'verticalForm' : 'home-page'}
        style={vertical ? { maxWidth } : {}}>
        <Form
          error={this.state.formError || this.state.serverRequestError}
          success={this.state.formSuccess}
          size={vertical ? 'medium' : 'large'}
          onSubmit={this.handleSubmit}
          style={{
            justifyContent: 'left',
          }}>
          {this.verticalConditional(
            <React.Fragment>
              <Form.Input
                width={vertical ? null : 3}
                fluid
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={this.handleChange}
                error={this.state.first_nameError}
              />
              <Form.Input
                width={vertical ? null : 3}
                fluid
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={this.handleChange}
                error={this.state.last_nameError}
              />
              <Form.Input
                width={vertical ? null : 7}
                fluid
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
                error={this.state.emailError}
              />
              <Form.Button
                width={vertical ? null : 3}
                type="submit"
                size={vertical ? 'medium' : 'large'}
                content="Submit"
                loading={this.state.formLoading}
              />
            </React.Fragment>
          )}

          {this.state.formError ? (
            <Message
              className={'' + this.state.formError ? 'mailChimp-message ' : ''}
              error
              header="All fields are required"
              content="Oops, it looks like you forgot to fill out some fields."
            />
          ) : null}
          {this.state.serverRequestError ? (
            <Message
              className={
                '' + this.state.serverRequestError ? 'mailChimp-message ' : ''
              }
              error
              header="Something went wrong"
              content={this.state.serverRequestMessage}
            />
          ) : null}
          {this.state.formSuccess ? (
            <Message
              className={
                '' + this.state.formSuccess ? 'mailChimp-message ' : ''
              }
              success
              header="Congratulations"
              content="You have successfuly subscribed to Engage updates!"
            />
          ) : null}
        </Form>
      </div>
    );
  }
}

MailChimpForm.propTypes = {
  vertical: PropTypes.bool,
  maxWidth: PropTypes.string,
};

const mapStateToProps = state => ({
  fetchedResp: getResponse(state),
});

const mapDispatchToProps = {
  fetchResp: MailChimpSubscribe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailChimpForm);
