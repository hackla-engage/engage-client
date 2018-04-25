import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Responsive,
  Segment,
  FormField,
  TextArea
} from "semantic-ui-react";
import "./FormComponent.scss";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.state = {
      yesNoValue: false,
      textValue: "",
      zipValue: "00501",
      errorEmail: false,
      emailValue: ""
    };
  }
  handleSubmit(evt) {
    console.log(this.state);
    // hit endpoint here to consolidate info on agenda items
  }
  handleCancel(evt) {
    console.log("Cancel");
    // redirect back, how?
  }
  handleZipChange(evt) {
    if (
      isNaN(parseInt(evt.currentTarget.value)) ||
      parseInt(evt.currentTarget.value) < 501
    ) {
      this.setState({ zipValue: evt.currentTarget.value, zipError: true });
    } else if (parseInt(evt.currentTarget.value) < 99999) {
      this.setState({ zipValue: evt.currentTarget.value, zipError: false });
    } else {
      this.setState({ zipValue: "99999", zipError: false });
    }
  }

  handleRadio(evt) {
    if (evt.currentTarget.children[0].value === "yes") {
      this.setState({ yesNoValue: true });
    } else {
      this.setState({ yesNoValue: false });
    }
  }

  handleEmailChange(evt) {
    if (
      evt.currentTarget.value !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(evt.currentTarget.value)
    ) {
      this.setState({ emailValue: evt.currentTarget.value, errorEmail: true });
    } else {
      this.setState({ emailValue: evt.currentTarget.value, errorEmail: false });
    }
  }

  handleChangeText(evt) {
    this.setState({ textValue: evt.currentTarget.value });
  }

  render() {
    return (
      <div className="form-background">
        <Form onSubmit={this.handleSubmit}>
          <div className="vote-title">
            <em>Title:</em>
            {this.props.Title}
          </div>
          <div className="vote-recommendations">
            <em>Recommendations:</em>
            {this.props.Recommendations}
          </div>
          <Form.Group inline>
            <label>Do you agree with the recommended actions*:</label>
            <Form.Field>
              <Checkbox
                radio
                label="Yes"
                name="YesNo"
                value="yes"
                checked={this.state.yesNoValue}
                onChange={this.handleRadio}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="No"
                name="YesNo"
                value="no"
                checked={!this.state.yesNoValue}
                onChange={this.handleRadio}
              />
            </Form.Field>
          </Form.Group>
          <Input
            label="Zipcode*"
            type="text"
            pattern="[0-9]{5}"
            value={this.state.zipValue}
            onChange={this.handleZipChange}
          />
          <Input
            label="email"
            name="email"
            type="text"
            value={this.state.emailValue}
            onChange={this.handleEmailChange}
          />
          {this.state.zipError && (
            <div className="error">Error in zipcode... Zipcode required</div>
          )}
          {this.state.errorEmail && <div className="error">Error in email</div>}
          <Form.Field
            label="Let the council know what you think about this item (optional):"
            control="textarea"
            rows="3"
            onChange={this.handleChangeText}
          />
          <Button type="submit" content="Submit" primary />
          <Button content="Cancel" secondary onClick={this.handleCancel} />
        </Form>
      </div>
    );
  }
}

export default FormComponent;
