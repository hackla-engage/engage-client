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
  Select,
  TextArea
} from "semantic-ui-react";
import "./FormComponent.scss";
const ethOptions = [
  { key: "s", value: "", flag: "", text: "Select an ethnicity/race" },
  { key: "AIAN", value: "AIAN", text: "American Indian or Alaska Native" },
  { key: "AS", value: "AS", text: "Asian" },
  { key: "B", value: "B", text: "Black or African American" },
  { key: "H", value: "H", text: "Hispanic/Latino" },
  { key: "P", value: "P", text: "Native Hawaiian or other Pacific Islander" },
  { key: "M", value: "M", text: "Multiracial" },
  { key: "W", value: "W", text: "White" }
];
class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEthChange = this.handleEthChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.state = {
      yesNoValue: false,
      textValue: "",
      nameValue: "",
      nameError: false,
      zipError: false,
      zipValue: "90401",
      emailError: false,
      emailValue: "",
      ethValue: null,
      submitEnabled: true
    };
  }
  handleSubmit(evt) {
    // hit endpoint here to consolidate info on agenda items
    if (
      this.state.nameError ||
      this.state.zipError ||
      this.state.emailError ||
      this.state.ethValue === null ||
      this.state.ethValue === ""
    ) {
      this.setState({ submitEnabled: false });
      return false;
    }
  }
  handleCancel(evt) {
    // redirect back, how?
  }
  handleZipChange(evt) {
    if (
      isNaN(parseInt(evt.currentTarget.value)) ||
      parseInt(evt.currentTarget.value) < 501
    ) {
      this.setState({
        zipValue: evt.currentTarget.value,
        zipError: true,
        submitEnabled: false
      });
    } else if (parseInt(evt.currentTarget.value) < 99999) {
      this.setState({
        zipValue: evt.currentTarget.value,
        zipError: false,
        submitEnabled: !(
          this.state.emailError ||
          this.state.nameError ||
          this.state.ethValue === null ||
          this.state.ethValue === ""
        )
      });
    } else {
      this.setState({
        zipValue: "99999",
        zipError: true,
        submitEnabled: false
      });
    }
  }

  handleRadio(evt) {
    if (evt.currentTarget.children[0].value === "yes") {
      this.setState({ yesNoValue: true });
    } else {
      this.setState({ yesNoValue: false });
    }
  }
  handleNameChange(evt) {
    if (evt.currentTarget.value === "") {
      this.setState({ submitEnabled: false, nameError: true });
    } else {
      this.setState({
        nameValue: evt.currentTarget.value,
        nameError: false,
        submitEnabled: !(
          this.state.zipError ||
          this.state.ethValue === null ||
          this.state.ethValue === "" ||
          this.state.emailError
        )
      });
    }
  }
  handleEmailChange(evt) {
    if (
      evt.currentTarget.value !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(evt.currentTarget.value)
    ) {
      this.setState({
        emailValue: evt.currentTarget.value,
        emailError: true,
        submitEnabled: false
      });
    } else {
      this.setState({
        emailValue: evt.currentTarget.value,
        emailError: false,
        submitEnabled: !(
          this.state.zipError ||
          this.state.nameError ||
          this.state.ethValue === null ||
          this.state.ethValue === ""
        )
      });
    }
  }
  handleEthChange(evt) {
    this.setState({
      ethValue: evt.currentTarget.value,
      submitEnabled: !(
        this.state.zipError ||
        this.state.nameError ||
        this.state.emailError ||
        evt.currentTarget.value === ""
      )
    });
  }

  handleChangeText(evt) {
    this.setState({ textValue: evt.currentTarget.value });
  }

  render() {
    return (
      <Segment className="form-background">
        <Form onSubmit={this.handleSubmit} size="Large">
          <div className="vote-title-holder">
            <div className="vote-title-title">{this.props.Title}</div>
          </div>
          <div className="vote-recommendations-holder">
            <div className="vote-recommendations-keyword">
              Recommended Actions:
            </div>
            <div className="vote-recommendations-recommendations">
              {this.props.Recommendations}
            </div>
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
          Tell us a little about yourself:
          <Form.Field
            label="Name*"
            control="input"
            type="text"
            autoComplete="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
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
          {this.state.emailError && <div className="error">Error in email</div>}
          <Form.Field
            label="Zipcode (optional)"
            type="text"
            control="input"
            placeholder="zipcode"
            autoComplete="postal-code"
            pattern="[0-9]{5}"
            value={this.state.zipValue}
            onChange={this.handleZipChange}
          />
          {this.state.zipError && (
            <div className="error">
              Error in zipcode... It is optional<br />
            </div>
          )}
          <Form.Field
            control="select"
            label="Ethnicity*"
            placeholder="Select your ethnicity"
            value={this.state.ethValue}
            onChange={this.handleEthChange}
          >
            {ethOptions.map(eth => {
              return (
                <option key={eth.value} value={eth.value}>
                  {eth.text}
                </option>
              );
            })}
          </Form.Field>
          <br />
          <Form.Field
            label="Let the council know what you think about this item (optional):"
            control="textarea"
            rows="3"
            onChange={this.handleChangeText}
          />
          {!this.state.submitEnabled && (
            <div className="error">Form has errors, submit is disabled</div>
          )}
          <Button
            type="submit"
            content="Submit"
            primary
            disabled={!this.state.submitEnabled}
          />
          <Button content="Cancel" secondary onClick={this.handleCancel} />
        </Form>
      </Segment>
    );
  }
}

export default FormComponent;
