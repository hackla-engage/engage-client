import React, { Component } from 'react';
import {
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';
import request from 'superagent';
import './FormComponent.scss';
import HOST from '../engage_client';
class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.state = {
      yesNoValue: false,
      textValue: '',
      textError: false,
      firstValue: '',
      firstError: true,
      firstTouched: false,
      lastValue: '',
      lastError: true,
      lastTouched: false,
      zipError: false,
      zipValue: '90401',
      zipTouched: false,
      emailError: true,
      emailValue: '',
      emailTouched: false,
      submitEnabled: true,
      isSubmitting: false,
    };
  }
  handleSubmit(evt) {
    // hit endpoint here to consolidate info on agenda items
    this.setState({ isSubmitting: true });
    if (
      this.state.zipError ||
      this.state.emailError ||
      this.state.firstError ||
      this.state.lastError
    ) {
      this.setState({ isSubmitting: false, submitEnabled: false });
      return false;
    }
    console.log('PROPSTATE:', this.props, this.state, HOST);
    request
      .agent()
      .post(HOST + '/add/message/')
      .set('Content-Type', 'application/json')
      .send({
        committee: 'Santa Monica City Council',
        ag_item: this.props.Id,
        token: this.props.verify,
        content: this.state.textValue,
        first: this.state.firstValue,
        last: this.state.lastValue,
        zip: parseInt(this.state.zipValue),
        pro: this.props.Pro,
        email: this.state.emailValue,
      })
      .then(res => {
        console.log('success', res);
        this.props.thankYou();
      })
      .catch(err => {
        console.log('ERR SENDING RECTS', err);
      });
  }
  handleCancel(evt) {
    // redirect back, how?
    evt.preventDefault();
    console.log('prevent default');
    this.props.thankYou();
  }
  handleZipChange(evt) {
    if (
      isNaN(parseInt(evt.currentTarget.value)) ||
      parseInt(evt.currentTarget.value) < 501 ||
      !/[0-9]{5}/.test(evt.currentTarget.value)
    ) {
      this.setState({
        zipValue: evt.currentTarget.value,
        zipError: true,
        zipTouched: true,
        submitEnabled: false,
      });
    } else if (parseInt(evt.currentTarget.value) < 99999) {
      this.setState({
        zipValue: evt.currentTarget.value,
        zipError: false,
        zipTouched: true,
        submitEnabled: !(this.state.emailError || this.state.firstError || this.state.lastError),
      });
    } else {
      this.setState({
        zipValue: '99999',
        zipError: true,
        zipTouched: true,
        submitEnabled: false,
      });
    }
  }

  handleFirstNameChange(evt) {
    if (evt.currentTarget.value === '') {
      this.setState({
        firstValue: evt.currentTarget.value,
        submitEnabled: false,
        nameError: true,
        nameTouched: true,
      });
    } else {
      this.setState({
        firstValue: evt.currentTarget.value,
        firstError: false,
        firstTouched: true,
        submitEnabled: !(
          this.state.zipError ||
          this.state.firstError ||
          this.state.lastError ||
          this.state.emailError
        ),
      });
    }
  }
  handleLastNameChange(evt) {
    if (evt.currentTarget.value === '') {
      this.setState({
        lastValue: evt.currentTarget.value,
        submitEnabled: false,
        lastError: true,
        lastTouched: true,
      });
    } else {
      this.setState({
        lastValue: evt.currentTarget.value,
        lastError: false,
        lastTouched: true,
        submitEnabled: !(this.state.zipError || this.state.firstError || this.state.emailError),
      });
    }
  }

  handleEmailChange(evt) {
    if (
      evt.currentTarget.value !== '' &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(evt.currentTarget.value)
    ) {
      this.setState({
        emailValue: evt.currentTarget.value,
        emailError: true,
        emailTouched: true,
        submitEnabled: false,
      });
    } else {
      this.setState({
        emailValue: evt.currentTarget.value,
        emailError: false,
        emailTouched: true,
        submitEnabled: !(this.state.zipError || this.state.firstError || this.state.lastError),
      });
    }
  }

  handleChangeText(evt) {
    if (evt.currentTarget.value.length <= 200) {
      this.setState({ textValue: evt.currentTarget.value, textError: false });
    }
  }

  render() {
    return (
      <Segment className="form-background">
        <div className={this.props.Pro ? 'pro' : 'con'}>{this.props.Pro ? 'Pro' : 'Con'}</div>
        <Form onSubmit={this.handleSubmit} size="large">
          <div className="vote-title-holder" />
          <div className="vote-recommendations-holder">
            <div className="vote-title-title">{this.props.Title}</div>
            <div className="vote-recommendations-keyword">Summary:</div>
            <div className="vote-recommendations-recommendations">
              <div dangerouslySetInnerHTML={{ __html: this.props.Summary }} />
            </div>
            <div className="vote-recommendations-keyword">Recommended Actions:</div>
            <div className="vote-recommendations-recommendations">
              <div dangerouslySetInnerHTML={{ __html: this.props.Recommendations }} />
            </div>
          </div>
          Tell us a little about yourself:
          <br />
          <div className="form-label">Name*</div>
          <Form.Group inline>
            <Form.Field
              control="input"
              type="text"
              autoComplete="first-name"
              placeholder="first name"
              value={this.state.firstValue}
              onChange={this.handleFirstNameChange}
            />
            <Form.Field
              control="input"
              type="text"
              autoComplete="last-name"
              placeholder="last name"
              value={this.state.lastValue}
              onChange={this.handleLastNameChange}
            />
          </Form.Group>
          {((this.state.firstNameTouched && this.state.firstNameError) ||
            (this.state.lastNameTouched && this.state.lasttNameError)) && (
            <div className="error">Name is required</div>
          )}
          {this.state.nameTouched &&
            this.state.nameError && <div className="error">Name is required</div>}
          <Form.Field
            label="Email*"
            control="input"
            name="email"
            type="text"
            autoComplete="email"
            placeholder="email"
            value={this.state.emailValue}
            onChange={this.handleEmailChange}
          />
          {this.state.emailTouched &&
            this.state.emailError && <div className="error">Error in email</div>}
          <Form.Field
            label="Zipcode (optional)"
            type="text"
            control="input"
            placeholder="zipcode"
            autoComplete="postal-code"
            pattern="[0-9]{5}"
            maxLength="5"
            minLength="5"
            value={this.state.zipValue}
            onChange={this.handleZipChange}
          />
          {this.state.zipTouched &&
            this.state.zipError && (
              <div className="error">
                Error in zipcode... It is optional<br />
              </div>
            )}
          <Form.Field
            autoheight="true"
            label="Let the council know what you think about this item. The actual text you write will NOT go to the council, but an analysis will (optional):"
            control="textarea"
            rows="3"
            onChange={this.handleChangeText}
          />
          <div className="chars">{200 - this.state.textValue.length} characters left</div>
          <br />
          {!this.state.submitEnabled && (
            <div className="error">Form has errors, submit is disabled</div>
          )}
          <Button type="submit" content="Submit" primary disabled={!this.state.submitEnabled} />
          <Button content="Cancel" secondary onClick={this.handleCancel} />
        </Form>
      </Segment>
    );
  }
}

export default FormComponent;
