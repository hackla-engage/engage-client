import React, { Component } from 'react';
import { Button, Form, Grid, Checkbox, Header } from 'semantic-ui-react';

import './FormComponent.scss';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitEnabled: this.props.complete.firstName,
      values: {
        firstName: {
          value: '',
          error: '',
          touched: false,
        },
        lastName: {
          value: '',
          error: '',
          touched: false,
        },
        email: {
          value: '',
          error: '',
          touched: false,
        },
        zipcode: {
          value: 90401,
          error: '',
          touched: false,
        },
        content: {
          value: '',
          touched: false,
        },
        resident: {
          value: false,
        },
        homeOwner: {
          value: false,
        },
        businessOwner: {
          value: false,
        },
        works: {
          value: false,
        },
        school: {
          value: false,
        },
        childSchool: {
          value: false,
        },
      },
      setByProps: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDemographicChange = this.handleDemographicChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.scrollToAppTop();
  }
  componentWillReceiveProps(nextProps) {
    const { values, setByProps } = this.state;
    console.log(nextProps, 'nextProps componentWillReceiveProps CommentForm');
    if (
      nextProps.complete != null &&
      Object.keys(nextProps.complete).length !== 0 &&
      !setByProps
    ) {
      values.firstName.value = nextProps.complete.firstName;
      values.lastName.value = nextProps.complete.lastName;
      values.email.value = nextProps.complete.email;
      values.zipcode.value = nextProps.complete.zipcode;
      values.content.value = nextProps.complete.content;
      values.resident.value = nextProps.complete.resident;
      values.homeOwner.value = nextProps.complete.homeOwner;
      values.businessOwner.value = nextProps.complete.businessOwner;
      values.works.value = nextProps.complete.works;
      values.school.value = nextProps.complete.school;
      this.setState({ values, setByProps: true });
      console.log(values);
    }
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const firstName = this.state.values.firstName.value;
    const lastName = this.state.values.lastName.value;
    const email = this.state.values.email.value;
    const zipcode = /^[0-9]{5}/.test(this.state.values.zipcode.value)
      ? this.state.values.zipcode.value
      : 90401;
    const content = this.state.values.content.value;
    const businessOwner = this.state.values.businessOwner.value;
    const homeOwner = this.state.values.homeOwner.value;
    const resident = this.state.values.resident.value;
    const works = this.state.values.works.value;
    const childSchool = this.state.values.childSchool.value;
    const school = this.state.values.school.value;
    if ([firstName, lastName, email].includes('')) {
      this.setState({ submitEnabled: false });
      return;
    }
    const values = {
      firstName,
      lastName,
      email,
      zipcode,
      content,
      businessOwner,
      childSchool,
      homeOwner,
      resident,
      works,
      school,
    };
    this.props.completeForm(values);
  }
  handleCancel() {
    const values = {
      firstName: {
        value: '',
        error: '',
        touched: false,
      },
      lastName: {
        value: '',
        error: '',
        touched: false,
      },
      email: {
        value: '',
        error: '',
        touched: false,
      },
      zipcode: {
        value: 90401,
        error: '',
        touched: false,
      },
      content: {
        value: '',
      },
      resident: {
        value: false,
      },
      homeOwner: {
        value: false,
      },
      businessOwner: {
        value: false,
      },
      works: {
        value: false,
      },
      school: {
        value: false,
      },
      childSchool: {
        value: false,
      },
    };
    this.setState({ values });
    this.props.resetForm();
    this.props.returnToItem(this.props.id);
  }
  handleTextChange(category, value) {
    let submitEnabled = true;
    const { values } = this.state;
    switch (category) {
      case 'firstName':
        values.firstName.touched = true;
        values.firstName.value = value;
        if (value === '') {
          values.firstName.error = 'First name is required';
          submitEnabled = false;
        } else {
          values.firstName.error = '';
        }
        break;
      case 'lastName':
        values.lastName.touched = true;
        values.lastName.value = value;
        if (value === '') {
          values.lastName.error = 'Last name is required';
          submitEnabled = false;
        } else {
          values.lastName.error = '';
        }
        break;
      case 'email':
        values.email.touched = true;
        values.email.value = value;
        if (
          value === '' ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ) {
          values.email.error =
            'Email is required and must be in format name@domain.com';
          submitEnabled = false;
        } else {
          values.email.error = '';
        }
        break;
      case 'zipcode':
        values.zipcode.touched = true;
        values.zipcode.value = value;
        if (!/^[0-9]{5}/.test(value)) {
          values.zipcode.error =
            'Zipcode is a 5 digit number, but not required';
        } else {
          values.zipcode.error = '';
        }
        break;
      case 'content':
        values.content.value = value;
        break;
      default:
        break;
    }
    if (
      [
        values.firstName.value,
        values.lastName.value,
        values.email.value,
      ].includes('')
    ) {
      submitEnabled = false;
    }
    this.setState({ values, submitEnabled });
  }

  handleDemographicChange(category, value) {
    const { values } = this.state;
    values[category].value = value;
    this.setState({ values });
  }
  render() {
    console.log(this.state);
    const {
      firstName,
      lastName,
      email,
      zipcode,
      content,
      resident,
      homeOwner,
      businessOwner,
      works,
      school,
      childSchool,
    } = this.state.values;
    return (
      <Form onSubmit={this.handleSubmit} size="large">
        <div className="vote-title-holder">
          Tell us a little about yourself:
        </div>
        <br />
        <div className="form-label">Name*</div>
        <Form.Group inline>
          <Form.Field
            control="input"
            type="text"
            autoComplete="first-name"
            placeholder="first name"
            value={firstName.value}
            onChange={evt => {
              this.handleTextChange('firstName', evt.target.value);
            }}
          />
          <Form.Field
            control="input"
            type="text"
            autoComplete="last-name"
            placeholder="last name"
            value={lastName.value}
            onChange={evt => {
              this.handleTextChange('lastName', evt.target.value);
            }}
          />
        </Form.Group>
        {this.state.values.firstName.touched &&
          this.state.values.firstName.error && (
            <div className="error">First name is required</div>
          )}
        {this.state.values.lastName.touched &&
          this.state.values.lastName.error && (
            <div className="error">Last name is required</div>
          )}
        <Form.Field
          label="Email*"
          control="input"
          name="email"
          type="text"
          autoComplete="email"
          placeholder="email"
          value={email.value}
          onChange={evt => {
            this.handleTextChange('email', evt.target.value);
          }}
        />
        {this.state.values.email.touched && this.state.values.email.error && (
          <div className="error">Error in email</div>
        )}
        <Form.Field
          label="Zipcode (optional)"
          type="text"
          control="input"
          placeholder="zipcode"
          autoComplete="postal-code"
          pattern="[0-9]{5}"
          maxLength="5"
          minLength="5"
          value={zipcode.value}
          onChange={evt => {
            this.handleTextChange('zipcode', evt.target.value);
          }}
        />
        {this.state.values.zipcode.touched && this.state.values.zipcode.error && (
          <div className="error">
            Error in zipcode, but it is optional
            <br />
          </div>
        )}
        <Form.Field
          autoheight="true"
          label="Let the council know what you think about this item (optional):"
          control="textarea"
          rows="3"
          maxLength={200}
          value={content.value}
          onChange={evt => {
            this.handleTextChange('content', evt.target.value);
          }}
        />
        <div className="chars">
          {200 - this.state.values.content.value.length} characters left
        </div>
        <br />
        <br />
        <Header as="h4">Demographics:</Header>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={6} padded="horizontally">
              <Checkbox
                label="Resident of the city"
                checked={resident.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('resident', value.checked);
                }}
              />
              <br />
              <Checkbox
                label="Home owner in the city"
                checked={homeOwner.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('homeOwner', value.checked);
                }}
              />
              <br />
              <Checkbox
                label="Business owner in the city"
                checked={businessOwner.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('businessOwner', value.checked);
                }}
              />
            </Grid.Column>
            <Grid.Column width={6} padded="horizontally">
              <Checkbox
                label="Employed in the city"
                checked={works.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('works', value.checked);
                }}
              />
              <br />
              <Checkbox
                label="Attends school in the city"
                checked={school.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('school', value.checked);
                }}
              />
              <br />
              <Checkbox
                label="Has a child who attends school in the city"
                checked={childSchool.value}
                onChange={(evt, value) => {
                  this.handleDemographicChange('childSchool', value.checked);
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {!this.state.submitEnabled && (
          <div className="error">Form has errors, submit is disabled</div>
        )}
        <Button
          type="submit"
          content="Review Submission"
          primary
          disabled={!this.state.submitEnabled}
        />
        <Button content="Cancel" secondary onClick={this.handleCancel} />
      </Form>
    );
  }
}

export default CommentForm;
